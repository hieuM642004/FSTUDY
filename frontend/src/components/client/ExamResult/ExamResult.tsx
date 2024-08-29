'use client';
import React, { useState, useEffect, memo } from 'react';
import { Table, Card } from 'antd';
import Link from 'next/link';
import ExamService from '@/services/ExamsService';

const ExamResults: React.FC<{ id?: string }> = ({ id }) => {
    
    const [result, setResult] = useState([]);
    
    useEffect(() => {
        const getResultExam = async () => {
            try {
                const data = await ExamService.getResultExamById(id);
               console.log(data);
               
                const formattedResults = data.map((item: any, index: number) => ({
                    key: index + 1,
                    id: item._id,
                    date: new Date(item.createdAt).toLocaleDateString(),
                    courses: item.examSessionId?.map((session: any) => session?.title).join(', ') || 'N/A',
                    results: `${item.correctAnswers.length}/${item.correctAnswers.length + item.incorrectAnswers.length + item.skippedAnswers.length}`,
                    time: item.completionTime ? `${item.completionTime}` : 'N/A',
                }));
                
                setResult(formattedResults);
            } catch (error) {
                console.log(error);
            }
        };
        getResultExam();
    }, [id]);

    const columns = [
        {
            title: 'Ngày làm',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Phần thi',
            dataIndex: 'courses',
            key: 'courses',
        },
        {
            title: 'Kết quả',
            dataIndex: 'results',
            key: 'results',
        },
        {
            title: 'Thời gian làm bài',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '',
            key: 'action',
            render: (text: any, record: any) => (
                <Link href={`/tests/result/${record.id}`}>Xem chi tiết</Link>
            ),
        },
    ];

    return (
        <div className="mb-4">
            <Table
                dataSource={result}
                columns={columns}
                pagination={false}
                bordered
            />
        </div>
    );
};

export default memo(ExamResults);
