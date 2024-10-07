'use client';
import React, { useState, useEffect, memo } from 'react';
import { Table, Card } from 'antd';
import Link from 'next/link';
import ExamService from '@/services/exams/ExamsService';
import { useAuth } from '@/hooks/useAuth';

const ExamResults: React.FC<{ id?: string }> = ({ id }) => {
    
    const [result, setResult] = useState([]);
    const {isLoggedIn,userId}=useAuth();
    useEffect(() => {
        const getResultExam = async () => {
            try {
                const data = await ExamService.getResultExamById(id);
                const userResults = data.filter((item: any) => item?.idUser?._id === userId);

                const formattedResults = userResults.map((item: any, index: number) => ({
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
        <>
            {
                isLoggedIn && (
                  <div className="mb-4">
                <Table
                    dataSource={result}
                    columns={columns}
                    pagination={false}
                    bordered
                />
            </div>  
                )
            }
        </>
        
    );
};

export default memo(ExamResults);
