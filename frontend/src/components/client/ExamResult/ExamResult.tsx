'use client';
import React, { useState, useEffect, memo } from 'react';
import { Table, Card } from 'antd';
import Link from 'next/link';
import ExamService from '@/services/exams/ExamsService';
import { useAuth } from '@/hooks/useAuth';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RootState } from '@/lib/redux/store';

const ExamResults: React.FC<{ id?: string }> = ({ id }) => {
    const [result, setResult] = useState([]);
    const { isLoggedIn } = useAuth();
    const dataUser = useTypedSelector((state: RootState) => state.user);

    useEffect(() => {
        const getResultExam = async () => {
            try {
                let data;
                if (id) {
                  
                    data = await ExamService.getResultUserAndExamById(id, dataUser.id);
                } else {
                  
                    data = await ExamService.getResultUserById(dataUser.id);
                }
                
                // Mapping data to match table structure
                const formattedData = data.map((item: any) => ({
                    key: item._id,
                    date: new Date(item.createdAt).toLocaleDateString(),
                    examSessionId: item.examSessionId[0]?.title || 'N/A',
                    idExam: item.examSessionId[0]?.idExam._id || '',
                    results: `${item.accuracy}%`,
                    completionTime: item.completionTime,
                    id: item._id
                }));
                setResult(formattedData);
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
            dataIndex: 'examSessionId',
            key: 'examSessionId',
            render: (text: any, record: any) => (
                <Link href={`/tests/${record.idExam}`}>{text}</Link>
            ),
        },
        {
            title: 'Kết quả',
            dataIndex: 'results',
            key: 'results',
        },
        {
            title: 'Thời gian làm bài',
            dataIndex: 'completionTime',
            key: 'completionTime',
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
                            scroll={{ y: 300 }}
                        />
                    </div>
                )
            }
        </>
    );
};

export default memo(ExamResults);
