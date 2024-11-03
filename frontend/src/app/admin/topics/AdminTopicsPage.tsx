'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import { useRouter } from 'next/navigation'; // Thêm dòng này

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../constant/api';

interface DataType {
    _id: string;
    name: string;
    description: string;
    createdAt: Date;
}

const columns = [
    {
        title: 'Topic',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Ngày',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminPurchasesPage() {
    const [topics, setTopics] = useState<DataType[]>([]);
    const router = useRouter(); // Khởi tạo router để điều hướng

    const fetchTopic = async () => {
        try {
            const response = await nestApiInstance.get(`/blog/topic`);
            console.log(response.data.data);

            const data: DataType[] = response.data.data;

            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                name: item.name,
                description: item.description,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));
            setTopics(tableData);
        } catch (error) {
            console.error('Error fetching topic:', error);
        }
    };

    useEffect(() => {
        fetchTopic();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    // const handleEdit = (record: DataType) => {
    //     console.log('Edit button clicked', record);
    // };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/blog/topic/${id}`);
            message.success('Topic đã được xóa');
            fetchTopic();
            router.push('/admin/topics');
        } catch (error) {
            console.error('Error deleting Topic:', error);
            message.error('Không thể xóa Topic');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={topics}
                onAdd={handleAdd}
                // onEdit={handleEdit}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/topics/handle-topics/add"
            />
        </div>
    );
}

export default AdminPurchasesPage;
