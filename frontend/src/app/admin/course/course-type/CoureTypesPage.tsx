'use client';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';
import Link from 'next/link';

interface DataType {
    _id: string;
    name: string;
    description: string;
    createdAt: Date;
}

const columns = [
    {
        title: 'Tên khóa học',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminTypePage() {
    const [type, setType] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchVideo = async () => {
        try {
            const response = await nestApiInstance.get(`/course/type`);
            const data: DataType[] = response.data.data;
            console.log(data);

            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                name: item.name,
                description: item.description,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));

            setType(tableData);
        } catch (error) {
            console.error('Error fetching course Type:', error);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/course/type/${id}`);
            message.success('Course Type đã được xóa');
            fetchVideo();
            router.push('/admin/course/course-type');
        } catch (error) {
            console.error('Error deleting course type:', error);
            message.error('Không thể xóa course type');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={type}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/course-type/handle-type/add"
                editLink={(record) =>
                    `/admin/course/course-type/handle-type/edit/${record._id}`
                }
            />
        </div>
    );
}

export default AdminTypePage;
