'use client';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation'; // Thêm dòng này

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';

interface DataType {
    _id: string;
    title: string;
    createdAt: Date;
}

const columns = [
    {
        title: 'Nội dung',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminContentsPage() {
    const [contents, setContents] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchContents = async () => {
        try {
            const response = await nestApiInstance.get(`/course/content`);
            const data: DataType[] = response.data;
            console.log(data);

            // Cập nhật tableData để hiển thị correctAnswer từ options
            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                title: item.title,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));
            setContents(tableData);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    useEffect(() => {
        fetchContents();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/course/content/${id}`);
            message.success('Content đã được xóa');
            fetchContents();
            router.push('/admin/course/contents');
        } catch (error) {
            console.error('Error deleting Content:', error);
            message.error('Không thể xóa Content');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={contents}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/contents/handle-contents/add"
                editLink={(record) =>
                    `/admin/course/contents/handle-contents/edit/${record._id}`
                }
            />
        </div>
    );
}

export default AdminContentsPage;
