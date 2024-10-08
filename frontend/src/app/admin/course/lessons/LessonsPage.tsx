'use client';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation'; // Thêm dòng này

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';

interface DataType {
    _id: string;
    title: string;
    lesson: number;
    content: string[];
    isFree: boolean;
    createdAt: Date;
}

const columns = [
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Bài học số',
        dataIndex: 'lesson',
        key: 'lesson',
    },
    {
        title: 'Nội dung bài học',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminLessonsPage() {
    const [lessons, setLessons] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchLessons = async () => {
        try {
            const response = await nestApiInstance.get(`/course/lesson`);
            const data: DataType[] = response.data;
            console.log(data);

            // Cập nhật tableData để hiển thị correctAnswer từ options
            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                title: item.title,
                lesson: item.lesson,
                content: item.content[0]?.title,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));
            setLessons(tableData);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/course/lesson/${id}`);
            message.success('Lessons đã được xóa');
            fetchLessons();
            router.push('/admin/course/lessons');
        } catch (error) {
            console.error('Error deleting Lessons:', error);
            message.error('Không thể xóa Lessons');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={lessons}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/lessons/handle-lessons/add"
                editLink={(record) =>
                    `/admin/course/lessons/handle-lessons/edit/${record._id}`
                }
            />
        </div>
    );
}

export default AdminLessonsPage;
