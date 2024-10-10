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
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }, []);

        const onChange = useCallback(
            (
                e:
                    | RadioChangeEvent
                    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                questionId: string,
            ) => {
                const value = e.target.value;
        
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
        
                    // Tìm câu hỏi hiện tại để lấy order
                    const currentQuestion = questionsGroup
                        .flatMap(group => group.questions)
                        .find(question => question._id === questionId);
        
                    const currentOrder = currentQuestion ? currentQuestion.order : null;
        
                    // Kiểm tra xem có mục nào cùng order trong updatedList không
                    const existingIndex = updatedList.findIndex(
                        (item) => item.order === currentOrder
                    );
        
                    if (currentOrder !== null) {
                        if (existingIndex >= 0) {
                            // Nếu đã tồn tại, cập nhật giá trị
                            updatedList[existingIndex] = {
                                order: currentOrder,
                                value,
                            };
                        } else {
                            // Nếu chưa tồn tại, thêm mới
                            updatedList.push({
                                order: currentOrder,
                                value,
                            });
                        }
                    }
        
                    return updatedList;
                });
            },
            [setLocalDataselection, dataselection, questionsGroup],
        );
        
        
        const renderInputField = useCallback(
            (question: Question) => {
                switch (question.questionType) {
                    case 'multiple-choice':
                        return (
                            <Radio.Group
                                className="ml-3"
                                onChange={(e) => onChange(e, question._id)}
                                id={`radio-group-${question.order}`}
                            >
                                <Space direction="vertical">
                                    {question.options?.map(
                                        (option: string, index: number) => (
                                            <Radio
                                                key={index}
                                                value={option} 
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
                                placeholder="Nhập đáp án"
                                className="ml-1"
                                onChange={(e) => onChange(e, question._id)} 
                            />
                        );
                    case 'short-answer':
                    default:
                        return (
                            <TextArea
                                rows={4}
                                placeholder="Nhập đáp án"
                                onChange={(e) => onChange(e, question._id)} 
                            />
                        );
                }
            },
            [onChange],
        );

        const renderedQuestionsGroup = useMemo(() => {
            return questionsGroup?.map((group: any) => (
                <div key={group._id} className={`mb-4 ${isEditable ? 'hover:border hover:border-blue-500 p-2' : ''}`}>
                    {isEditable ? (
                        <Tooltip title={'Chỉnh sửa câu hỏi'}>
                            <Link href={`/admin/exams/group-questions/edit/${group._id}`} passHref>
                                <div className="cursor-pointer">
                                    <div className="grid grid-cols-2 gap-2">
                                        {(group?.passageText ||
                                            group?.imageUrl) && (
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
                                            </div>
                                        )}
    
                                        {group?.questions.length > 0 && (
                                            <div>
                                                {group.questions.map((question: Question) => (
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
                            {(group?.passageText || group?.imageUrl) && (
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
                                </div>
                            )}

                            {group?.questions.length > 0 && (
                                <div>
                                    {group.questions.map((question: Question) => (
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
