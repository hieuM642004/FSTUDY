'use client';

import React, { useState, useEffect } from 'react';
import { Card, Radio, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../constant/api';
import TryLearningPages from '../../tryLearning';
type QuizData = {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
};

const LessonsHandlePage = ({ id }: { id: string }) => {
    const [lessonsCourse, setLessonsCourse] = useState<any>(null);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
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

    const handleOptionChange = (quizIndex: number, e: any) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[quizIndex] = e.target.value;
        setSelectedOptions(newSelectedOptions);
    };

    const handleSubmit = () => {
        if (selectedOptions.length !== lessonsCourse.quiz.length) {
            message.warning(
                'Vui lòng chọn một câu trả lời cho tất cả các câu hỏi!',
                1,
            );
            return;
        }

        setIsSubmitted(true);

        const correctAnswers = lessonsCourse.quiz.map(
            (quiz: QuizData, index: number) =>
                selectedOptions[index] === quiz.correctAnswer,
        );

        if (correctAnswers.every((isCorrect: any) => isCorrect)) {
            message.success('Bạn đã chọn đúng tất cả câu hỏi!', 1, () => {
                // Save answers to state and show them
                setAnswersDisplay(
                    lessonsCourse.quiz.map((quiz: QuizData, index: number) => ({
                        question: quiz.question,
                        selectedOption: quiz.options[selectedOptions[index]],
                        isCorrect:
                            selectedOptions[index] === quiz.correctAnswer,
                    })),
                );
                setIsSubmitted(false);
                setSelectedOptions([]);
            });
        } else {
            message.error(
                'Bạn đã chọn sai một số câu hỏi! Hãy chọn lại',
                1,
                () => {
                    // Save answers to state and show them
                    setAnswersDisplay(
                        lessonsCourse.quiz.map(
                            (quiz: QuizData, index: number) => ({
                                question: quiz.question,
                                selectedOption:
                                    quiz.options[selectedOptions[index]],
                                isCorrect:
                                    selectedOptions[index] ===
                                    quiz.correctAnswer,
                            }),
                        ),
                    );
                    setIsSubmitted(false);
                    setSelectedOptions([]);
                },
            );
        }
    };

    return (
        <>
            <div className="contetnt-sale">
                <div className="p-10">
                    {lessonsCourse?.quiz.map(
                        (quiz: QuizData, quizIndex: number) => (
                            <Card
                                key={quiz._id}
                                title={`Câu hỏi ${quizIndex + 1}: ${
                                    quiz.question
                                }`}
                            >
                                <Radio.Group
                                    onChange={(e) =>
                                        handleOptionChange(quizIndex, e)
                                    }
                                    value={selectedOptions[quizIndex]}
                                    disabled={isSubmitted}
                                >
                                    {quiz.options.map(
                                        (option: string, index: number) => (
                                            <Radio key={index} value={index}>
                                                {option}
                                            </Radio>
                                        ),
                                    )}
                                </Radio.Group>
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
                                <Card
                                    key={index}
                                    title={`Câu hỏi ${index + 1}`}
                                >
                                    <p>
                                        <strong>Câu hỏi:</strong>{' '}
                                        {answer.question}
                                    </p>
                                    <p>
                                        <strong>Đáp án đã chọn:</strong>{' '}
                                        {answer.selectedOption}
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
            </div>
        </>
    );
};

export default LessonsHandlePage;
