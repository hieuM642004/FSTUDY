'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Button, message, Progress } from 'antd';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../constant/api';
import { getCookie } from 'cookies-next';
import {jwtDecode} from 'jwt-decode';

type FillInTheBlankData = {
    _id: string;
    sentence: string;
    correctAnswers: string[];
};

type CourseData = {
    _id: string;
    fill_in_the_blank: FillInTheBlankData[];
};

type ProgressData = {
    progress: number;
    completed: boolean;
    selectedAnswers: string[][];
};

const FillInTheBlankPage = ({ id }: { id: string }) => {
    const [lessonsCourse, setLessonsCourse] = useState<CourseData | null>(null);
    const [userAnswers, setUserAnswers] = useState<string[][]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answersDisplay, setAnswersDisplay] = useState<any[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [userId, setUserId] = useState<string | null>(null);
    const [completed, setCompleted] = useState<boolean>(false);
    const router = useRouter();

    // Fetch userId and progress when component mounts
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
            const fetchLessonsCourse = async () => {
                try {
                    const response = await nestApiInstance.get(`/course/content/${id}`);
                    setLessonsCourse(response.data);
    
                    const progressResponse = await nestApiInstance.get(`/course/fill-progress/${userId}/${id}`);
                    const progressData: ProgressData = progressResponse.data;
    
                    if (progressData) {
                        setProgress(progressData.progress);
                        setCompleted(progressData.completed);
                        setUserAnswers(progressData.selectedAnswers || []);
                        setAnswersDisplay(
                            response.data.fill_in_the_blank.map((item: FillInTheBlankData, index: number) => ({
                                sentence: item.sentence,
                                userAnswer: progressData.selectedAnswers[index] || [],
                                isCorrect: JSON.stringify(item.correctAnswers.map(a => a.toLowerCase()).sort()) ===
                                    JSON.stringify((progressData.selectedAnswers[index] || []).map(a => a.toLowerCase()).sort()),
                            }))
                        );
                    }
                } catch (error) {
                    console.error('Error fetching course detail or progress:', error);
                }
            };
    
            fetchLessonsCourse();
        }
    }, [userId, id]);
    

    const handleAnswerChange = (index: number, answerIndex: number, value: string) => {
        const newUserAnswers = [...userAnswers];
        if (!newUserAnswers[index]) {
            newUserAnswers[index] = ['', ''];
        }
        newUserAnswers[index][answerIndex] = value;
        setUserAnswers(newUserAnswers);
    };

    const handleSubmit = async () => {
        if (!lessonsCourse) return;

        if (userAnswers.length !== lessonsCourse.fill_in_the_blank.length) {
            message.warning('Vui lòng điền đầy đủ câu trả lời cho tất cả các câu hỏi!', 1);
            return;
        }

        const correctAnswers = lessonsCourse.fill_in_the_blank.map((item: FillInTheBlankData, index: number) =>
            JSON.stringify(item.correctAnswers.map(a => a.toLowerCase()).sort()) ===
            JSON.stringify(userAnswers[index].map(a => a.toLowerCase()).sort())
        );

        const totalQuestions = lessonsCourse.fill_in_the_blank.length;
        const correctCount = correctAnswers.filter(isCorrect => isCorrect).length;
        const currentProgress = Math.round((correctCount / totalQuestions) * 100);
        const isCompleted = currentProgress >= 100;

        try {
            await nestApiInstance.post('/course/update/fill-progress', {
                fillId: lessonsCourse._id,
                progress: currentProgress,
                userId: userId || null,
                selectedAnswers: userAnswers,
                completed: isCompleted
            });

            setProgress(currentProgress);
            setCompleted(isCompleted);

            if (isCompleted) {
                message.success('Bạn đã hoàn thành bài tập điền từ với tất cả đáp án đúng!', 1);
            } else {
                message.info(`Tiến độ của bạn là: ${currentProgress}%`, 1);
            }

            setAnswersDisplay(
                lessonsCourse.fill_in_the_blank.map((item: FillInTheBlankData, index: number) => ({
                    sentence: item.sentence,
                    userAnswer: userAnswers[index],
                    isCorrect: JSON.stringify(item.correctAnswers.map(a => a.toLowerCase()).sort()) ===
                        JSON.stringify(userAnswers[index].map(a => a.toLowerCase()).sort()),
                }))
            );
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error updating fill-in-the-blank progress:', error);
            message.error('Đã xảy ra lỗi khi cập nhật tiến độ!', 1);
        }
    };

    const handleResubmit = async () => {
        if (!lessonsCourse) return;

        if (userAnswers.length !== lessonsCourse.fill_in_the_blank.length) {
            message.warning('Vui lòng điền đầy đủ câu trả lời cho tất cả các câu hỏi!', 1);
            return;
        }

        const correctAnswers = lessonsCourse.fill_in_the_blank.map((item: FillInTheBlankData, index: number) =>
            JSON.stringify(item.correctAnswers.map(a => a.toLowerCase()).sort()) ===
            JSON.stringify(userAnswers[index].map(a => a.toLowerCase()).sort())
        );

        const totalQuestions = lessonsCourse.fill_in_the_blank.length;
        const correctCount = correctAnswers.filter(isCorrect => isCorrect).length;
        const currentProgress = Math.round((correctCount / totalQuestions) * 100);
        const isCompleted = currentProgress >= 100;

        try {
            await nestApiInstance.post('/course/update/fill-progress', {
                fillId: lessonsCourse._id,
                progress: currentProgress,
                userId: userId || null,
                selectedAnswers: userAnswers,
                completed: isCompleted
            });

            setProgress(currentProgress);
            setCompleted(isCompleted);

            if (isCompleted) {
                message.success('Bạn đã hoàn thành bài tập điền từ với tất cả đáp án đúng!', 1);
            } else {
                message.info(`Tiến độ của bạn là: ${currentProgress}%`, 1);
            }

            setAnswersDisplay(
                lessonsCourse.fill_in_the_blank.map((item: FillInTheBlankData, index: number) => ({
                    sentence: item.sentence,
                    userAnswer: userAnswers[index],
                    isCorrect: JSON.stringify(item.correctAnswers.map(a => a.toLowerCase()).sort()) ===
                        JSON.stringify(userAnswers[index].map(a => a.toLowerCase()).sort()),
                }))
            );
        } catch (error) {
            console.error('Error updating fill-in-the-blank progress:', error);
            message.error('Đã xảy ra lỗi khi cập nhật tiến độ!', 1);
        }
    };

    return (
        <div className="content-sale">
        <div className="p-10">
            {completed && <h3>Bạn đã hoàn thành bài tập này!</h3>}
            {lessonsCourse?.fill_in_the_blank.map((item: FillInTheBlankData, index: number) => (
                <Card key={item._id} title={`Câu hỏi ${index + 1}`}>
                    <p>{item.sentence}</p>
                    <Input
                        placeholder="Nhập đáp án 1"
                        value={userAnswers[index]?.[0] || ''}
                        onChange={(e) => handleAnswerChange(index, 0, e.target.value)}
                        disabled={isSubmitted && answersDisplay[index]?.isCorrect}
                    />
                    <Input
                        placeholder="Nhập đáp án 2"
                        value={userAnswers[index]?.[1] || ''}
                        onChange={(e) => handleAnswerChange(index, 1, e.target.value)}
                        disabled={isSubmitted && answersDisplay[index]?.isCorrect}
                        style={{ marginTop: 8 }}
                    />
                    {isSubmitted && !answersDisplay[index]?.isCorrect && (
                        <p style={{ color: 'red' }}>Đáp án của bạn sai, hãy chọn lại!</p>
                    )}
                </Card>
            ))}
            <div style={{ marginTop: 16 }}>
                <Button
                    className="menu-toggle-btn btn-primary font-semibold"
                    onClick={handleSubmit}
                    disabled={isSubmitted}
                >
                    {isSubmitted ? 'Đã nộp' : 'Nộp bài'}
                </Button>
                <Button
                    className="menu-toggle-btn btn-secondary font-semibold"
                    onClick={handleResubmit}
                    disabled={!isSubmitted}
                    style={{ marginLeft: 8 }}
                >
                    Nộp lại
                </Button>
            </div>
            <Progress
                percent={progress}
                status={completed ? 'success' : 'active'}
                style={{ marginTop: 16 }}
            />
        </div>
    </div>
    
    );
};

export default FillInTheBlankPage;
