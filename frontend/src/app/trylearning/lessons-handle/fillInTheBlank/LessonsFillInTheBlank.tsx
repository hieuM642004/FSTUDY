'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../constant/api';

type FillInTheBlankData = {
    _id: string;
    sentence: string;
    correctAnswers: string[];
};

const FillInTheBlankPage = ({ id }: { id: string }) => {
    const [lessonsCourse, setLessonsCourse] = useState<any>(null);
    const [userAnswers, setUserAnswers] = useState<string[][]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answersDisplay, setAnswersDisplay] = useState<any[]>([]);
    const router = useRouter();

    const fetchLessonsCourse = async () => {
        try {
            const response = await nestApiInstance.get(`/course/content/${id}`);
            setLessonsCourse(response.data);
        } catch (error) {
            console.error('Error fetching course detail:', error);
        }
    };

    useEffect(() => {
        fetchLessonsCourse();
    }, [id]);

    const handleAnswerChange = (
        index: number,
        answerIndex: number,
        value: string,
    ) => {
        const newUserAnswers = [...userAnswers];
        if (!newUserAnswers[index]) {
            newUserAnswers[index] = ['', ''];
        }
        newUserAnswers[index][answerIndex] = value; 
        setUserAnswers(newUserAnswers);
    };

    const handleSubmit = () => {
        if (userAnswers.length !== lessonsCourse?.fill_in_the_blank.length) {
            message.warning(
                'Vui lòng điền đầy đủ câu trả lời cho tất cả các câu hỏi!',
                1,
            );
            return;
        }

        setIsSubmitted(true);

        const correctAnswers = lessonsCourse.fill_in_the_blank.map(
            (item: FillInTheBlankData, index: number) =>
                JSON.stringify(
                    item.correctAnswers
                        .map((answer) => answer.toLowerCase())
                        .sort(),
                ) ===
                JSON.stringify(
                    userAnswers[index]
                        .map((answer) => answer.toLowerCase())
                        .sort(),
                ),
        );

        if (correctAnswers.every((isCorrect: any) => isCorrect)) {
            message.success('Bạn đã điền đúng tất cả câu hỏi!', 1, () => {
                setAnswersDisplay(
                    lessonsCourse.fill_in_the_blank.map(
                        (item: FillInTheBlankData, index: number) => ({
                            sentence: item.sentence,
                            userAnswer: userAnswers[index],
                            isCorrect:
                                JSON.stringify(
                                    item.correctAnswers
                                        .map((answer) => answer.toLowerCase())
                                        .sort(),
                                ) ===
                                JSON.stringify(
                                    userAnswers[index]
                                        .map((answer) => answer.toLowerCase())
                                        .sort(),
                                ),
                        }),
                    ),
                );
                setIsSubmitted(false);
                setUserAnswers([]);
            });
        } else {
            message.error(
                'Bạn đã điền sai một số câu hỏi! Hãy điền lại',
                1,
                () => {
                    setAnswersDisplay(
                        lessonsCourse.fill_in_the_blank.map(
                            (item: FillInTheBlankData, index: number) => ({
                                sentence: item.sentence,
                                userAnswer: userAnswers[index],
                                isCorrect:
                                    JSON.stringify(
                                        item.correctAnswers
                                            .map((answer) =>
                                                answer.toLowerCase(),
                                            )
                                            .sort(),
                                    ) ===
                                    JSON.stringify(
                                        userAnswers[index]
                                            .map((answer) =>
                                                answer.toLowerCase(),
                                            )
                                            .sort(),
                                    ),
                            }),
                        ),
                    );
                    setIsSubmitted(false);
                    setUserAnswers([]);
                },
            );
        }
    };

    return (
        <>
            <div className="p-10">
                {lessonsCourse?.fill_in_the_blank.map(
                    (item: FillInTheBlankData, index: number) => (
                        <Card key={item._id} title={`Câu hỏi ${index + 1}`}>
                            <p>{item.sentence}</p>
                            <Input
                                placeholder="Nhập đáp án 1"
                                value={userAnswers[index]?.[0] || ''}
                                onChange={(e) =>
                                    handleAnswerChange(index, 0, e.target.value)
                                }
                                disabled={isSubmitted}
                            />
                            <Input
                                placeholder="Nhập đáp án 2"
                                value={userAnswers[index]?.[1] || ''}
                                onChange={(e) =>
                                    handleAnswerChange(index, 1, e.target.value)
                                }
                                disabled={isSubmitted}
                                style={{ marginTop: 8 }}
                            />
                        </Card>
                    ),
                )}
                <div style={{ marginTop: 16 }}>
                    <Button
                        className="menu-toggle-btn btn-primary font-semibold"
                        type="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                    >
                        Gửi câu trả lời
                    </Button>
                </div>
                {answersDisplay.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                        <h3>Kết quả câu trả lời:</h3>
                        {answersDisplay.map((answer, index) => (
                            <Card key={index} title={`Câu hỏi ${index + 1}`}>
                                <p>
                                    <strong>Câu hỏi:</strong> {answer.sentence}
                                </p>
                                <p>
                                    <strong>Đáp án đã điền:</strong>{' '}
                                    {answer.userAnswer.join(', ')}
                                </p>
                                <p>
                                    <strong>Kết quả:</strong>{' '}
                                    {answer.isCorrect ? 'Đúng' : 'Sai'}
                                </p>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default FillInTheBlankPage;
