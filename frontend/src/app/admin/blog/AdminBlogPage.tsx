'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { message } from 'antd';
import { useRouter } from 'next/navigation'; // Thêm dòng này

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../constant/api';

interface DataType {
    _id: string;
    user: string;
    content: string;
    title: string;
    avatar: string;
    slug: string;
    date: Date;
}

const columns = [
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Đề tài',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'avatar',
        key: 'avatar',
    },
    {
        title: 'Người đăng',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'date',
        key: 'date',
    },
];

function AdminBlogPage() {
    const [blogs, setBlogs] = useState<DataType[]>([]);
    const router = useRouter(); // Khởi tạo router để điều hướng

    const fetchBlogs = async () => {
        try {
            const response = await nestApiInstance.get(`/blog`);
            const data: DataType[] = response.data.data.blogs;

            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                user: item.user.fullname,
                content: (
                    <p
                        className="mb-4 italic"
                        dangerouslySetInnerHTML={{
                            __html: item.content,
                        }}
                    />
                ),
                title: item.title,
                avatar: (
                    <Image
                        src={item.avatar}
                        height={80}
                        width={80}
                        alt={item.title}
                    />
                ),
                slug: item.slug,
                date: new Date(item.date).toLocaleDateString(), // Định dạng ngày
            }));
            setBlogs(tableData);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleEdit = (record: DataType) => {
        console.log('Edit button clicked', record);
    };

    const handleDelete = async (id: string) => {
        try {
            await nestApiInstance.delete(`/blog/${id}`);
            message.success('Bài viết đã được xóa');
            fetchBlogs();
            router.push('/admin/blog');
        } catch (error) {
            console.error('Error deleting blog:', error);
            message.error('Không thể xóa bài viết');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={blogs}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/blog/handle-blog/add"
                editLink={(record) =>
                    `/admin/blog/handle-blog/edit/${record._id}`
                }
            />
        </div>
    );
}

export default AdminBlogPage;
