'use client';
import React, { useState, useEffect } from 'react';
import {
    LeftOutlined,
    RightOutlined,
    BookOutlined,
    MenuOutlined,
    CheckCircleOutlined,
    CheckCircleTwoTone,
} from '@ant-design/icons';
import { MenuProps, Button, Menu, Drawer, Skeleton, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { nestApiInstance } from '../../constant/api';
import {jwtDecode} from 'jwt-decode'; 
import { getCookie } from 'cookies-next';
interface ChildItem {
    key: string;
    label: React.ReactNode; // Use React.ReactNode for label to allow any valid JSX
    onClick?: () => void; // Optional click handler
}

const TryLearningPages = ({ id }: { id: any }) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [lessonsCourse, setLessonsCourse] = useState<any>(null);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [progressData, setProgressData] = useState<any>({});
    const [userId, setUserId] = useState<string | null>(null);
    const [userPurchased, setUserPurchased] = useState<boolean>(false);

    const fetchLessonsCourse = async () => {
        try {
            const response = await nestApiInstance.get(`/course/${id}`);
            setLessonsCourse(response.data);
        } catch (error) {
            console.error('Error fetching course detail:', error);
        }
    };

    const fetchProgressData = async () => {
        if (userId) {
            try {
                const response = await nestApiInstance.get(`/course/progressAll/${userId}`);
                setProgressData(response.data);

                console.log(response.data);
            } catch (error) {
                console.error('Error fetching progress data:', error);
            }
        }
    };

    const checkUserPurchase = async () => {
        if (userId) {
            try {
                const response = await nestApiInstance.get(`/course/check/${userId}/${id}`);
                console.log(response.data);
                
                setUserPurchased(response.data.paymentStatus === 'COMPLETED');
            } catch (error) {
                console.error('Error checking user purchase:', error);
            }
        }
    };

    useEffect(() => {
        const token = getCookie('token') as string;
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            setUserId(null);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchLessonsCourse();
            fetchProgressData();
            checkUserPurchase();
        }
    }, [id, userId]);

    const getProgressStatus = (contentId: string, type: string) => {
        let progressItem;

        switch (type) {
            case 'quiz':
                progressItem = progressData.quiz?.find((item: any) => item.quizId === contentId);
                break;
            case 'fill_in_the_blank':
                progressItem = progressData.fillInTheBlank?.find((item: any) => item.fillInTheBlankId === contentId);
                break;
            case 'video':
                progressItem = progressData.video?.find((item: any) => item.videoId === contentId);
                break;
                case 'word_matching':
                    const wordMatching = progressData.wordMatching;
                    if (wordMatching?.wordMatchingId === contentId) {
                        progressItem = wordMatching;
                    }
                    break;
            default:
                break;
        }
        if (progressItem && progressItem.completed) {
            return <CheckCircleTwoTone twoToneColor="#52c41a" />;
        }

        return <CheckCircleOutlined />;
    };

    const items = lessonsCourse?.lessons?.map((lesson: any, lessonIndex: number) => {
        const childrenItems: ChildItem[] = []; // Explicitly set the type for childrenItems

        // Check if the lesson is free or user has purchased the course
        if (!lesson.isFree && !userPurchased) {
            return {
                key: `sub${lessonIndex + 1}`,
                label: (
                    <Tooltip title="Xin vui lòng kích hoạt khóa học">
                        <span>{lesson.title} </span>
                    </Tooltip>
                ),
                icon: <BookOutlined />,
                disabled: true,
            };
        }

            lesson?.content?.forEach((content: any) => {
                Object.keys(content).forEach((contentType) => {
                    switch (contentType) {
                        case 'quiz':
                            if (content.quiz?.length > 0) {
                                childrenItems.push({
                                    key: `quiz-${content._id}`,
                                    label: (
                                        <>
                                            Quiz {getProgressStatus(content._id, 'quiz')}
                                        </>
                                    ),
                                    onClick: () => {
                                        setSelectedKey(`quiz-${content._id}`);
                                        router.push(`/trylearning/lessons-handle/quizz/${content._id}`);
                                    },
                                });
                            }
                            break;
                        case 'fill_in_the_blank':
                            if (content.fill_in_the_blank?.length > 0) {
                                childrenItems.push({
                                    key: `fill_in_the_blank-${content._id}`,
                                    label: (
                                        <>
                                            Fill in the Blank {getProgressStatus(content._id, 'fill_in_the_blank')}
                                        </>
                                    ),
                                    onClick: () => {
                                        setSelectedKey(`fill_in_the_blank-${content._id}`);
                                        router.push(`/trylearning/lessons-handle/fillInTheBlank/${content._id}`);
                                    },
                                });
                            }
                            break;
                        case 'video':
                            if (content.video?.length > 0) {
                                childrenItems.push({
                                    key: `video-${content._id}`,
                                    label: (
                                        <>
                                            Video {getProgressStatus(content._id, 'video')}
                                        </>
                                    ),
                                    onClick: () => {
                                        setSelectedKey(`video-${content._id}`);
                                        router.push(`/trylearning/lessons-handle/video/${content._id}`);
                                    },
                                });
                            }
                            break;
                        case 'word_matching':
                            if (content.word_matching?.length > 0) {
                                childrenItems.push({
                                    key: `word_matching-${content._id}`,
                                    label: (
                                        <>
                                            Word Matching {getProgressStatus(content._id, 'word_matching')}
                                        </>
                                    ),
                                    onClick: () => {
                                        setSelectedKey(`word_matching-${content._id}`);
                                        router.push(`/trylearning/lessons-handle/wordmatching/${content._id}`);
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

            <div className="content">
                <div className="content-navigation">
                    <div className="content-navigation-left">
                        <Link href={`/trylearning/course/${id}`}>
                            <LeftOutlined />
                        </Link>
                        <h3>{lessonsCourse.title}</h3>
                    </div>
                    <div className="content-navigation-right">
                        <RightOutlined onClick={toggleCollapsed} />
                    </div>
                </div>

                {/* Here, render the selected content or any other details you need */}
                {selectedKey && (
                    <div className="selected-content">
                        {/* Content rendering logic based on selectedKey */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TryLearningPages;