'use client';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

import Table from '@/components/admin/Table/Table';
import { nestApiInstance } from '../../../../constant/api';
import Link from 'next/link';

interface DataType {
    _id: string;
    title: string;
    videoUrl: string;
    content_type: string;
    createdAt: Date;
}

const columns = [
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Video',
        dataIndex: 'videoUrl',
        key: 'videoUrl',
    },
    {
        title: 'Ngày đăng',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];

function AdminVideoPage() {
    const [video, setVideo] = useState<DataType[]>([]);
    const router = useRouter();

    const fetchVideo = async () => {
        try {
            const response = await nestApiInstance.get(`/course/video`);
            const data: DataType[] = response.data;
            console.log(data);

            const tableData: DataType[] = data.map((item: any) => ({
                _id: item._id,
                title: item.title,
                videoUrl: (
                    <Link
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Xem
                    </Link>
                ),
                createdAt: new Date(item.createdAt).toLocaleDateString(),
            }));

            setVideo(tableData);
        } catch (error) {
            console.error('Error fetching video:', error);
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
            await nestApiInstance.delete(`/course/video/${id}`);
            message.success('Video đã được xóa');
            fetchVideo();
            router.push('/admin/course/videos');
        } catch (error) {
            console.error('Error deleting video:', error);
            message.error('Không thể xóa video');
        }
    };

    return (
        <div>
            <Table<DataType>
                columns={columns}
                dataSource={video}
                onAdd={handleAdd}
                onDelete={(record) => handleDelete(record._id)}
                addLink="/admin/course/videos/handle-video/add"
            />
        </div>
    );
}

export default AdminVideoPage;
