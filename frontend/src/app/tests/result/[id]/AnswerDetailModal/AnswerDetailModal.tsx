import React from 'react';
import { Collapse, Modal } from 'antd';

const AnswerDetailModal = ({ question, isVisible, onCancel }: any) => {
    const isCorrectAnswer = (option: string) => {
        return question.questionId.correctAnswer.includes(option);
    };

    const isSelectedOption = (option: string) => {
        return question.selectedOptions.includes(option);
    };

    return (
        <Modal
            title={`Đáp án chi tiết #${question.questionId.order}`}
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <h3>{question.questionId.questionGroup?.passageText}</h3>
            <p>
                <strong className="bg-gray-200 p-1 rounded-md">
                    #{question?.questionId.questionType.replace(/-/g, ' ')}
                </strong>{' '}
            </p>
            <div className="my-2">
                {question.questionId.questionGroup?.audioUrl && (
                    <audio controls>
                        <source
                            src={question.questionId.questionGroup?.audioUrl}
                            type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                    </audio>
                )}

                {question.questionId.questionGroup?.imageUrl && (
                    <img
                        src={question.questionId.questionGroup?.imageUrl}
                        alt="Question Visual"
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            objectFit: 'contain',
                        }}
                    />
                )}

                {question.questionId.questionGroup?.passageText && (
                    <p>{question.questionId.questionGroup?.passageText}</p>
                )}
            </div>

            {question.questionId.questionGroup?.audioUrl && (
                <>
                    <p>
                        <strong>Transcript:</strong>
                    </p>
                    <Collapse
                        items={[
                            {
                                key: '1',
                                label: 'Transcript',
                                children: (
                                    <p>{question.questionId.description}</p>
                                ),
                            },
                        ]}
                    />
                </>
            )}

            <div className="mt-4">
                <strong>Đáp án đã chọn:</strong>
                {question.selectedOptions.map(
                    (option: string, index: number) => (
                        <div
                            key={index}
                            className={`${
                                isCorrectAnswer(option)
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                             {option}
                            {isCorrectAnswer(option) && <span> (Đúng)</span>}
                        </div>
                    ),
                )}
            </div>

            <div className="mt-4">
                <strong>Đáp án đúng:</strong>
                {question.questionId.correctAnswer.map(
                    (option: string, index: number) => (
                        <div key={index} className={`text-green-600`}>
                            {option}
                        </div>
                    ),
                )}
            </div>

            <Collapse
                className="mt-4"
                items={[
                    {
                        key: '1',
                        label: 'Giải thích',
                        children: <p>{question.questionId.explanation}</p>,
                    },
                ]}
            />
        </Modal>
    );
};

export default AnswerDetailModal;
