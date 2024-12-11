'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Button, message, Progress } from 'antd';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../constant/api';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

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
                    const response = await nestApiInstance.get(
                        `/course/content/${id}`,
                    );
                    console.log('check data:', response);

                    setLessonsCourse(response.data);

                    const progressResponse = await nestApiInstance.get(
                        `/course/fill-progress/${userId}/${id}`,
                    );
                    const progressData: ProgressData = progressResponse.data;

                    if (progressData) {
                        setProgress(progressData.progress);
                        setCompleted(progressData.completed);
                        setUserAnswers(progressData.selectedAnswers || []);
                        setAnswersDisplay(
                            response.data.fill_in_the_blank.map(
                                (item: FillInTheBlankData, index: number) => ({
                                    sentence: item.sentence,
                                    userAnswer:
                                        progressData.selectedAnswers[index] ||
                                        [],
                                    isCorrect:
                                        JSON.stringify(
                                            item.correctAnswers
                                                .map((a) => a.toLowerCase())
                                                .sort(),
                                        ) ===
                                        JSON.stringify(
                                            (
                                                progressData.selectedAnswers[
                                                    index
                                                ] || []
                                            )
                                                .map((a) => a.toLowerCase())
                                                .sort(),
                                        ),
                                }),
                            ),
                        );
                    }
                } catch (error) {
                    console.error(
                        'Error fetching course detail or progress:',
                        error,
                    );
                }
            };

            fetchLessonsCourse();
        }
    }, [userId, id]);

    const handleAnswerChange = (
        index: number,
        answerIndex: number,
        value: string,
    ) => {
        const newUserAnswers = [...userAnswers];
        if (!newUserAnswers[index]) {
            newUserAnswers[index] = Array(
                lessonsCourse?.fill_in_the_blank[index].correctAnswers.length ||
                    0,
            ).fill('');
        }
        newUserAnswers[index][answerIndex] = value;
        setUserAnswers(newUserAnswers);
    };

    const handleSubmit = async () => {
        if (!lessonsCourse) return;

        if (userAnswers.length !== lessonsCourse.fill_in_the_blank.length) {
            message.warning(
                'Vui lòng điền đầy đủ câu trả lời cho tất cả các câu hỏi!',
                1,
            );
            return;
        }

        const correctAnswers = lessonsCourse.fill_in_the_blank.map(
            (item: FillInTheBlankData, index: number) =>
                JSON.stringify(
                    item.correctAnswers.map((a) => a.toLowerCase()).sort(),
                ) ===
                JSON.stringify(
                    userAnswers[index].map((a) => a.toLowerCase()).sort(),
                ),
        );

        const totalQuestions = lessonsCourse.fill_in_the_blank.length;
        const correctCount = correctAnswers.filter(
            (isCorrect) => isCorrect,
        ).length;
        const currentProgress = Math.round(
            (correctCount / totalQuestions) * 100,
        );
        const isCompleted = currentProgress >= 100;

        try {
            await nestApiInstance.post('/course/update/fill-progress', {
                fillId: lessonsCourse._id,
                progress: currentProgress,
                userId: userId || null,
                selectedAnswers: userAnswers,
                completed: isCompleted,
            });

            setProgress(currentProgress);
            setCompleted(isCompleted);

            if (isCompleted) {
                message.success(
                    'Bạn đã hoàn thành bài tập điền từ với tất cả đáp án đúng!',
                    1,
                );
            } else {
                message.info(`Tiến độ của bạn là: ${currentProgress}%`, 1);
            }

            setAnswersDisplay(
                lessonsCourse.fill_in_the_blank.map(
                    (item: FillInTheBlankData, index: number) => ({
                        sentence: item.sentence,
                        userAnswer: userAnswers[index],
                        isCorrect:
                            JSON.stringify(
                                item.correctAnswers
                                    .map((a) => a.toLowerCase())
                                    .sort(),
                            ) ===
                            JSON.stringify(
                                userAnswers[index]
                                    .map((a) => a.toLowerCase())
                                    .sort(),
                            ),
                    }),
                ),
            );
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error updating fill-in-the-blank progress:', error);
            message.error('Đã xảy ra lỗi khi cập nhật tiến độ!', 1);
        }
    };

    return (
        <div className="content-sale">
            <div className="p-10">
                {completed && <h3>Bạn đã hoàn thành bài tập này!</h3>}
                {lessonsCourse?.fill_in_the_blank.map(
                    (item: FillInTheBlankData, index: number) => (
                        <div className="mb-4" key={item._id}>
                            <Card key={item._id} title={`Câu hỏi ${index + 1}`}>
                                <p>{item.sentence}</p>
                                {item.correctAnswers.map((_, answerIndex) => (
                                    <Input
                                        key={answerIndex}
                                        placeholder={`Nhập đáp án ${index + 1}`}
                                        value={
                                            userAnswers[index]?.[answerIndex] ||
                                            ''
                                        }
                                        onChange={(e) =>
                                            handleAnswerChange(
                                                index,
                                                answerIndex,
                                                e.target.value,
                                            )
                                        }
                                        disabled={
                                            isSubmitted &&
                                            answersDisplay[index]?.isCorrect
                                        }
                                        style={{
                                            marginTop: answerIndex > 0 ? 8 : 0,
                                        }}
                                    />
                                ))}
                                {isSubmitted &&
                                    !answersDisplay[index]?.isCorrect && (
                                        <p style={{ color: 'red' }}>
                                            Đáp án của bạn sai, hãy chọn lại!
                                        </p>
                                    )}
                            </Card>
                        </div>
                    ),
                )}
                <div style={{ marginTop: 16 }}>
                    {/* <Button
                        className="menu-toggle-btn btn-primary font-semibold"
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                    >
                        {isSubmitted ? 'Đã nộp' : 'Nộp bài'}
                    </Button> */}
                    <ButtonPrimary
                        size={'large'}
                        label={isSubmitted ? 'Đã nộp' : 'Nộp bài'}
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        htmlType="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    />
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
