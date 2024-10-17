'use client';
import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    CommentOutlined,
    ContainerOutlined,
    RadiusUpleftOutlined,
    ReconciliationOutlined,
    SnippetsOutlined,
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
            icon: <RadiusUpleftOutlined />,
            label: <Link href="/admin">Dashboard</Link>,
        },
        {
            key: '2',
            icon:  <UserOutlined />,
            label: <Link href="/admin/user">Người dùng</Link>,
        },
        {
            key: '3',
            icon: <ContainerOutlined />,
            label: 'Đề thi',
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
            icon: <VideoCameraOutlined />,
            label: 'Khóa học nâng cao',
            children: [
                {
                    key: '4-1',
                    label: <Link href="/admin/course/instruct">Hướng dẫn</Link>,
                },
                {
                    key: '4-2',
                    label: <Link href="/admin/course/quizzes">Quizzes</Link>,
                },
                {
                    key: '4-3',
                    label: (
                        <Link href="/admin/course/word-matching">
                            Word matchings
                        </Link>
                    ),
                },
                {
                    key: '4-4',
                    label: (
                        <Link href="/admin/course/fill-in-the-blank">
                            Fill in the blanks
                        </Link>
                    ),
                },
                {
                    key: '4-5',
                    label: <Link href="/admin/course/videos">Videos</Link>,
                },
                {
                    key: '4-6',
                    label: <Link href="/admin/course/contents">Contents</Link>,
                },
                {
                    key: '4-7',
                    label: <Link href="/admin/course/lessons">Lessons</Link>,
                },
                {
                    key: '4-8',
                    label: (
                        <Link href="/admin/course/course-type">
                            Course Types
                        </Link>
                    ),
                },
                {
                    key: '4-9',
                    label: <Link href="/admin/course/courses">Courses</Link>,
                },
            ],
        },
        {
            key: '5',
            icon: <AppstoreOutlined />,
            label: <Link href="/admin/flashcards">Flashcards</Link>,
        },
        {
            key: '6',
            icon: <ReconciliationOutlined />,
            label: <Link href="/admin/speaking/edit">Dữ liệu giao tiếp</Link>,
        },
        {
            key: '7',
            icon: <SnippetsOutlined />,
            label: <Link href="/admin/blog">Trang Blog</Link>,
        },
        {
            key: '8',
            icon: <CommentOutlined />,
            label: <Link href="/admin/comment">Bình luận</Link>,
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
