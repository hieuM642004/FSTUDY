'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Tab from '@/components/client/Tabs/Tabs';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import Recording from './Recording/Recording';
import RecordingList from './RecordingList/RecordingList';
import ExamService from '@/services/ExamsService';
import ConfirmExit from './ConfirmExit/ConfirmExit';
import CountDownWithSubmit from './CountDownWithSubmit/CountDownWithSubmit';

const TakeTheTest: React.FC = () => {
    const [dataselection, setDataselection] = useState<any>({});
    const [items, setItems] = useState<any[]>([]);
    const [recording, setRecording] = useState<{
        [sessionId: string]: number[];
    }>({});
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [activeQuestions, setActiveQuestions] = useState<number[]>([]);
    const [activeKey, setActiveKey] = useState<string>('1');
    const searchParams = useSearchParams();
    const [parts, setParts] = useState<string[]>([]);
    const exam = searchParams.get('exam');
    const timeLimit = Number(searchParams.get('time')) || 0;
    const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const partsFromParams = searchParams.getAll('part');
        setParts(partsFromParams);
    }, [searchParams]);

    useEffect(() => {
        const savedQuestions = localStorage.getItem('activeQuestions');
        if (savedQuestions) {
            setActiveQuestions(JSON.parse(savedQuestions));
        } else {
            setActiveQuestions([]);
        }

        const handleBeforeUnload = () => {
            localStorage.removeItem('activeQuestions');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleDataselection = (data: any) => {
        setDataselection((prev: any) => ({
            ...prev,
            [activeKey]: {
                ...prev[activeKey],
                ...data,
            },
        }));

        const selectedKeys = Object.keys(data).map(Number);
        setActiveQuestions((prev) => {
            const updatedActiveQuestions = Array.from(
                new Set([...(prev || []), ...selectedKeys]),
            );
            saveToLocalStorage(updatedActiveQuestions);
            return updatedActiveQuestions;
        });
    };

    const handleQuestionClick = (sessionId: string, order: number) => {
        setActiveQuestions((prev) => {
            const newActiveQuestions = prev.includes(order)
                ? prev
                : [...prev, order];

            saveToLocalStorage(newActiveQuestions);
            return newActiveQuestions;
        });

        const questionRef = questionRefs.current[`${sessionId}-${order}`];
        if (questionRef) {
            questionRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const onChangeTab = (key: string) => {
        setActiveKey(key);
        setIsNextDisabled(key === items[items.length - 1]?.key);
    };

    const saveToLocalStorage = (questions: number[]) => {
        const existingQuestions = localStorage.getItem('activeQuestions');
        const existingArray = existingQuestions
            ? JSON.parse(existingQuestions)
            : [];
        const updatedArray = Array.from(
            new Set([...existingArray, ...questions]),
        );
        localStorage.setItem('activeQuestions', JSON.stringify(updatedArray));
    };

    useEffect(() => {
        fetchQuestions();
    }, [parts]);

    const fetchQuestions = async () => {
        try {
            const response = await ExamService.getQuestionsBySessionIds(parts);
            const questions = response?.data || [];
            if (Array.isArray(questions)) {
                const groupedQuestions = groupQuestionsBySession(questions);
                setRecording(createOrdersFromGroups(groupedQuestions));
                const items = createItemsFromGroups(groupedQuestions);
                setItems(items);
                setIsNextDisabled(items.length === 1);
            } else {
                console.error(
                    'Expected an array in data property, but got:',
                    questions,
                );
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const groupQuestionsBySession = (questions: any[]) => {
        return questions.reduce(
            (acc: { [sessionId: string]: any[] }, question: any) => {
                const { examSession, order, ...rest } = question;
                if (!acc[examSession]) {
                    acc[examSession] = [];
                }
                acc[examSession].push({ ...rest, order });
                acc[examSession].sort(
                    (a, b) => (a.order || 0) - (b.order || 0),
                );
                return acc;
            },
            {},
        );
    };
    const [d, setD] = useState({});
    const createItemsFromGroups = (groups: { [sessionId: string]: any[] }) => {
        setD(groups);
        return Object.entries(groups).map(([sessionId, questions], index) => ({
            key: `${index + 1}`,
            label: `Recording ${index + 1}`,
            children: (
                <Recording
                    questionsGroup={questions}
                    sessionId={sessionId}
                    dataselection={handleDataselection}
                    activeQuestions={activeQuestions}
                    onQuestionClick={handleQuestionClick}
                    questionRefs={questionRefs}
                />
            ),
        }));
    };

    const createOrdersFromGroups = (groups: {
        [sessionId: string]: any[];
    }): { [sessionId: string]: number[] } => {
        const ordersBySession: { [sessionId: string]: number[] } = {};
        Object.entries(groups).forEach(([sessionId, sessions]) => {
            const orders: number[] = [];
            sessions.forEach((session) => {
                session.questions.forEach((question: any) => {
                    orders.push(question.order);
                });
            });
            ordersBySession[sessionId] = orders;
        });
        return ordersBySession;
    };
    const handleNext = () => {
        const currentIndex = items.findIndex((item) => item.key === activeKey);
        if (currentIndex !== -1 && currentIndex < items.length - 1) {
            const nextKey = items[currentIndex + 1].key;
            setActiveKey(nextKey);
            setIsNextDisabled(currentIndex + 1 === items.length - 1);
        }
    };
    const handleTimeup = () => {
        // alert('Time is up!');
    };

    return (
        <div className="pt-8">
            <div className="mb-2 flex items-center justify-center">
                <h4 className="font-bold text-2xl">
                    {exam?.replace(/-/g, ' ')}
                </h4>

                {/* <ConfirmExit />  */}
            </div>
            <Row>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                    <WapperItemCard stylecss="lg:w-full min-h-[700px]">
                        <Tab
                            items={items}
                            activeKey={activeKey}
                            onChange={onChangeTab}
                        />
                        <div className="flex items-end justify-end">
                            <button
                                onClick={handleNext}
                                className={`mt-20   text-[#35509a] text-xl ${
                                    isNextDisabled
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                disabled={isNextDisabled}
                            >
                                Tiếp theo <RightOutlined />
                            </button>
                        </div>
                    </WapperItemCard>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={4}>
                    <div
                        className="bg-white rounded-lg p-4 shadow-lg border-2 
                        mb-10 md:w-[16%] ml-3 md:fixed block min-h-[500px] bottom-0 top-[126px] right-2"
                    >
                        <div className="flex justify-center flex-col items-center text-lg mb-2">
                            <div className=" text-center font-bold">
                                Thời gian làm bài
                            </div>
                            <CountDownWithSubmit
                                timeStart={timeLimit === 0 ? 0 : timeLimit * 60}
                                onTimeup={handleTimeup}
                                isIncremental={timeLimit === 0}
                                listAnswer={d}
                            />
                        </div>
                        <RecordingList
                            key={activeKey}
                            list={recording}
                            activeQuestions={activeQuestions}
                            onQuestionClick={handleQuestionClick}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TakeTheTest;
