'use client';
import React from 'react';
import { Table, Card } from 'antd';
import Link from 'next/link';

const ExamResults: React.FC = () => {
    const listCoursesResults = [
        {
            key: 1,
            courses: 'IELTS Simulation Listening test 10',
            date: '17/07/2024',
            results: '10/10',
            time: '0:05',
            type: 'Luyen tap',
        },
        {
            key: 2,
            courses: 'IELTS Simulation Listening test 10',
            date: '17/07/2024',
            results: '10/10',
            time: '0:05',
            type: 'Luyen tap',
        },
        {
            key: 3,
            courses: 'IELTS Simulation Listening test 10',
            date: '17/07/2024',
            results: '10/10',
            time: '0:05',
            type: 'Luyen tap',
        },
        {
            key: 4,
            courses: 'IELTS Simulation Listening test 10',
            date: '17/07/2024',
            results: '10/10',
            time: '0:05',
            type: 'Luyen tap',
        },
    ];

    const columns = [
        {
            title: 'Ngày làm',
            dataIndex: 'date',
            key: 'date',
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
                <Link href="#">Xem chi tiết</Link>
            ),
        },
    ];

    return (
        <div className="pt-5 pb-2">
            {listCoursesResults.map((result) => (
                <Card key={result.key} className="mb-4">
                    <h3 className="text-3xl md:text-2xl sm:text-xl font-bold mt-2">
                        {result.courses}
                    </h3>
                    <Table
                        dataSource={[result]}
                        columns={columns}
                        pagination={false}
                        bordered
                    />
                </Card>
            ))}
        </div>
    );
};

export default ExamResults;
