'use client';
import React from 'react';
import { Table, Card } from 'antd';
import Link from 'next/link';

const ExamResults: React.FC = () => {
    const listCoursesResults = [
        {
            key: 1,
            date: '17/07/2024',
            courses: 'IELTS Simulation Listening test 10',
            results: '10/10',
            time: '0:05',
        },
        {
            key: 2,
            date: '17/07/2024',
            courses: 'IELTS Simulation Listening test 10',
            results: '10/10',
            time: '0:05',
        },
        {
            key: 3,
            date: '17/07/2024',
            courses: 'IELTS Simulation Listening test 10',
            results: '10/10',
            time: '0:05',
        },
        {
            key: 4,
            date: '17/07/2024',
            courses: 'IELTS Simulation Listening test 10',
            results: '10/10',
            time: '0:05',
        },
    ];

    const columns = [
        {
            title: 'Ngày làm',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Đề thi',
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
                <Link href="#">Xem chi tiết</Link>
            ),
        },
    ];

    return (
        <Card className="mb-4">
            <Table
                dataSource={listCoursesResults}
                columns={columns}
                pagination={false}
                bordered
            />
        </Card>
    );
};

export default ExamResults;
