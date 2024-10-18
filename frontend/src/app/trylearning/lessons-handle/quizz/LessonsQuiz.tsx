'use client';

import React, { useState, useEffect } from 'react';
import { Card, Radio, Button, message, Progress } from 'antd';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../constant/api';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

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
    const [progress, setProgress] = useState<number>(0); // Current progress state
    const [userId, setUserId] = useState<string | null>(null);
    const [completed, setCompleted] = useState<boolean>(false); // Track if quiz is completed
    const router = useRouter();

    // Fetch lesson course and user's quiz progress
    const fetchLessonsCourse = async () => {
        try {
            // Fetch quiz data
            const response = await nestApiInstance.get(`/course/content/${id}`);
            setLessonsCourse(response.data);

            // Fetch quiz progress for the user
            if (userId) {
                const quizProgressResponse = await nestApiInstance.get(
                    `/course/quiz-progress/${userId}/${id}`,
                );
                const quizProgress = quizProgressResponse.data;

                if (quizProgress) {
                    setProgress(quizProgress.progress); // Set the progress from DB
                    setCompleted(quizProgress.completed); // Set the completion status
                    setSelectedOptions(quizProgress.selectedAnswers || []); // Pre-fill selected answers if available
                    setAnswersDisplay(
                        response.data.quiz.map(
                            (quiz: QuizData, index: number) => ({
                                question: quiz.question,
                                selectedOption:
                                    quiz.options[
                                        quizProgress.selectedAnswers[index]
                                    ],
                                isCorrect:
                                    quizProgress.selectedAnswers[index] ===
                                    quiz.correctAnswer,
                            }),
                        ),
                    );
                }
            }
        } catch (error) {
            console.error(
                'Error fetching course detail or quiz progress:',
                error,
            );
        }
    };

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

        if (userId) {
            fetchLessonsCourse(); // Fetch lessons and progress when component mounts
        }
    }, [id, userId]);

    const handleOptionChange = (quizIndex: number, e: any) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[quizIndex] = e.target.value;
        setSelectedOptions(newSelectedOptions);
    };

    const calculateProgress = (
        correctAnswers: number,
        totalQuestions: number,
    ) => {
        return Math.round((correctAnswers / totalQuestions) * 100); // Calculate progress as a percentage
    };

    const handleSubmit = async () => {
        if (selectedOptions.length !== lessonsCourse.quiz.length) {
            message.warning(
                'Vui lòng chọn một câu trả lời cho tất cả các câu hỏi!',
                1,
            );
            return;
        }

        setIsSubmitted(true);

        // Calculate the number of correct answers
        const correctAnswers = lessonsCourse.quiz.filter(
            (quiz: QuizData, index: number) =>
                selectedOptions[index] === quiz.correctAnswer,
        ).length;

        const totalQuestions = lessonsCourse.quiz.length;

        // Calculate progress
        const currentProgress = calculateProgress(
            correctAnswers,
            totalQuestions,
        );
        const isCompleted = currentProgress === 100;

        try {
            // Send progress to the backend
            await nestApiInstance.post('/course/update/quiz-progress', {
                quizId: lessonsCourse._id,
                userId: userId || null,
                correctAnswers,
                totalQuestions,
                progress: currentProgress,
                completed: isCompleted,
                selectedAnswers: selectedOptions, // Save user's selected answers
            });

            // Update UI with the new progress and completion status
            setProgress(currentProgress); // Update the progress in the UI
            setCompleted(isCompleted); // Update completed status

            if (isCompleted) {
                message.success(
                    'Bạn đã hoàn thành quiz với số câu trả lời đúng!',
                    1,
                );
            } else {
                message.info(`Tiến độ của bạn là: ${currentProgress}%`, 1);
            }
        } catch (error) {
            console.error('Error updating quiz progress:', error);
            message.error('Đã xảy ra lỗi khi cập nhật tiến độ!', 1);
        }

        setAnswersDisplay(
            lessonsCourse.quiz.map((quiz: QuizData, index: number) => ({
                question: quiz.question,
                selectedOption: quiz.options[selectedOptions[index]],
                isCorrect: selectedOptions[index] === quiz.correctAnswer,
            })),
        );
    };

    const hasWrongAnswers = answersDisplay.some((answer) => !answer.isCorrect); // Check for incorrect answers

    return (
        <div className="content-sale">
            <div className="p-10">
                {/* Display completion message if quiz is completed */}
                {completed && <h3>Bạn đã hoàn thành bài quiz này!</h3>}
                {lessonsCourse?.quiz.map(
                    (quiz: QuizData, quizIndex: number) => {
                        const isCorrect =
                            selectedOptions[quizIndex] === quiz.correctAnswer;
                        return (
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
                                    disabled={completed && isCorrect}
                                >
                                    {quiz.options.map(
                                        (option: string, index: number) => (
                                            <Radio
                                                key={index}
                                                value={index}
                                                style={
                                                    completed &&
                                                    quiz.correctAnswer === index
                                                        ? { color: 'green' }
                                                        : undefined
                                                }
                                            >
                                                {option}
                                            </Radio>
                                        ),
                                    )}
                                </Radio.Group>
                                {}
                                {isSubmitted && !isCorrect && (
                                    <p style={{ color: 'red' }}>
                                        Đáp án của bạn sai, hãy chọn lại!
                                    </p>
                                )}
                            </Card>
                        );
                    },
                )}
                <div style={{ marginTop: 16 }}>
                    {}
                    {/* <Button
                        className="menu-toggle-btn btn-primary font-semibold"
                        type="primary"
                        onClick={handleSubmit}
                        disabled={!hasWrongAnswers && completed} // Allow submit if there are wrong answers
                    >
                        Gửi lại câu trả lời
                    </Button> */}
                    <ButtonPrimary
                        size={'large'}
                        label={'Gửi câu trả lời'}
                        onClick={handleSubmit}
                        disabled={!hasWrongAnswers && completed}
                        htmlType="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    />
                </div>

                {}
                {answersDisplay.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                        <h3>Kết quả câu trả lời:</h3>
                        {answersDisplay.map((answer, index) => (
                            <Card key={index} title={`Câu hỏi ${index + 1}`}>
                                <p>
                                    <strong>Câu hỏi:</strong> {answer.question}
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

                {}
                <div style={{ marginTop: 16 }}>
                    <h3>Tiến độ hiện tại:</h3>
                    <Progress
                        percent={progress}
                        status={completed ? 'success' : 'active'}
                    />{' '}
                    {/* Progress bar */}
                </div>
            </div>
        </div>
    );
};

export default LessonsHandlePage;
