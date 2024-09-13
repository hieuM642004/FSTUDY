'use client';
import React from 'react';

import './RecordingList.scss';

type RecordingListProps = {
    list: { [sessionId: string]: number[] };
    activeQuestions: number[];
    onQuestionClick: (sessionId: string, order: number) => void;
};

const RecordingList: React.FC<RecordingListProps> = ({
    list,
    activeQuestions,
    onQuestionClick,
}) => {
    return (
        <div className="w-full md:max-h-80 overflow-auto custom-scrollbar">
            {Object.entries(list).map(([sessionId, orders], sectionIndex) => (
                <div className="mb-1" key={sectionIndex}>
                    <p className="font-bold mb-2 text-sm">
                        Recording {sectionIndex + 1}
                    </p>
                    <div className="flex flex-wrap">
                        {orders.map((order) => (
                            <div
                                key={order}
                                className={`mr-1 mb-1 border-black font-normal border rounded-sm inline-block py-1 px-2 hover:cursor-pointer hover:text-white hover:bg-[#35509a] ${
                                    activeQuestions.includes(order)
                                        ? 'bg-[#35509a] text-white border-[#35509a]'
                                        : ''
                                }`}
                                onClick={() =>
                                    onQuestionClick(sessionId, order)
                                }
                            >
                                {order}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecordingList;
