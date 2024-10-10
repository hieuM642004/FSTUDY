'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import Target from '@/components/client/Target/Target';
import ExamService from '@/services/exams/ExamsService';
import AnswerDetailModal from './AnswerDetailModal/AnswerDetailModal';
import { renderAnswers } from './renderAnswers';
import {
    CheckCircleFilled,
    CheckOutlined,
    ClockCircleOutlined,
    CloseCircleFilled,
    LineChartOutlined,
    MinusCircleFilled,
} from '@ant-design/icons';
import WritingResultDetail from './WritingResultDetail/WritingResultDetail';

function Result({ id }: { id: string }) {
    const [result, setResult] = useState<any>(null);
    const [resultDetail, setResultDetail] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

    useEffect(() => {
        const getResultExam = async () => {
            try {
                const response = await ExamService.getResultById(id);

                setResult(response);
            } catch (error) {
                console.log(error);
            }
        };
        getResultExam();
    }, [id]);

    useEffect(() => {
        const getResultExam = async () => {
            try {
                const response = await ExamService.getResultByGroupQuestions(
                    id,
                );
                console.log(response);
                setResultDetail(response);
            } catch (error) {
                console.log(error);
            }
        };
        getResultExam();
    }, [id]);

    const showModal = (question: any) => {
        setSelectedQuestion(question);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedQuestion(null);
    };

    if (!result) {
        return (
            <div className="flex justify-center p-60">
                <Spin></Spin>
            </div>
        );
    }

    const totalQuestions =
        result?.correctAnswers.length +
        result?.incorrectAnswers.length +
        result?.skippedAnswers.length;
    const accuracy = totalQuestions
        ? ((result?.correctAnswers.length / totalQuestions) * 100).toFixed(2)
        : '0.00';
    const completionTime = result.completionTime || 'N/A';

    return (
        <>
            <div className="p-10 shadow-md m-10 h-auto">
                <h2 className="font-bold text-2xl text-balance">
                    Kết quả luyện tập:{' '}
                    {result?.examSessionId[0]?.idExam?.title || 'IELTS'}
                </h2>
                <p className="italic text-gray-400 mb-2">
                    Ngày làm: {new Date(result?.createdAt).toLocaleDateString()}
                </p>
                <Row gutter={[16, 16]}>
                    {result.type === 'writing' ? (
                        <WritingResultDetail
                            completionTime={result.completionTime}
                            resultDetail={resultDetail}
                        />
                    ) : (
                        <>
                            <Col xs={24} sm={24} md={16} lg={18} xl={19}>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col xs={24} sm={12} md={6}>
                                        <div className="flex flex-col space-y-4 p-4 bg-[#e8f2ff] shadow-md rounded-md">
                                            <div className="flex items-center space-x-2">
                                                <CheckOutlined className="text-xl text-black" />
                                                <div className="flex flex-col">
                                                    <p>Kết quả làm bài</p>
                                                    <p className="text-black font-bold">
                                                        {
                                                            result
                                                                ?.correctAnswers
                                                                .length
                                                        }
                                                        /{totalQuestions}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <LineChartOutlined className="text-xl text-black" />
                                                <div className="flex flex-col">
                                                    <p>Độ chính xác</p>
                                                    <p className="text-black font-bold">
                                                        {accuracy}%
                                                    </p>
                                                    <p className="text-xs">
                                                        (#đúng/#tổng)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <ClockCircleOutlined className="text-xl text-black" />
                                                <div className="flex flex-col">
                                                    <p>Thời gian hoàn thành</p>
                                                    <p className="text-black font-bold">
                                                        {completionTime}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                        <div className="flex justify-center items-center flex-col shadow-md min-h-56 rounded-md">
                                            <CheckCircleFilled
                                                className="text-2xl"
                                                style={{ color: 'green' }}
                                            />
                                            <p className="text-green-500">
                                                Trả lời đúng
                                            </p>
                                            <p className="font-bold text-2xl">
                                                {result?.correctAnswers.length}
                                            </p>
                                            <p>câu hỏi</p>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                        <div className="flex justify-center items-center flex-col shadow-md min-h-56 rounded-md">
                                            <CloseCircleFilled
                                                className="text-2xl"
                                                style={{ color: 'red' }}
                                            />
                                            <p className="text-red-500">
                                                Trả lời sai
                                            </p>
                                            <p className="font-bold text-2xl">
                                                {
                                                    result?.incorrectAnswers
                                                        .length
                                                }
                                            </p>
                                            <p>câu hỏi</p>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                        <div className="flex justify-center items-center flex-col shadow-md min-h-56 rounded-md">
                                            <MinusCircleFilled
                                                className="text-2xl"
                                                style={{ color: 'gray' }}
                                            />
                                            <p className="text-gray-500">
                                                Bỏ qua
                                            </p>
                                            <p className="font-bold text-2xl">
                                                {result?.skippedAnswers.length}
                                            </p>
                                            <p>câu hỏi</p>
                                        </div>
                                    </Col>
                                </Row>
                                <h2 className="font-bold text-xl">
                                    Đáp án chi tiết
                                </h2>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12}>
                                        {resultDetail?.examSessions
                                            .slice(
                                                0,
                                                Math.ceil(
                                                    resultDetail.examSessions
                                                        .length / 2,
                                                ),
                                            )
                                            .map((session, sessionIndex) => (
                                                <div key={session.sessionId}>
                                                    <h2 className="font-semibold text-lg">{`Recording ${
                                                        sessionIndex + 1
                                                    }`}</h2>
                                                    {renderAnswers(
                                                        session.correctAnswers,
                                                        'correct',
                                                        showModal,
                                                    )}
                                                    {renderAnswers(
                                                        session.incorrectAnswers,
                                                        'incorrect',
                                                        showModal,
                                                    )}
                                                    {renderAnswers(
                                                        session.skippedAnswers,
                                                        'skipped',
                                                        showModal,
                                                    )}
                                                </div>
                                            ))}
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        {resultDetail?.examSessions
                                            .slice(
                                                Math.ceil(
                                                    resultDetail.examSessions
                                                        .length / 2,
                                                ),
                                            )
                                            .map((session, sessionIndex) => (
                                                <div key={session.sessionId}>
                                                    <h2 className="font-semibold text-lg">{`Recording ${
                                                        sessionIndex +
                                                        1 +
                                                        Math.ceil(
                                                            resultDetail
                                                                .examSessions
                                                                .length / 2,
                                                        )
                                                    }`}</h2>
                                                    {renderAnswers(
                                                        session.correctAnswers,
                                                        'correct',
                                                        showModal,
                                                    )}
                                                    {renderAnswers(
                                                        session.incorrectAnswers,
                                                        'incorrect',
                                                        showModal,
                                                    )}
                                                    {renderAnswers(
                                                        session.skippedAnswers,
                                                        'skipped',
                                                        showModal,
                                                    )}
                                                </div>
                                            ))}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={6} xl={5}>
                                <Target />
                            </Col>
                        </>
                    )}
                </Row>
            </div>

            {selectedQuestion && (
                <AnswerDetailModal
                    question={selectedQuestion}
                    isVisible={isModalVisible}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
}

export default Result;
