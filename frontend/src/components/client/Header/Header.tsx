'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Drawer, MenuProps } from 'antd';
import {  hasCookie } from 'cookies-next';
import { AuthContext } from '@/context/auth/AuthContext';
import Image from 'next/image';

import './Header.scss';
import ButtonPrimary from '../../shared/ButtonPrimary/ButtonPrimary';
import Dropdowns from '../Dropdown/Dropdown';

const menuItems = [
    { key: 1, label: 'Khoá học online', href: '#' },
    { key: 2, label: 'Đề thi online', href: '#' },
    { key: 3, label: 'Flashcards', href: '/flashcard' },
    { key: 4, label: 'Blog', href: '#' },
    { key: 5, label: 'Kích hoạt khóa học', href: '#' },
];

const Header = () => {
    const { user, logout, getProfileUser }: any = useContext(AuthContext);

    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState(false);
    const [dataUser, setDataUser] = useState();

    useEffect(() => {
        const fetchDataUser = async () => {
            const data = await getProfileUser();
            setDataUser(data);
        };

        let checkToken = hasCookie('token');
        setToken(checkToken);
        if (checkToken) {
            fetchDataUser();
        }
    }, [user]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const itemsdropdown: MenuProps['items'] = [
        {
            label: <div onClick={() => {}}>tất cả</div>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <div onClick={() => {}} className="">
                    Lịch học của tôi
                </div>
            ),
            key: '1',
        },
        {
            label: (
                <div onClick={() => {}} className="">
                    Trang cá nhân
                </div>
            ),
            key: '1',
        },
        {
            label: (
                <div
                    onClick={() => {
                        logout();
                    }}
                    className=""
                >
                    Đăng xuất
                </div>
            ),
            key: '1',
        },
    ];
    return (
        <header className="lg:px-16 bg-white flex flex-wrap items-center shadow-md z-50 fixed w-full top-0">
            <div className="flex-1 flex justify-between items-center p-1">
                <Link href="/home" className="text-4xl font-bold text-black ">
                    FSTUDY
                </Link>
            </div>
            <button
                className="pointer-cursor p-1  md:hidden block text-gray-600 text-2xl"
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
                        {menuItems.map((item) => (
                            <li key={item.key}>
                                <Link href={item.href}>
                                    <p className="md:p-4 py-3 px-0 block font-semibold">
                                        {item.label}
                                    </p>
                                </Link>
                            </li>
                        ))}
                        <ButtonPrimary label="Đăng nhập" />
                    </ul>
                </nav>
            </Drawer>
            <div
                className="hidden p-1 md:flex md:items-center md:w-auto w-full z-50 cursor-pointer"
                id="menu"
            >
                <nav>
                    <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                        {menuItems.map((item) => (
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
                {token ? (
                    <>
                        <Dropdowns
                            items={itemsdropdown}
                            title={
                                dataUser?.avatar ? (
                                    <>
                                        <Image
                                            src={dataUser?.avatar}
                                            width={30}
                                            height={30}
                                            alt="Picture of the author"
                                            className="mr-2"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src="https://study4.com/static/img/user_icon.png"
                                            width={30}
                                            height={30}
                                            alt="Picture of the author"
                                            className="mr-2"
                                        />
                                    </>
                                )
                            }
                            stylecss=" text-normal"
                        />
                    </>
                ) : (
                    <>
                        <ButtonPrimary
                            to="/login"
                            size="large"
                            label="Đăng nhập"
                        />
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
