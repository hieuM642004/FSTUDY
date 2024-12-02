'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from 'antd';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import ExamResults from '@/components/client/ExamResult/ExamResult';

function ListeningPage() {
    const stats = [
        { date: '01/07/2024', correct: 100 },
        { date: '07/07/2024', correct: 60 },
        { date: '14/07/2024', correct: 83.33 },
    ];
    return (
        <>
            <div className="pt-8">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5 pt-4">
                    <Card className="text-center">
                        <div className="text-gray-600 text-lg">
                            Số đề đã làm
                        </div>
                        <div className="text-xl font-bold">2</div>
                        <div className="text-gray-500 pt-2 text-xl">đề thi</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-gray-600 text-lg">
                            Độ chính xác (#đúng/#tổng)
                        </div>
                        <div className="text-xl font-bold">0.00%</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-gray-600 text-lg">
                            Thời gian trung bình
                        </div>
                        <div className="text-xl font-bold">0</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-gray-600 text-lg">
                            Điểm trung bình
                        </div>
                        <div className="text-xl font-bold">0.0/9.0</div>
                    </Card>
                    <Card className="text-center">
                        <div className="text-gray-600 text-lg">
                            Điểm cao nhất
                        </div>
                        <div className="text-xl font-bold">0/9.0</div>
                    </Card>
                </div>
                <div className="pt-8">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={stats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="correct"
                                stroke="#ff4d4f"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="pt-4 w-full">
                    <h2 className="text-xl font-semibold #35509a  mb-2">
                        Danh sách đề thi đã làm:
                    </h2>
                    <ExamResults />
                </div>
            </div>
        </>
    );
}

export default ListeningPage;
