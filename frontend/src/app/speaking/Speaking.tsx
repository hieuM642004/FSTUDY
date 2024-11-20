'use client';

import { useEffect, useState } from 'react';
import { ReactMic, ReactMicStopEvent } from 'react-mic';
import FlashCardService from '@/services/FlashCardService';
import WavEncoder from 'wav-encoder';
import { AudioOutlined, LoadingOutlined, RobotOutlined, SendOutlined, SoundOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import { Spin, Row, Col } from 'antd'; // Import thêm Row và Col từ Ant Design
import './Speaking.scss'
interface Message {
    sender: 'user' | 'system';
    content: string;
    audioUrl?: string;
}

function Speaking() {
    const [record, setRecord] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [conversation, setConversation] = useState<Message[]>([]);
    const [step, setStep] = useState(0);
    const [end, setEnd] = useState('');
    const [topics, setTopics] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [loadingSend, setLoadingSend] = useState(false);
    const [loadingRecieve, setLoadingRecieve] = useState(false);
    const [evaluation, setEvaluation] = useState<string | null>(null); // Đánh giá từ backend
    const [conversationHistory, setConversationHistory] = useState<string | null>(null); // Lịch sử hội thoại từ backend

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await FlashCardService.getTopicInConversation();
                setTopics(response.topics);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };
        fetchTopics();
    }, []);

    const selectTopic = async (topic: string) => {
        setLoadingRecieve(true);
        setSelectedTopic(topic);
        setStep(0);
        setEvaluation(null); // Reset evaluation when a new topic is selected
        setConversationHistory(null); // Reset conversation history
        try {
            const response = await FlashCardService.startConversation(topic);
            const { text_response, audio_file_url } = response.data;
    
            // Thêm phản hồi từ hệ thống vào hội thoại
            setConversation([{ sender: 'system', content: text_response, audioUrl: audio_file_url }]);
    
            // Tự động phát âm thanh từ backend
            if (audio_file_url) {
                const audio = new Audio(audio_file_url);
                audio.play();
            }
    
            setLoadingRecieve(false);
        } catch (error) {
            console.error('Error fetching first system response:', error);
            setLoadingRecieve(false);
        }
    };
    

    const startRecording = () => {
        setRecord(true);
    };

    const stopRecording = async (recordedData: ReactMicStopEvent) => {
        setRecord(false);
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const audioContext = new AudioContext();
            const arrayBuffer = await recordedData.blob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const wavData = await WavEncoder.encode({
                sampleRate: audioBuffer.sampleRate,
                channelData: [audioBuffer.getChannelData(0)]
            });
            const wavBlob = new Blob([wavData], { type: 'audio/wav' });
            setAudioBlob(wavBlob);
        } catch (error) {
            console.error('Error processing audio:', error);
        }
    };

    const sendAudio = async () => {
        if (!audioBlob || !selectedTopic || !conversation.length) return;
        setLoadingSend(true);
    
        // Tạo FormData để gửi file âm thanh
        const formData = new FormData();
        formData.append('audio_file', audioBlob, 'user_audio.wav'); // Gửi file âm thanh với tên 'user_audio.wav'
    
        // Lấy câu hỏi của hệ thống từ hội thoại hiện tại
        const system_response = conversation[conversation.length - 1]?.content || '';
        if (!system_response) {
            console.error('System response is empty');
            setLoadingSend(false);
            return;
        }
        formData.append('system_response', system_response); // Gửi câu hỏi của hệ thống
    
        try {
            const response = await FlashCardService.speaking(formData);
            console.log(response); // Log toàn bộ phản hồi để kiểm tra dữ liệu
    
            const { text_response, audio_file_url, user_response_text, evaluation, conversation_history } = response.data;
    
            if (evaluation && conversation_history) {
                setEnd('Kết thúc');
                setEvaluation(evaluation); // Hiển thị đánh giá từ mô hình
                setConversationHistory(conversation_history); // Lưu lịch sử hội thoại
                console.log("Conversation has ended");
                return;
            }
    
            // Thêm phản hồi của người dùng và câu trả lời tiếp theo của hệ thống vào hội thoại
            setConversation((prev) => [
                ...prev,
                { sender: 'user', content: user_response_text }, // Sử dụng nội dung văn bản từ âm thanh
                { sender: 'system', content: text_response, audioUrl: audio_file_url }
            ]);
    
            const audio = new Audio(audio_file_url);
            audio.play();
            setStep((prevStep) => prevStep + 1);
        } catch (error) {
            console.error('Error sending audio:', error);
        } finally {
            setLoadingSend(false);
            setAudioBlob(null);
        }
    };
    

    function getRandomBgColor() {
        const colors = [
            'bg-red-500',
            'bg-blue-500',
            'bg-green-500',
            'bg-yellow-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-teal-500',
            'bg-orange-500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return (
        <div className='p-10'>
            <div id='banner-speaking' className='w-full h-96 bg-cover bg-center mb-2 rounded-md shadow-md'></div>
            {!selectedTopic && (
                <div className='mb-4'>
                    {topics && topics.length > 0 ? (
                        <div className='grid grid-cols-2 gap-4'>
                            {topics.map((topic) => (
                                <button
                                    key={topic}
                                    onClick={() => selectTopic(topic)}
                                    className={`text-white font-semibold py-2 px-4 rounded ${getRandomBgColor()}`}
                                >
                                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <span className='flex justify-center'><Spin /></span>
                    )}
                </div>
            )}
            {selectedTopic && (
                <div>
                    <div className='border p-4 mb-4' style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {conversation.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <span className={msg.sender === 'user' ? 'bg-blue-300 p-2 rounded' : 'bg-gray-300 p-2 rounded'}>
                                    {msg.sender === 'user' ? <UserOutlined /> : <RobotOutlined />} {msg.content}
                                </span>
                                {msg.audioUrl && (
                                    <div className="mt-2">
                                        <button onClick={() => { const audio = new Audio(msg.audioUrl); audio.play(); }}>
                                            <SoundOutlined />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <div className="border p-4 rounded bg-gray-100">
                                <h4 className="font-semibold mb-2">Đánh giá:</h4>
                                {evaluation ? (
                                    <div dangerouslySetInnerHTML={{ __html: evaluation }}></div>
                                ) : (
                                    <Spin />
                                )}
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="border p-4 rounded bg-white">
                                <h4 className="font-semibold mb-2">Lịch sử hội thoại:</h4>
                                {conversationHistory ? (
                                    <div dangerouslySetInnerHTML={{ __html: conversationHistory }}></div>
                                ) : (
                                    <Spin />
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
            <div className='flex justify-center mb-2'>
                <ReactMic record={record} className="sound-wave h-8 rounded-md" onStop={stopRecording} mimeType="audio/wav" />
            </div>
            <div className='flex justify-center'>
                <button onClick={startRecording} disabled={record} className='bg-[#35509a] p-2 rounded-md text-white'>
                    <AudioOutlined />
                </button>
                <button onClick={stopRecording} disabled={!record} className='ml-2 p-2 bg-gray-200 rounded-md text-black'>
                    <StopOutlined />
                </button>
                {audioBlob && (
                    <div>
                        <button onClick={sendAudio} className='ml-2 p-2 bg-gray-200 rounded-md text-black'>
                            {loadingSend ? <LoadingOutlined /> : <SendOutlined />}
                        </button>
                    </div>
                )}
            </div>
            <p>{end}</p>
        </div>
    );
}

export default Speaking;
