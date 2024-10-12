'use client';
import React, { useState, useEffect } from 'react';
import {
    CommentOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearUser, fetchUserData } from '@/lib/redux/features/user/userSlice';
import User from '@/components/shared/User/User';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;
import './AdminLayout.scss';
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const user = useTypedSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    useEffect(() => {
        setIsAdmin(user.isAdmin);
    }, [user.isAdmin]);

    const handleLogout = () => {
        deleteCookie('token');
        deleteCookie('refreshToken');
        deleteCookie('typeLogin');
        dispatch(clearUser());

        router.push('/login');
    };
    const itemsdropdown = [
        {
            label: <Link href="/my-account">Trang cá nhân</Link>,
            key: '1',
        },
        isAdmin
            ? {
                  label: <Link href="/">Trang người dùng</Link>,
                  key: '2',
              }
            : {},
        {
            label: <button onClick={handleLogout}>Đăng xuất</button>,
            key: '3',
        },
    ];

    const items = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link href="/admin/user">Người dùng</Link>,
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <Link href="/admin/">Khóa học</Link>,
        },
        {
            key: '3',
            icon: <UploadOutlined />,
            label: <Link href="/admin/">Đề thi</Link>,
        },
        {
            key: '4',
            icon: <CommentOutlined />,
            label: <Link href="/admin/comment">Bình luận</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="flex justify-center items-center">
                    <Link
                        href="/admin"
                        className={`${
                            collapsed ? 'text-sm' : 'text-4xl'
                        } font-bold text-white text-center mx-auto my-2 text-wrap transition-all duration-300`}
                    >
                        FSTUDY
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />

                    <div className="mt-4">
                        <User
                            user={user as any}
                            isAdmin={isAdmin}
                            itemsdropdown={itemsdropdown}
                        />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
