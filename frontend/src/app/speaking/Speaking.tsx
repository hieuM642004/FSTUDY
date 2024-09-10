'use client';

import { useEffect, useState } from 'react';
import { ReactMic, ReactMicStopEvent } from 'react-mic';
import FlashCardService from '@/services/FlashCardService';
import WavEncoder from 'wav-encoder';
import { AudioOutlined, LoadingOutlined, RobotOutlined, SendOutlined, SoundOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


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
    const [expectedResponse, setExpectedResponse] = useState<string | null>(null);
    const [similarityPercentage, setSimilarityPercentage] = useState<number | null>(null); 
    const [end, setEnd] = useState(''); 
    const [topics, setTopics] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null); 
    const [loadingSend, setLoadingSend] = useState(false);
    const [loadingRecieve, setLoadingRecieve] = useState(false);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await FlashCardService.getTopicInConversation(); 
                setTopics(response.topics);
                console.log('Fetched topics:', response.topics); 
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
        try {
            const response = await FlashCardService.startConversation(topic);
            const { text_response, audio_file_url, expected_user_response } = response.data;
            setConversation([{ sender: 'system', content: text_response, audioUrl: audio_file_url }]);
            setExpectedResponse(expected_user_response);
            setLoadingRecieve(false);
        } catch (error) {
            console.error('Error fetching first system response:', error);
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
        if (!audioBlob || !selectedTopic) return;
        setLoadingSend(true); 
        const formData = new FormData();
        const stepToSend = step === 0 ? step + 1 : step;
        formData.append('file', audioBlob, 'user_audio.wav');
        formData.append('topic', selectedTopic);
        formData.append('step', String(stepToSend));  
        try {
            const response = await FlashCardService.speaking(formData);
            const { text_response, user_input_text, similarity_percentage, expected_user_response, audio_file_url, next_step } = response.data;
            if (response.data.error && response.data.error === "End of conversation") {
                setEnd('Kết thúc');
                console.log("Conversation has ended");
                return;
            }
            setSimilarityPercentage(similarity_percentage);
            setConversation((prev) => [
                ...prev,
                { sender: 'user', content: user_input_text || '...User Speech...' },
                { sender: 'system', content: text_response, audioUrl: audio_file_url }
            ]);
            const audio = new Audio(audio_file_url);
            audio.play();
            setStep(next_step); 
            setExpectedResponse(expected_user_response);
        } catch (error) {
            console.error('Error sending audio:', error);
        } finally {
            setLoadingSend(false); 
            setAudioBlob(null);
        }
    };

    const continueConversation = () => {
        setStep((prevStep) => prevStep + 1);
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
            <h2 className='text-2xl font-semibold p-4 shadow-md rounded-md mb-3'>Luyện tập speaking</h2>
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
                  <span className='flex justify-center'><Spin ></Spin></span>
               )}
           </div>
            )}
            {selectedTopic && (
                <div>
                    <span className='flex justify-center'>{loadingRecieve && <Spin /> }</span>
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
                                {msg.sender === 'user' && similarityPercentage !== null && (
                                    <div className="mt-2 text-right">
                                        <h4 className="inline">Tỷ lệ phát âm của bạn:</h4>
                                        <p className="inline ml-2">{similarityPercentage}%</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center mb-2'>
                        {expectedResponse && (
                            <div className="flex">
                                <h4>Phản hồi mong đợi tiếp theo:</h4>
                                <p>{expectedResponse}</p>
                            </div>
                        )}
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
            )}
        </div>
    );
}

export default Speaking;
