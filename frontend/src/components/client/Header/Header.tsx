'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Drawer, MenuProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearUser, fetchUserData } from '@/lib/redux/features/user/userSlice';
import { deleteCookie, getCookie } from 'cookies-next';
import AuthService from '@/services/auth/AuthService';

import './Header.scss';
import ButtonPrimary from '../../shared/ButtonPrimary/ButtonPrimary';
import UserAvatarDropdown from '@/components/shared/User/User';

const Header = () => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const user = useTypedSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    useEffect(() => {
        setIsAdmin(user.isAdmin);
    }, [user.isAdmin]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleLogout = () => {
        const refreshToken = (getCookie('refreshToken') as string) ?? '';
        AuthService.logout(refreshToken);
        deleteCookie('token');
        deleteCookie('refreshToken');
        deleteCookie('typeLogin');
        deleteCookie('idU');
        deleteCookie('name');
        dispatch(clearUser());
        router.push('/login');
    };

    const itemsdropdown: MenuProps['items'] = [
        {
            label: <div onClick={() => {}}>Tất cả</div>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div
                    onClick={() => {
                        router.push('/my-account');
                    }}
                    className=""
                >
                    Trang cá nhân
                </div>
            ),
            key: '1',
        },
        isAdmin
            ? {
                  label: <Link href={'/admin'}>Trang quản trị</Link>,
                  key: '3',
              }
            : {
                  label: null,
                  key: '',
              },
        {
            label: (
                <div onClick={handleLogout} className="">
                    Đăng xuất
                </div>
            ),
            key: '2',
        },
    ];

    const filteredMenuItems = useMemo(() => {
        const baseItems = [
            { key: 1, label: 'Khoá học online', href: '/courses-online' },
            { key: 2, label: 'Đề thi online', href: '/tests' },
            { key: 3, label: 'Flashcards', href: '/flashcard' },
            { key: 5, label: 'Blog', href: '/blogs' },
            { key: 6, label: 'Kích hoạt khóa học', href: '/activate-courses' },
        ];

        if (user.isLoggedIn) {
            baseItems.splice(3, 0, {
                key: 4,
                label: 'Phòng học online',
                href: '/meet',
            });
        }

        return baseItems;
    }, [user.isLoggedIn]);

    return (
        <header className="lg:px-16 bg-white flex flex-wrap items-center shadow-md z-50 fixed w-full top-0">
            <div className="flex-1 flex justify-between items-center p-1">
                <Link href="/home" className="text-4xl font-bold text-black ">
                    FSTUDY
                </Link>
            </div>
            <button
                className="pointer-cursor p-1 md:hidden block text-gray-600 text-2xl"
                onClick={showDrawer}
            >
                <UnorderedListOutlined />
            </button>
            <Drawer
                title="Menu"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
            >
                <nav>
                    <ul className="text-base text-gray-700 pt-4">
                        {filteredMenuItems.map((item) => (
                            <li key={item.key}>
                                <Link href={item.href}>
                                    <p className="md:p-4 py-3 px-0 block font-semibold">
                                        {item.label}
                                    </p>
                                </Link>
                            </li>
                        ))}
                        {!user.isLoggedIn && (
                            <ButtonPrimary label="Đăng nhập" />
                        )}
                    </ul>
                </nav>
            </Drawer>
            <div
                className="hidden p-1 md:flex md:items-center md:w-auto w-full z-50 cursor-pointer"
                id="menu"
            >
                <nav>
                    <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                        {filteredMenuItems.map((item) => (
                            <li key={item.key}>
                                <Link href={item.href}>
                                    <p className="md:p-4 py-3 px-0 block font-semibold">
                                        {item.label}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {user.isLoggedIn ? (
                    <UserAvatarDropdown
                        user={user as any}
                        isAdmin={isAdmin}
                        itemsdropdown={itemsdropdown}
                    />
                ) : (
                    <ButtonPrimary to="/login" size="large" label="Đăng nhập" />
                )}
            </div>
        </header>
    );
};

export default Header;
