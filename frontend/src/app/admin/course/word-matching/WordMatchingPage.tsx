'use client';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';

interface DataType {
    _id: string;
    words: string[];
    matches: string[];
    content_type: string;
    createdAt: Date;
}

const columns = [
    {
        title: 'Câu hỏi',
        dataIndex: 'words',
        key: 'words',
        render: (text: string[]) => text.join(', '),
    },
    {
        title: 'Từ đồng nghĩa',
        dataIndex: 'matches',
        key: 'matches',
        render: (text: string[]) => text.join(', '),
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminWordMatchingPage() {
    const [words, setWords] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchWords = async () => {
        try {
            const response = await nestApiInstance.get(`/course/word-matching`);
            const data: DataType[] = response.data;

            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                words: item.words,
                matches: item.matches,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));

            setWords(tableData);
        } catch (error) {
            console.error('Error fetching words:', error);
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
            await nestApiInstance.delete(`/course/word-matching/${id}`);
            message.success('Word Matching đã được xóa');
            fetchWords();
            router.push('/admin/course/word-matching');
        } catch (error) {
            console.error('Error deleting word matching:', error);
            message.error('Không thể xóa Word Matching');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={words}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/word-matching/handle-wordmatching/add"
            />
        </div>
    );
}

export default AdminWordMatchingPage;
