'use client';

import { useState, useEffect, useRef, memo } from 'react';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ConfirmModal from '@/components/shared/ModalComfirm/ModalComfirm';
import ExamService from '@/services/exams/ExamsService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RootState } from '@/lib/redux/store';

const CountDownWithSubmit = ({
    timeStart,
    onTimeup,
    isIncremental,
    listAnswer,
}: any) => {
    const [count, setCount] = useState(timeStart);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef(Date.now());
    const pausedTimeRef = useRef<number | null>(null);
    const elapsedTimeRef = useRef<number>(0);
    const router = useRouter();
    const dataUser = useTypedSelector((state: RootState) => state.user);
    const updateCount = () => {
        setCount(() => {
            const elapsedTime = Math.floor(
                (Date.now() - startTimeRef.current) / 1000,
            );

            if (isIncremental) {
                return elapsedTimeRef.current + elapsedTime;
            } else {
                const remainingTime =
                    timeStart - elapsedTime - elapsedTimeRef.current;
                if (remainingTime <= 0) {
                    onTimeup();
                    return 0;
                }
                return remainingTime;
            }
        });

        requestRef.current = requestAnimationFrame(updateCount);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateCount);

        return () => cancelAnimationFrame(requestRef.current as number);
    }, [onTimeup, timeStart, isIncremental]);

    const pauseTimer = () => {
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
            pausedTimeRef.current = count;

            elapsedTimeRef.current = isIncremental
                ? pausedTimeRef.current
                : timeStart - pausedTimeRef.current;
        }
    };

    const resumeTimer = () => {
        if (pausedTimeRef.current !== null) {
            startTimeRef.current = Date.now();
        }
        requestRef.current = requestAnimationFrame(updateCount);
    };

    const handleShowModal = () => {
        pauseTimer();
        setIsModalVisible(true);
    };

    const handleConfirm = () => {
        handleSubmitExam();
        setIsModalVisible(false);
    };

    const handleSubmitExam = async () => {
        const answers = await filterListAnswer();
        const data = {
            examSessionId: answers.session,
            correctAnswers: answers.correctAnswers,
            incorrectAnswers: answers.incorrectAnswers,
            skippedAnswers: answers.skippedAnswers,
            completionTime: answers.pausedTimeFormatted,
            type: answers.type,
            idUser: dataUser.id,
        };

        const result = await ExamService.submitExam(data);
        if (result) {
            localStorage.removeItem('activeQuestions');
            localStorage.removeItem('answerList')
            router.push(`/tests/result/${result._id}`);
        }
    };

    const filterListAnswer = async () => {
        const pausedTimeFormatted = toMMSS(pausedTimeRef.current || 0);
        const userAnswers = JSON.parse(localStorage.getItem('answerList') || '[]');
        const answerList = listAnswer;
    
        const correctAnswers: any[] = [];
        const incorrectAnswers: any[] = [];
        const skippedAnswers: any[] = [];
        let session: string[] = [];
    let type=''
        Object.keys(answerList).forEach((sessionId) => {
            session.push(sessionId);
            answerList[sessionId].forEach((item: any) => {
                item.questions.forEach((question: any) => {
                    const userAnswer = userAnswers.find(
                        (ans: any) => ans.order === question.order
                    );
    
                    if (userAnswer) {
                        let isCorrect = false;
                        let selectedOptions: string[] = [];

                        if (question.questionType === 'multiple-choice') {
                           
                            const selectedIndex = question.options.indexOf(userAnswer.value);
                            selectedOptions = [userAnswer.value]; 
    
                          
                            if (selectedIndex !== -1 && question.correctAnswer === userAnswer.value) {
                                isCorrect = true;
                            }
                        } 
                       
                        else if (question.questionType === 'fill-in-the-blank') {
                            selectedOptions = [userAnswer.value];
                            isCorrect = Array.isArray(question.correctAnswer)
                                ? question.correctAnswer.some((correct: any) =>
                                    correct.trim().toLowerCase() ===
                                    userAnswer.value.trim().toLowerCase()
                                )
                                : question.correctAnswer.trim().toLowerCase() ===
                                userAnswer.value.trim().toLowerCase();
                        }
                        
                        else if (question.questionType === 'short-answer') {
                            selectedOptions = [userAnswer.value];
                            isCorrect = question.correctAnswer.trim().toLowerCase() ===
                                userAnswer.value.trim().toLowerCase();
                                type = 'writing';
                        }
    
                        const answer = {
                            questionId: question._id,
                            selectedOptions,
                            isCorrect,
                        };
    
                        if (isCorrect) {
                            correctAnswers.push(answer);
                        } else {
                            incorrectAnswers.push(answer);
                        }
                    } else {
                       
                        const skippedAnswer = {
                            questionId: question._id,
                            selectedOptions: [],
                            isCorrect: false,
                        };
                        skippedAnswers.push(skippedAnswer);
                    }
                });
            });
        });
    
        return {
            session,
            pausedTimeFormatted,
            correctAnswers,
            incorrectAnswers,
            skippedAnswers,
            type
        };
    };
    
    
    const handleCancel = () => {
        setIsModalVisible(false);
        resumeTimer();
    };

    const toMMSS = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return [minutes, seconds].map((v) => (v < 10 ? '0' + v : v)).join(':');
    };

    return (
        <>
            <div
                className={`font-bold ${
                    count <= 5 ? 'text-red-600' : 'text-black'
                }`}
            >
                {toMMSS(count)}
            </div>
            <ButtonPrimary
                label="Nộp bài"
                className="mt-2"
                size="large"
                onClick={handleShowModal}
            />
            <ConfirmModal
                message="Bạn có chắc chắn muốn nộp bài?"
                visible={isModalVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                okText="Có"
                cancelText="Không"
            />
        </>
    );
};

export default memo(CountDownWithSubmit);
