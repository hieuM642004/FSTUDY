'use client';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';

interface DataType {
    _id: string;
    sentence: string;
    correctAnswers: string[];
    content_type: string;
    createdAt: Date;
}

const columns = [
    {
        title: 'Câu hỏi',
        dataIndex: 'sentence',
        key: 'sentence',
    },
    {
        title: 'Câu Trả Lời',
        dataIndex: 'correctAnswers',
        key: 'correctAnswers',
        render: (text: string[]) => text.join(', '),
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminFillInTheBlankPage() {
    const [fill, setFill] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchWords = async () => {
        try {
            const response = await nestApiInstance.get(`/course/fill`);
            const data: DataType[] = response.data;

            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                sentence: item.sentence,
                correctAnswers: item.correctAnswers,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));

            setFill(tableData);
        } catch (error) {
            console.error('Error fetching fill:', error);
        }
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/course/fill/${id}`);
            message.success('Fill đã được xóa');
            fetchWords();
            router.push('/admin/course/fill-in-the-blank');
        } catch (error) {
            console.error('Error deleting Fill:', error);
            message.error('Không thể xóa Fill');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={fill}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/fill-in-the-blank/handle-fill/add"
            />
        </div>
    );
}

export default AdminFillInTheBlankPage;
