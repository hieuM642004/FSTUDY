'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import './Header.scss';
import ButtonPrimary from '../../shared/ButtonPrimary/ButtonPrimary';

const menuItems = [
    { key: 1, label: 'Khoá học online', href: '/courses-online' },
    { key: 2, label: 'Đề thi online', href: '#' },
    { key: 3, label: 'Flashcards', href: '/flashcard' },
    { key: 4, label: 'Blog', href: '/blogs' },
    { key: 5, label: 'Kích hoạt khóa học', href: '/activate-courses' },
];

const Header = () => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

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
                                    <p className="md:p-4 py-3 px-0 block font-semibold">{item.label}</p>
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
                                    <p className="md:p-4 py-3 px-0 block font-semibold">{item.label}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <ButtonPrimary size="large" label="Đăng nhập" />
            </div>
        </header>
    );
};

export default Header;
