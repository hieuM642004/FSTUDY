'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    Button,
    message,
    Select,
    Progress,
    Input,
    Typography,
} from 'antd';
import { nestApiInstance } from '../../../../constant/api';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

type WordMatchingData = {
    _id: string;
    words: string[];
    matches: string[];
};

type ProgressData = {
    progress: number;
    completed: boolean;
    selectedMatches: { [key: string]: string };
    wordMatchingId: string;
};

type ResultType = { [word: string]: boolean };
type CorrectMatchesType = { [key: number]: ResultType };

const WordMatchingPage = ({ id }: { id: string }) => {
    const [questions, setQuestions] = useState<WordMatchingData[]>([]);
    const [selectedWords, setSelectedWords] = useState<{
        [key: string]: string;
    }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState<CorrectMatchesType>({});
    const [progress, setProgress] = useState<number>(0);
    const [completed, setCompleted] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const { Title } = Typography;
    useEffect(() => {
        const token = getCookie('token') as string;
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            setUserId(null);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchLessons = async () => {
                try {
                    const response = await nestApiInstance.get(
                        `/course/content/${id}`,
                    );
                    setQuestions(response.data.word_matching);

                    const progressResponse = await nestApiInstance.get(
                        `/course/word-progress/${userId}/${id}`,
                    );
                    const progressData: ProgressData = progressResponse.data;

                    if (progressData) {
                        setProgress(progressData.progress);
                        setCompleted(progressData.completed);
                        setSelectedWords(progressData.selectedMatches || {});
                    }
                } catch (error) {
                    console.error('Error fetching lessons or progress:', error);
                }
            };

            fetchLessons();
        }
    }, [userId, id]);

    const handleMatchChange = (
        questionIndex: number,
        word: string,
        match: string,
    ) => {
        setSelectedWords((prev) => ({
            ...prev,
            [`${questionIndex}-${word}`]: match,
        }));
    };

    const handleSubmit = async () => {
        if (questions.length === 0) return;

        const correctMatches: CorrectMatchesType = questions.reduce(
            (acc, question, questionIndex) => {
                const questionResult: ResultType = question.words.reduce(
                    (questionAcc, word) => {
                        const selectedMatch = (
                            selectedWords[`${questionIndex}-${word}`] || ''
                        )
                            .trim()
                            .toLowerCase();
                        const correctMatch =
                            question.matches[question.words.indexOf(word)]
                                ?.trim()
                                .toLowerCase() || '';
                        const isCorrect = selectedMatch === correctMatch;
                        return { ...questionAcc, [word]: isCorrect };
                    },
                    {},
                );

                return { ...acc, [questionIndex]: questionResult };
            },
            {},
        );

        setResult(correctMatches);
        setIsSubmitted(true);

        // Calculate correct count and current progress
        const totalQuestions = questions.length;
        const correctCount = Object.values(correctMatches).reduce(
            (count, questionResult) => {
                return (
                    count +
                    Object.values(questionResult).filter(
                        (isCorrect) => isCorrect,
                    ).length
                );
            },
            0,
        );

        const totalWords = questions.reduce(
            (sum, question) => sum + question.words.length,
            0,
        );
        const currentProgress = Math.round((correctCount / totalWords) * 100);
        const isCompleted = currentProgress >= 100;

        // Update progress
        try {
            await nestApiInstance.post('/course/update/word-progress', {
                wordId: id,
                progress: currentProgress,
                userId: userId || null,
                selectedMatches: selectedWords,
                completed: isCompleted,
            });

            setProgress(currentProgress);
            setCompleted(isCompleted);

            if (isCompleted) {
                message.success('Bạn đã ghép đúng tất cả các từ!', 1);
            } else {
                message.info(`Tiến độ của bạn là: ${currentProgress}%`, 1);
            }
        } catch (error) {
            console.error('Error updating word matching progress:', error);
            message.error('Đã xảy ra lỗi khi cập nhật tiến độ!', 1);
        }
    };

    return (
        <div className="p-10">
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
                <Title level={2} style={{ color: 'black', fontWeight: 'bold' }}>
                    HÃY CHỈNH SỬA LỖI CÚ PHÁP
                </Title>
            </div>
            {questions.length > 0 && (
                <>
                    {questions.map((lesson, questionIndex) => (
                        <Card
                            key={lesson._id}
                            title={`Câu hỏi ${questionIndex + 1}`}
                            className="mb-4"
                        >
                            <div className="flex flex-col gap-4">
                                {lesson.words.map((word) => (
                                    <div
                                        key={word}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="w-[20%]">{word}</span>

                                        <Input
                                            placeholder="Nhập đáp án"
                                            onChange={(e: any) =>
                                                handleMatchChange(
                                                    questionIndex,
                                                    word,
                                                    e.target.value,
                                                )
                                            }
                                            disabled={isSubmitted}
                                            className="w-64"
                                            value={
                                                selectedWords[
                                                    `${questionIndex}-${word}`
                                                ]
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                    <div className="mt-4">
                        {/* <Button
                            className="menu-toggle-btn btn-primary font-semibold"
                            type="primary"
                            onClick={handleSubmit}
                        >
                            Gửi câu trả lời
                        </Button> */}
                        <ButtonPrimary
                            size={'large'}
                            label={'Gửi câu trả lời'}
                            onClick={handleSubmit}
                            htmlType="submit"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        />
                    </div>
                    {isSubmitted && (
                        <div className="mt-4">
                            <h3>Kết quả:</h3>
                            {questions.map((lesson, questionIndex) => (
                                <Card
                                    key={lesson._id}
                                    title={`Câu hỏi ${questionIndex + 1}`}
                                >
                                    {lesson.words.map((word) => (
                                        <Card key={word} title={`Từ: ${word}`}>
                                            <p>
                                                <strong>Đáp án đã chọn:</strong>{' '}
                                                {
                                                    selectedWords[
                                                        `${questionIndex}-${word}`
                                                    ]
                                                }
                                            </p>
                                            <p>
                                                <strong>Kết quả:</strong>{' '}
                                                {result[questionIndex]?.[word]
                                                    ? 'Đúng'
                                                    : 'Sai'}
                                            </p>
                                        </Card>
                                    ))}
                                </Card>
                            ))}
                        </div>
                    )}
                    <Progress
                        percent={progress}
                        status={completed ? 'success' : 'active'}
                        style={{ marginTop: 16 }}
                    />
                </>
            )}
        </div>
    );
};

export default WordMatchingPage;
