'use client';
import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BookOutlined,
    CheckCircleOutlined,
    CheckCircleTwoTone,
} from '@ant-design/icons';
import { Button, Layout, Menu, Skeleton, Tooltip } from 'antd';
import { nestApiInstance } from '../../constant/api';
import { jwtDecode } from 'jwt-decode'; 
import { getCookie } from 'cookies-next';

// Import các component chính xác
import LessonsHandlePage from './lessons-handle/quizz/LessonsQuiz';
import FillInTheBlankPage from './lessons-handle/fillInTheBlank/LessonsFillInTheBlank';
import VideoPage from './lessons-handle/video/LessonsVideo';
import WordMatchingPage from './lessons-handle/wordmatching/LessonsWordMatching';

const { Header, Sider, Content } = Layout;

const TryLearningPages = ({ id }: { id: any }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [lessonsCourse, setLessonsCourse] = useState<any>(null);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<React.ReactNode>(null);
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
            } catch (error) {
                console.error('Error fetching progress data:', error);
            }
        }
    };

    const checkUserPurchase = async () => {
        if (userId) {
            try {
                const response = await nestApiInstance.get(`/course/check/${userId}/${id}`);
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

    useEffect(() => {
        if (lessonsCourse && lessonsCourse.lessons && lessonsCourse.lessons.length > 0) {
            const firstLesson = lessonsCourse.lessons[0];
            if (firstLesson && firstLesson.content && firstLesson.content.length > 0) {
                const firstContent = firstLesson.content[0];
                if (firstContent) {
                    selectContentBasedOnType(firstContent);
                }
            }
        }
    }, [lessonsCourse]);

    const selectContentBasedOnType = (content: any) => {
        if (content.quiz?.length > 0) {
            handleMenuClick(`quiz-${content._id}`, <LessonsHandlePage id={content._id} />);
        } else if (content.fill_in_the_blank?.length > 0) {
            handleMenuClick(`fill_in_the_blank-${content._id}`, <FillInTheBlankPage id={content._id} />);
        } else if (content.video?.length > 0) {
            handleMenuClick(`video-${content._id}`, <VideoPage id={content._id} />);
        } else if (content.word_matching?.length > 0) {
            handleMenuClick(`word_matching-${content._id}`, <WordMatchingPage id={content._id} />);
        }
    };

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

    const handleMenuClick = (key: string, component: React.ReactNode) => {
        setSelectedKey(key);
        setSelectedContent(component);
    };

    const items = lessonsCourse?.lessons?.map((lesson: any, lessonIndex: number) => {
        const childrenItems: any[] = [];

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
                                onClick: () => handleMenuClick(`quiz-${content._id}`, <LessonsHandlePage id={content._id} />),
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
                                onClick: () => handleMenuClick(`fill_in_the_blank-${content._id}`, <FillInTheBlankPage id={content._id} />),
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
                                onClick: () => handleMenuClick(`video-${content._id}`, <VideoPage id={content._id} />),
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
                                onClick: () => handleMenuClick(`word_matching-${content._id}`, <WordMatchingPage id={content._id} />),
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

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    if (!lessonsCourse) {
        return <Skeleton active />;
    }

    return (
        <Layout className='h-auto'>
            <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white border-solid border-r-2 border-zinc-200'>
                <Menu
                    className='bg-white mt-3'
                    mode="inline"
                    selectedKeys={[selectedKey || '1']}
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: '#fff' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapsed}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                    }}
                >
                    {selectedContent || 'Chọn một bài học để hiển thị nội dung'}
                </Content>
            </Layout>
        </Layout>
    );
};

export default TryLearningPages;
