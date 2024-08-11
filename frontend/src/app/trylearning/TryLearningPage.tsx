'use client';
import React, { useState } from 'react';
import {
    LeftOutlined,
    RightOutlined,
    BookOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Button, Menu, Drawer } from 'antd';
import './TryLearning.scss'; // Import CSS for custom styling
import Link from 'next/link';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Bài học 1',
        icon: <BookOutlined />,
        children: [
            { key: '5', label: 'Nội dung bài 1' },
            { key: '6', label: 'Nội dung bài 2' },
            { key: '7', label: 'Nội dung bài 3' },
            { key: '8', label: 'Nội dung bài 4' },
        ],
    },
    {
        key: 'sub2',
        label: 'Bài học 2',
        icon: <BookOutlined />,
        children: [
            { key: '9', label: 'Nội dung bài 5' },
            { key: '10', label: 'Nội dung bài 6' },
        ],
    },
    {
        key: 'sub3',
        label: 'Bài học 3',
        icon: <BookOutlined />,
        children: [
            { key: '11', label: 'Nội dung bài 7' },
            { key: '12', label: 'Nội dung bài 8' },
        ],
    },
    {
        key: 'sub4',
        label: 'Bài học 4',
        icon: <BookOutlined />,
        children: [
            { key: '13', label: 'Nội dung bài 9' },
            { key: '14', label: 'Nội dung bài 10' },
        ],
    },
];

const TryLearningPages: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <div className="app-container">
            <Button
                className="menu-toggle-btn btn-primary font-semibold"
                type="primary"
                onClick={showDrawer}
            >
                <div>
                    <MenuOutlined /> Danh sách bài học
                </div>
            </Button>
            <Drawer
                title="Danh sách bài học"
                placement="left"
                closable={true}
                onClose={closeDrawer}
                visible={drawerVisible}
            >
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </Drawer>
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <Button
                    onClick={toggleCollapsed}
                    className="toggle-btn btn-primary font-semibold "
                    type="primary"
                >
                    {collapsed ? (
                        <RightOutlined />
                    ) : (
                        <>
                            <LeftOutlined />
                            <span>Danh sách bài học</span>
                        </>
                    )}
                </Button>

                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
            <div className="content">
                <div className="content-navigation">
                    <div className="content-navigation-left">
                        <Link href="/trylearning">Danh sách bài học</Link>{' '}
                        <RightOutlined />
                    </div>
                    <div className="content-navigation-right">
                        <Link href="#">
                            Bài sau <RightOutlined />
                        </Link>
                    </div>
                </div>
                <div className="contetnt-sale">
                    <p>Ngày sale vv.............</p>{' '}
                </div>
                <div className="content-items">
                    <iframe
                        src="https://www.youtube.com/embed/CNu0YQsewb0?si=H1qrgiv0Vv7-Zpvn"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default TryLearningPages;
