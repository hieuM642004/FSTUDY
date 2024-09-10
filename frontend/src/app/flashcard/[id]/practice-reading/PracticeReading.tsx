'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Progress } from 'antd';
import { ReactMic, ReactMicStopEvent } from 'react-mic';
import FlashCardService from '@/services/FlashCardService';
import FlashCardInterface from '@/types/FlashCard';
import type { ProgressProps } from 'antd';
import { AudioOutlined, PauseOutlined } from '@ant-design/icons';

interface WordRecordingState {
    isRecording: boolean;
    recordedBlob: Blob | null;
}

function PracticeReading({ id }: { id: string }) {
    const [flashCard, setFlashCard] = useState<FlashCardInterface | null>(null);
    const [wordRecordingStates, setWordRecordingStates] = useState<
        WordRecordingState[]
    >([]);
    const [twoColors] = useState<ProgressProps['strokeColor']>({
        '0%': '#108ee9',
        '100%': '#87d068',
    });
    const [currentlyRecordingIndex, setCurrentlyRecordingIndex] = useState<
        number | null
    >(null);
    const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FlashCardService.getAllFlashCardById(id);
                if (response) {
                    const initialRecordingStates = response.words.map(() => ({
                        isRecording: false,
                        recordedBlob: null,
                    }));
                    console.log(response);

                    setWordRecordingStates(initialRecordingStates);
                    setFlashCard(response);
                }
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchData();
    }, [id]);

    const toggleRecording = (word: string, audioUrl: string) => {
        const index = flashCard?.words.findIndex((w) => w.word === word) ?? -1;

        if (
            currentlyRecordingIndex !== null &&
            currentlyRecordingIndex !== index
        ) {
            stopRecording(currentlyRecordingIndex);
        }

        const newRecordingState = !wordRecordingStates[index]?.isRecording;

        setWordRecordingStates((prevStates) =>
            prevStates.map((state, i) => ({
                ...state,
                isRecording: i === index ? newRecordingState : false,
            })),
        );

        if (newRecordingState) {
            setCurrentlyRecordingIndex(index);
            recordingTimeoutRef.current = setTimeout(() => {
                stopRecording(index);
            }, 7000);
        } else {
            setCurrentlyRecordingIndex(null);
            if (recordingTimeoutRef.current) {
                clearTimeout(recordingTimeoutRef.current);
                recordingTimeoutRef.current = null;
            }
        }
    };

    const onStop = async (recordedData:any, word:any, index:any) => {
        const audioBlob = recordedData.blob;
    
        // Tạo file từ blob
        const file = new File([audioBlob], `${word}_user.mp3`, {
            type: 'audio/mp3',
        });
    
        // Tạo FormData và thêm các trường cần thiết
        const formData = new FormData();
        formData.append('user_audio', file);
        formData.append('word', word);
    
        try {
            console.log('Form data:', formData);
    
            const response = await fetch('http://localhost:5000/check_pronunciation', {
                method: 'POST',
                body: formData,
            });
    
            const responseData = await response.json();
            console.log('Proficiency:', responseData);
    
            // Xử lý kết quả và hiển thị độ chính xác
            setWordRecordingStates((prevStates) =>
                prevStates.map((state, i) =>
                    i === index
                        ? {
                              ...state,
                              recordedBlob: audioBlob,
                              proficiency: responseData.accuracy,
                          }
                        : state,
                ),
            );
        } catch (error) {
            console.error('Error measuring proficiency:', error);
        }
    };
    
    const stopRecording = (index: number) => {
        setWordRecordingStates((prevStates) =>
            prevStates.map((state, i) => ({
                ...state,
                isRecording: i === index ? false : state.isRecording,
            })),
        );

        setCurrentlyRecordingIndex(null);
        if (recordingTimeoutRef.current) {
            clearTimeout(recordingTimeoutRef.current);
            recordingTimeoutRef.current = null;
        }
    };

    return (
        <div className="mx-auto w-2/3 shadow-md p-4 my-10">
            {flashCard?.words.map((word, index) => (
                <div
                    key={index}
                    className="flex justify-center items-center p-4 rounded-md border-2 border-dashed mb-4"
                >
                    <Row gutter={[16, 16]} justify="center">
                        <Col xs={24} sm={8} className="text-center">
                            <h2 className="text-xl font-bold">Từ vựng</h2>
                            <p>{word?.word}</p>
                        </Col>
                        <Col xs={24} sm={8} className="text-center">
                            <h2 className="text-xl font-bold">Định nghĩa</h2>
                            <p>{word.definition}</p>
                        </Col>
                        <Col xs={24} sm={8} className="text-center">
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() =>
                                        toggleRecording(
                                            word.word,
                                            word.audioUrl,
                                        )
                                    }
                                    className={`p-2 rounded ${
                                        wordRecordingStates[index]?.isRecording
                                            ? 'bg-red-500'
                                            : 'bg-green-500'
                                    }`}
                                    disabled={
                                        currentlyRecordingIndex !== null &&
                                        currentlyRecordingIndex !== index
                                    }
                                >
                                    {wordRecordingStates[index]?.isRecording ? (
                                        <PauseOutlined />
                                    ) : (
                                        <AudioOutlined />
                                    )}
                                </button>
                                <ReactMic
                                    record={
                                        wordRecordingStates[index]?.isRecording
                                    }
                                    className="hidden"
                                    onStop={(recordedData) =>
                                        onStop(
                                            recordedData,
                                            word.word,
                                            
                                            index,
                                        )
                                    }
                                    strokeColor="#000000"
                                    backgroundColor="#FF4081"
                                />
                                {wordRecordingStates[index]?.recordedBlob && (
                                    <div className="mt-4">
                                        <audio
                                            controls
                                            src={URL.createObjectURL(
                                                wordRecordingStates[index]
                                                    .recordedBlob,
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs={24} className="text-center mt-4">
                            <Progress percent={99.9} strokeColor={twoColors} />
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    );
}

export default PracticeReading;
