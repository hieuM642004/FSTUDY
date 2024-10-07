'use client';
import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    ReconciliationOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

function MenuAdmin() {
    const [activeKey, setActiveKey] = useState('1');

    useEffect(() => {
        const savedActiveKey = localStorage.getItem('activeTab');
        if (savedActiveKey) {
            setActiveKey(savedActiveKey);
        }
    }, []);

    const handleMenuClick = (e: any) => {
        setActiveKey(e.key);
        localStorage.setItem('activeTab', e.key); 
    };

    const items = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link href="/admin/course">Người dùng</Link>,
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <Link href="/admin/">Khóa học</Link>,
        },
        {
            key: '3',
            icon: <ContainerOutlined />,
            label: <Link href="/admin/exams">Đề thi</Link>,
            children: [
                {
                    key: '3-1',
                    label: <Link href="/admin/exams">Danh sách đề thi</Link>,
                },
                {
                    key: '3-2',
                    label: (
                        <Link href="/admin/exams/exams-session">Phần thi</Link>
                    ),
                },
                {
                    key: '3-3',
                    label: (
                        <Link href="/admin/exams/group-questions">
                            Nhóm câu hỏi
                        </Link>
                    ),
                },
            ],
        },
        {
            key: '4',
            icon: <AppstoreOutlined />,
            label: <Link href="/admin/flashcards">Flashcards</Link>,
        },
        {
            key: '5',
            icon: <ReconciliationOutlined />,
            label: <Link href="/admin/speaking/edit">Dữ liệu giao tiếp</Link>,
        },
        {
            key: '6',
            icon: <UserOutlined />,
            label: <Link href="/admin/blog">Trang Blog</Link>,
        },
    ];

    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[activeKey]} 
                onClick={handleMenuClick} 
                items={items}
            />
        </>
    );
}

export default MenuAdmin;
