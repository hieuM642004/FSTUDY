'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import { useRouter } from 'next/navigation'; // Thêm dòng này

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';

interface DataType {
    _id: string;
    title: string;
    detail_title: string;
    price: number;
    discount: number;
    createdAt: Date;
}

const columns = [
    {
        title: 'Khóa học',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Giới thiệu',
        dataIndex: 'detail_title',
        key: 'detail_title',
        render: (text: string) => (
            <p
                className="mb-4 italic"
                dangerouslySetInnerHTML={{ __html: text }}
            />
        ),
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Giảm giá',
        dataIndex: 'discount',
        key: 'discount',
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminCoursesPage() {
    const [courses, setCourses] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchCourses = async () => {
        try {
            const response = await nestApiInstance.get(`/course`);
            const data: DataType[] = response.data;
            console.log(data);

            // Cập nhật tableData để hiển thị correctAnswer từ options
            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                title: item.title,
                detail_title: item.detail_title,
                price: item.price,
                discount: item.discount,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));

            setCourses(tableData);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleEdit = (record: DataType) => {
        console.log('Edit button clicked', record);
    };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/course/${id}`);
            message.success('Course đã được xóa');
            fetchCourses();
            router.push('/admin/course/courses');
        } catch (error) {
            console.error('Error deleting course:', error);
            message.error('Không thể xóa Course');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={courses}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/courses/handle-courses/add"
                editLink={(record) =>
                    `/admin/course/courses/handle-courses/edit/${record._id}`
                }
            />
        </div>
    );
}

export default AdminCoursesPage;
