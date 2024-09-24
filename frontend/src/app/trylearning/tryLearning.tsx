'use client';

import React, { useState, useEffect } from 'react';
import {
    LeftOutlined,
    RightOutlined,
    BookOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { MenuProps, Button, Menu, Drawer, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { nestApiInstance } from '../../constant/api';

const TryLearningPages = ({ id }: { id: any }) => {
    type MenuItem = Required<MenuProps>['items'][number];
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [lessonsCourse, setLessonsCourse] = useState<any>(null);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    // Fetch data for the course
    const fetchLessonsCourse = async () => {
        try {
            const response = await nestApiInstance.get(`/course/${id}`);
            setLessonsCourse(response.data);
        } catch (error) {
            console.error('Error fetching course detail:', error);
        }
    };

    useEffect(() => {
        fetchLessonsCourse();
    }, [id]);

    const items: MenuItem[] =
        lessonsCourse?.lessons?.map((lesson: any, lessonIndex: number) => {
            const childrenItems: MenuItem[] = [];

            lesson?.content?.forEach((content: any, contentIndex: number) => {
                Object.keys(content).forEach((contentType) => {
                    switch (contentType) {
                        case 'quiz':
                            if (content.quiz?.length > 0) {
                                childrenItems.push({
                                    key: `quiz`,
                                    label: 'Quiz',
                                    onClick: () => {
                                        setSelectedKey(`quiz`);
                                        router.push(
                                            `/trylearning/lessons-handle/quizz/${content._id}`,
                                        );
                                    },
                                });
                            }
                            break;
                        case 'fill_in_the_blank':
                            if (content.fill_in_the_blank?.length > 0) {
                                childrenItems.push({
                                    key: `fill_in_the_blank`,
                                    label: 'Fill in the Blank',
                                    onClick: () => {
                                        setSelectedKey(
                                            `fill_in_the_blank-${content._id}`,
                                        );
                                        router.push(
                                            `/trylearning/lessons-handle/fillInTheBlank/${content._id}`,
                                        );
                                    },
                                });
                            }
                            break;
                        case 'video':
                            if (content.video?.length > 0) {
                                childrenItems.push({
                                    key: `video-${content._id}`,
                                    label: 'Video',
                                    onClick: () => {
                                        setSelectedKey(`video`);
                                        router.push(
                                            `/trylearning/lessons-handle/video/${content._id}`,
                                        );
                                    },
                                });
                            }
                            break;
                        case 'word_matching':
                            if (content.word_matching?.length > 0) {
                                childrenItems.push({
                                    key: `word_matching-${content._id}`,
                                    label: 'word_matching',
                                    onClick: () => {
                                        setSelectedKey(`word_matching`);
                                        router.push(
                                            `/trylearning/lessons-handle/wordmatching/${content._id}`,
                                        );
                                    },
                                });
                            }
                            break;
                        default:
                            break;
                    }
                });
            });

            return {
                key: `sub${lessonIndex + 1}`,
                label: lesson.title,
                icon: <BookOutlined />,
                children: childrenItems,
            };
        }) || [];

    const handleMenuClick = (e: any) => {
        setSelectedKey(e.key);
        setDrawerVisible(false);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    if (!lessonsCourse) {
        return <Skeleton active />;
    }

    return (
        <div className="app-container">
            <div className="md:p-5">
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
                        onClick={handleMenuClick}
                    />
                </Drawer>
            </div>

            {/* Nội dung động thay đổi dựa trên bài học hoặc quiz */}
            <div className="content">
                <div className="content-navigation">
                    <div className="content-navigation-left">
                        <Link href={`/trylearning/${lessonsCourse._id}`}>
                            Danh sách bài học
                        </Link>{' '}
                        <RightOutlined />
                        <Link href={`#`}>{selectedKey}</Link>
                    </div>
                </div>
                <div className="contetnt-sale">
                    <p>Ngày sale vv.............</p>{' '}
                </div>
                <div className="content-items"></div>
            </div>
        </div>
    );
};

export default TryLearningPages;
