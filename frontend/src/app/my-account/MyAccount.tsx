'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { RootState } from '@/lib/redux/store';
import { fetchUserData } from '@/lib/redux/features/user/userSlice';

import './MyAccount.scss';
import PageMyCourses from './courses/Courses';
import PageMyPosts from './posts/Posts';
import PageMyStatistics from './examstatistics/ExamStatistics';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const PageMyAccountInfo: React.FC = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const dispatch = useAppDispatch();

    const dataUser = useTypedSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    const handleChangePage = (pageName: string) => {
        setActiveTab(pageName);
    };

    return (
        <>
            <div className="account-info mx-auto p-6">
                <div className="relative flex flex-col items-center pb-10">
                    <Image
                        src="https://study4.com/static/img/user_banner.jpg"
                        alt="banner"
                        width={1170}
                        height={200}
                        className="h-[7.5rem] rounded-lg"
                    />
                    <div className="proflie-avatar">
                        {dataUser?.avatar ? (
                            <>
                                <Image
                                    src={dataUser?.avatar}
                                    alt="avatar"
                                    width={120}
                                    height={120}
                                    className="rounded-full "
                                />{' '}
                            </>
                        ) : (
                            <>
                                <Image
                                    src="https://study4.com/static/img/user_icon.png"
                                    alt="avatar"
                                    width={120}
                                    height={120}
                                    className="rounded-full "
                                />{' '}
                            </>
                        )}

                        <Link href={'/my-account/settings'}>
                            <EditOutlined className="absolute bottom-0 right-0   bg-white rounded-full p-2" />
                        </Link>
                    </div>

                    <div className="flex pt-2">
                        <h1 className="text-3xl md:text-2xl sm:text-xl font-bold mt-2">
                            {dataUser?.email}
                        </h1>
                        <Link
                            href={'#'}
                            className="text-sm  px-4  rounded-lg hover:bg-gray-200 items-center hover:text-black mt-2 pt-1"
                        >
                            Trang công khai
                        </Link>
                    </div>
                </div>
                <div className="border-b border-gray-200 pt-5">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => handleChangePage('courses')}
                            className={`pb-2 ${
                                activeTab === 'courses'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            Khóa học
                        </button>
                        <button
                            onClick={() => handleChangePage('examresults')}
                            className={`pb-2 ${
                                activeTab === 'examresults'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            Kết quả luyện thi
                        </button>
                        <button
                            onClick={() => handleChangePage('posts')}
                            className={`pb-2 ${
                                activeTab === 'posts'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            Posts
                        </button>
                    </div>
                </div>
                {activeTab === 'courses' && <PageMyCourses />}
                {activeTab === 'posts' && <PageMyPosts />}
                {activeTab === 'examresults' && <PageMyStatistics />}
            </div>
        </>
    );
};

export default PageMyAccountInfo;
