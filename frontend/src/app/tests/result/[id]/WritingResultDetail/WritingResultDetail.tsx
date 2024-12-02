'use client';
import './WritingResultDetail.scss';

import React, { useState } from 'react';
import { Row, Col, Skeleton, message } from 'antd';
import { pythonApiInstance } from '@/constant/api';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

interface WritingResultDetailProps {
    completionTime: string;
    resultDetail: any;
}

const WritingResultDetail: React.FC<WritingResultDetailProps> = ({
    completionTime,
    resultDetail,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');

    const handleEvaluateWithAI = async (
        examText: string,
        userAnswer: string,
        imageUrl: string,
    ) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('exam_text', examText);
            formData.append('user_answer', userAnswer);
            formData.append('exam_image_url', imageUrl);

            const response = await pythonApiInstance.post(
                '/process_exam',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            setResult(response.data.result);
        } catch (error) {
            message.error('Đã xảy ra lỗi khi chấm điểm với AI.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addArrowBetweenHighlights = (text: any) => {
        return text.replace(/<\/span><span/g, '</span> ---> <span');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <Col xs={24}>
            <div className="printContent">
                <p className="text-red-600 font-normal italic">
                    *Đây là đề Ielts writing bạn có sử dụng tính năng chấm điểm
                    với AI
                </p>
                <p className="text-gray-500 mb-4">
                    Thời gian hoàn thành: {completionTime || 'N/A'}
                </p>
                <Row gutter={[16, 16]}>
                    {resultDetail?.examSessions.map((session: any) => (
                        <Col key={session.sessionId} xs={24}>
                            <h3 className="font-semibold text-lg">
                                {session.sessionTitle}
                            </h3>
                            {session.incorrectAnswers.map((answer: any) => (
                                <div
                                    key={answer._id}
                                    className="mb-4 p-4 border rounded-md shadow-sm"
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col
                                            xs={24}
                                            md={12}
                                            className="bg-gray-100 p-2 rounded-md"
                                        >
                                            <div className="mb-2">
                                                <strong>Đề thi:</strong>
                                                <p className="text-gray-700 font-bold">
                                                    {
                                                        answer.questionId
                                                            .questionGroup
                                                            .passageText
                                                    }
                                                </p>
                                            </div>
                                            {answer.questionId.questionGroup
                                                .imageUrl && (
                                                <div className="mb-2">
                                                    <img
                                                        src={
                                                            answer.questionId
                                                                .questionGroup
                                                                .imageUrl
                                                        }
                                                        alt="Writing Task"
                                                        className="max-w-full h-auto mt-2"
                                                    />
                                                </div>
                                            )}
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <div className="mb-2">
                                                <strong>
                                                    Câu trả lời của bạn:
                                                </strong>
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            answer.selectedOptions.join(
                                                                ', ',
                                                            ) || 'N/A',
                                                    }}
                                                />
                                            </div>
                                            {!result && (
                                                <ButtonPrimary
                                                    label="Chấm điểm với AI"
                                                    onClick={() =>
                                                        handleEvaluateWithAI(
                                                            answer.questionId
                                                                .questionGroup
                                                                .passageText,
                                                            answer.selectedOptions.join(
                                                                ', ',
                                                            ),
                                                            answer.questionId
                                                                .questionGroup
                                                                .imageUrl,
                                                        )
                                                    }
                                                    loading={loading}
                                                    disabled={loading}
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                    {loading && (
                                        <div className="mt-2">
                                            <Skeleton active />
                                        </div>
                                    )}
                                    {result && (
                                        <div
                                            className="mt-4 p-4 border rounded-md bg-gray-50"
                                            dangerouslySetInnerHTML={{
                                                __html: addArrowBetweenHighlights(
                                                    result.replace(
                                                        /\n/g,
                                                        '<br />',
                                                    ),
                                                ),
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </Col>
                    ))}
                </Row>
            </div>
            <ButtonPrimary
                label="In PDF"
                onClick={handlePrint}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md no-print"
            />
        </Col>
    );
};

export default WritingResultDetail;
