import React from 'react';
import { Button } from 'antd';

export const renderAnswers = (answers: any, type: any, showModal: any) => {
    return answers.map((answer: any, index: any) => (
        <div key={answer._id} className="flex items-center mb-2">
            <div className="rounded-full bg-[#e8f2ff] p-2 text-[#35509a] text-xl font-semibold w-10 h-10 flex items-center justify-center">
                {answer.questionId.order}
            </div>
            <div className="ml-2">
                <div className="font-semibold">
                    {answer.questionId.questionType === 'multiple-choice'
                        ? answer.selectedOptions[0] || 'Chưa chọn'
                        : 'Fill-in-the-blank'}
                    :
                    {type === 'correct' && (
                        <span className="text-green-600"> Đúng </span>
                    )}
                    {type === 'incorrect' && (
                        <span className="text-red-600"> Sai </span>
                    )}
                    {type === 'skipped' && (
                        <span className="text-gray-500"> Chưa trả lời </span>
                    )}
                </div>
                <Button type="link" onClick={() => showModal(answer)}>
                    [Chi tiết]
                </Button>
            </div>
        </div>
    ));
};
