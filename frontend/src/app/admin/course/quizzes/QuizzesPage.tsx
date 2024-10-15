'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import { useRouter } from 'next/navigation'; // Thêm dòng này

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';

interface DataType {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    createdAt: Date;
}

const columns = [
    {
        title: 'Câu hỏi',
        dataIndex: 'question',
        key: 'question',
    },
    {
        title: 'Câu trả lời',
        dataIndex: 'correctAnswer',
        key: 'correctAnswer',
    },
    {
        title: 'Giải thích',
        dataIndex: 'explanation',
        key: 'explanation',
        render: (text: string) => (
            <span>
                {text.length > 50 ? `${text.substring(0, 50)}...` : text}
            </span>
        ),
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminBlogPage() {
    const [quizzes, setQuizzes] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchQuizzes = async () => {
        try {
            const response = await nestApiInstance.get(`/course/quiz`);
            const data: DataType[] = response.data;

            // Cập nhật tableData để hiển thị correctAnswer từ options
            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                question: item.question,
                options: item.options,
                correctAnswer: item.options[item.correctAnswer],
                explanation: item.explanation,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));

            setQuizzes(tableData);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleEdit = (record: DataType) => {
        console.log('Edit button clicked', record);
    };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/course/quiz/${id}`);
            message.success('Quizz đã được xóa');
            fetchQuizzes();
            router.push('/admin/course/quizzes');
        } catch (error) {
            console.error('Error deleting blog:', error);
            message.error('Không thể xóa Quizzes');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={quizzes}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/quizzes/handle-quizzes/add"
            />
        </div>
    );
}

export default AdminBlogPage;
