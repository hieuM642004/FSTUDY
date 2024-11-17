'use client';
import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    CommentOutlined,
    ContainerOutlined,
    PicLeftOutlined,
    RadiusUpleftOutlined,
    ReconciliationOutlined,
    ShoppingCartOutlined,
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
            icon: <UserOutlined />,
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
            label: 'Khóa học',
            children: [
                {
                    key: '4-1',
                    label: <Link href="/admin/course/instruct">Hướng dẫn</Link>,
                },
                {
                    key: '4-2',
                    label: <Link href="/admin/course/quizzes">Trắc nghiệm</Link>,
                    id: 'intro-1',
                },
                {
                    key: '4-3',
                    label: (
                        <Link href="/admin/course/word-matching">
                            Ghép từ
                        </Link>
                    ),
                    id: 'intro-2',
                },
                {
                    key: '4-4',
                    label: (
                        <Link href="/admin/course/fill-in-the-blank">
                            Điền từ vào chỗ trống
                        </Link>
                    ),
                    id: 'intro-3',
                },
                {
                    key: '4-5',
                    label: <Link href="/admin/course/videos">Videos</Link>,
                    id: 'intro-4',
                },
                {
                    key: '4-6',
                    label: <Link href="/admin/course/contents">Nội dung</Link>,
                    id: 'intro-5',
                },
                {
                    key: '4-7',
                    label: <Link href="/admin/course/lessons">Bài học</Link>,
                    id: 'intro-6',
                },
                {
                    key: '4-8',
                    label: (
                        <Link href="/admin/course/course-type">
                            Loại khóa học
                        </Link>
                    ),
                    id: 'intro-7',
                },
                {
                    key: '4-9',
                    label: <Link href="/admin/course/courses">Khóa học</Link>,
                    id: 'intro-8',
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
            label: 'Trang Blog',
            children: [
                {
                    key: '7-1',
                    label: <Link href="/admin/blog">Bài viết</Link>,
                },
                {
                    key: '7-2',
                    label: <Link href="/admin/topics">Chủ đề</Link>, 
                },
            ],
        },
        {
            key: '8',
            icon: <CommentOutlined />,
            label: <Link href="/admin/comment">Bình luận</Link>,
        },
       
        {
            key: '9',
            icon: <ShoppingCartOutlined />,
            label: <Link href="/admin/purchases">Khóa học đã bán</Link>,
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
