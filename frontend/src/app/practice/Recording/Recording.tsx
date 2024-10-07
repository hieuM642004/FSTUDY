'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, Radio, Space, Row, Col, Tooltip } from 'antd';
import type { RadioChangeEvent } from 'antd';
import Link from 'next/link';

import { RecordingProps, Question } from '@/types/Exams';

interface ExtendedRecordingProps extends RecordingProps {
    isEditable?: boolean; 
}

const Recording: React.FC<ExtendedRecordingProps> = React.memo(
    ({ questionsGroup, dataselection, activeQuestions, isEditable = false }) => {
        const { TextArea } = Input;

        const [localDataselection, setLocalDataselection] = useState<
            Record<string, string | number | null>
        >({});
        const [answerList, setAnswerList] = useState<
            Array<{ order: number; value: string | number | null }>
        >(() => JSON.parse(localStorage.getItem('answerList') || '[]'));

        useEffect(() => {
            localStorage.setItem('answerList', JSON.stringify(answerList));
        }, [answerList]);

        useEffect(() => {
            const handleBeforeUnload = () => {
                localStorage.removeItem('answerList');
            };
            window.addEventListener('beforeunload', handleBeforeUnload);
        }, []);

        const onChange = useCallback(
            (
                e:
                    | RadioChangeEvent
                    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                questionId: string,
            ) => {
                const value = e.target.value;

                const safeActiveQuestions: number[] = Array.isArray(activeQuestions)
                    ? activeQuestions
                    : [];

                if (!safeActiveQuestions.includes(Number(questionId))) {
                    setLocalDataselection((prev) => {
                        const updatedSelection = {
                            ...prev,
                            [questionId]: value as string | number | null,
                        };

                        dataselection(updatedSelection);

                        return updatedSelection;
                    });

                    setAnswerList((prev) => {
                        const updatedList = [...prev];
                        const existingIndex = updatedList.findIndex(
                            (item) => item.order === Number(questionId),
                        );

                        if (existingIndex >= 0) {
                            updatedList[existingIndex] = {
                                order: Number(questionId),
                                value,
                            };
                        } else {
                            updatedList.push({
                                order: Number(questionId),
                                value,
                            });
                        }

                        return updatedList;
                    });
                }
            },
            [setLocalDataselection, dataselection, activeQuestions],
        );

        const renderInputField = useCallback(
            (question: Question) => {
                switch (question.questionType) {
                    case 'multiple-choice':
                        return (
                            <Radio.Group
                                className="ml-3"
                                onChange={(e) => onChange(e, question.order)}
                                id={`radio-group-${question.order}`}
                            >
                                <Space direction="vertical">
                                    {question.options?.map(
                                        (option: string, index: number) => (
                                            <Radio
                                                key={index}
                                                value={index + 1}
                                            >
                                                {option}
                                            </Radio>
                                        ),
                                    )}
                                </Space>
                            </Radio.Group>
                        );
                    case 'fill-in-the-blank':
                        return (
                            <Input
                                placeholder="Type your answer here"
                                className="ml-1"
                                onChange={(e) => onChange(e, question.order)}
                            />
                        );
                    case 'short-answer':
                    default:
                        return (
                            <TextArea
                                rows={4}
                                placeholder="Add additional comments here"
                                onChange={(e) => onChange(e, question.order)}
                            />
                        );
                }
            },
            [onChange],
        );

        const renderedQuestionsGroup = useMemo(() => {
            return questionsGroup?.map((group: any) => (
                <div key={group.sessionId} className={`mb-4 ${isEditable ? 'hover:border hover:border-blue-500 p-2' : ''}`}>
                    {isEditable ? (
                    <Tooltip title={'Chỉnh sửa câu hỏi'}>
                            <Link href={`/admin/exams/group-questions/edit/${group._id}`} passHref>
                                <div className="cursor-pointer">
                                    <div className="grid grid-cols-2 gap-2">
                                        {(group?.passageText ||
                                            group?.imageUrl ||
                                            group?.audioUrl) && (
                                            <div>
                                                {group?.imageUrl && (
                                                    <img
                                                        src={group.imageUrl}
                                                        alt="question"
                                                        className="w-full h-auto border-zinc-950 mt-2 object-cover"
                                                    />
                                                )}
                                                {group?.passageText && (
                                                    <p className="font-bold">
                                                        {group.passageText}
                                                    </p>
                                                )}
                                                {group?.questions.length === 1 &&
                                                    group?.audioUrl && (
                                                        <audio
                                                            src={group?.audioUrl}
                                                            controls
                                                            className="w-full mt-2"
                                                        />
                                                    )}
                                            </div>
                                        )}
    
                                        {group?.questions.length > 1 && (
                                            <div>
                                                {group?.questions.map((question: Question) => (
                                                    <div key={question._id} className="mb-4">
                                                        <div className="flex items-center">
                                                            <button className="rounded-full bg-[#e8f2ff] p-1 text-[#35509a] text-xl font-semibold w-10 h-10 flex items-center justify-center">
                                                                {question.order}
                                                            </button>
                                                            {renderInputField(question)}
                                                            {question.audioUrl && (
                                                                <audio
                                                                    src={question.audioUrl}
                                                                    controls
                                                                    className="ml-4 w-full"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                    </Tooltip>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            {(group?.passageText ||
                                group?.imageUrl ||
                                group?.audioUrl) && (
                                <div>
                                    {group?.imageUrl && (
                                        <img
                                            src={group.imageUrl}
                                            alt="question"
                                            className="w-full h-auto border-zinc-950 mt-2 object-cover"
                                        />
                                    )}
                                    {group?.passageText && (
                                        <p className="font-bold">
                                            {group.passageText}
                                        </p>
                                    )}
                                    {group?.questions.length === 1 &&
                                        group?.audioUrl && (
                                            <audio
                                                src={group?.audioUrl}
                                                controls
                                                className="w-full mt-2"
                                            />
                                        )}
                                </div>
                            )}

                            {group?.questions.length > 1 && (
                                <div>
                                    {group?.questions.map((question: Question) => (
                                        <div key={question._id} className="mb-4">
                                            <div className="flex items-center">
                                                <button className="rounded-full bg-[#e8f2ff] p-1 text-[#35509a] text-xl font-semibold w-10 h-10 flex items-center justify-center">
                                                    {question.order}
                                                </button>
                                                {renderInputField(question)}
                                                {question.audioUrl && (
                                                    <audio
                                                        src={question.audioUrl}
                                                        controls
                                                        className="ml-4 w-full"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ));
        }, [questionsGroup, renderInputField, isEditable]);

        return <>{renderedQuestionsGroup}</>;
    },
);

export default Recording;
