'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, message, Select } from 'antd';
import { nestApiInstance } from '../../../../constant/api';

type WordMatchingData = {
    _id: string;
    words: string[];
    matches: string[];
};

const WordMatchingPage = ({ id }: { id: string }) => {
    const [questions, setQuestions] = useState<WordMatchingData[]>([]);
    const [selectedWords, setSelectedWords] = useState<{
        [key: string]: string;
    }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState<{ [key: string]: boolean }>({});

    const fetchLessons = async () => {
        try {
            const response = await nestApiInstance.get(`/course/content/${id}`);
            setQuestions(response.data.word_matching);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, [id]);

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

    const handleSubmit = () => {
        const unselectedWords = questions.some((question, questionIndex) =>
            question.words.some(
                (word) => !selectedWords[`${questionIndex}-${word}`],
            ),
        );

        if (unselectedWords) {
            message.error('Vui lòng chọn đáp án cho tất cả các từ!', 1);
            return;
        }

        const correctMatches = questions.reduce(
            (acc, question, questionIndex) => {
                const questionResult = question.words.reduce(
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

        const allCorrect = Object.values(correctMatches).every((result) =>
            Object.values(result).every((isCorrect) => isCorrect),
        );

        if (allCorrect) {
            message.success('Bạn đã ghép đúng tất cả các từ!', 1);
        } else {
            message.error('Bạn đã ghép sai một số từ! Hãy thử lại', 1);
        }
    };

    return (
        <div className="p-10">
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
                                        <span>{word}</span>
                                        <Select
                                            placeholder="Chọn đáp án"
                                            onChange={(value) =>
                                                handleMatchChange(
                                                    questionIndex,
                                                    word,
                                                    value,
                                                )
                                            }
                                            disabled={isSubmitted}
                                            className="w-64"
                                            value={
                                                selectedWords[
                                                    `${questionIndex}-${word}`
                                                ]
                                            }
                                        >
                                            {lesson.matches.map((match) => (
                                                <Select.Option
                                                    key={match}
                                                    value={match}
                                                >
                                                    {match}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                    <div className="mt-4">
                        <Button
                            className="menu-toggle-btn btn-primary font-semibold"
                            type="primary"
                            onClick={handleSubmit}
                            disabled={isSubmitted}
                        >
                            Gửi câu trả lời
                        </Button>
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
                </>
            )}
        </div>
    );
};

export default WordMatchingPage;
