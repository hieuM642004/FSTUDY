import React, { useEffect, useState } from 'react';
import { SnippetsOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RootState } from '@/lib/redux/store';
import { fetchUserData } from '@/lib/redux/features/user/userSlice';
import HomeService from '@/services/home/HomeService';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const [userCourse, SetUserCourse] = useState<[] | any>();
    const [listCourse, SetListCourse] = useState<[] | any>();
    const dataUser = useTypedSelector((state: RootState) => state.user);
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);
    useEffect(() => {
        getUserCourse();
        getAllCourse();
    }, []);
    const getUserCourse = async () => {
        try {
            if (dataUser.id) {
                const userId = dataUser.id;
                const response = await HomeService.getPurchasesByUserId({
                    userId,
                });
                if (response) {
                    SetUserCourse(response);
                }
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getAllCourse = async () => {
        try {
            const response = await HomeService.getAllCourse();
            SetListCourse(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="container mx-auto px-4 py-10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-blue-900">
                            Xin chào, {dataUser?.name}
                        </h1>
                    </div>

                    {userCourse ? (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-[#35509a]">
                                KHÓA HỌC ĐÃ MUA
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userCourse?.length > 0 &&
                                    userCourse?.map(
                                        (item: any) =>
                                            item?.paymentStatus ===
                                                'COMPLETED' && (
                                                <div
                                                    key={item.course._id}
                                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                                >
                                                    <Link
                                                        href={`learning/${item.course._id}`}
                                                    >
                                                        <div className="p-6">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <h3 className="font-semibold text-gray-900">
                                                                    {
                                                                        item
                                                                            .course
                                                                            .title
                                                                    }
                                                                </h3>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div className="relative h-2 bg-gray-200 rounded-full">
                                                                    <div
                                                                        className="absolute h-2 bg-orange-500 rounded-full"
                                                                        style={{
                                                                            width: '0%',
                                                                        }}
                                                                    />
                                                                </div>
                                                                <p className="text-gray-600 text-sm">
                                                                    Tiếp tục bài
                                                                    học:{' '}
                                                                    {item.course
                                                                        .detail_short_description
                                                                        .length >
                                                                    50
                                                                        ? item.course.detail_short_description.substring(
                                                                              0,
                                                                              50,
                                                                          ) +
                                                                          '...'
                                                                        : item
                                                                              .course
                                                                              .detail_short_description}
                                                                </p>
                                                                <span className="inline-block bg-orange-400 text-white text-sm px-3 py-1 rounded-lg">
                                                                    Học thử
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ),
                                    )}
                            </div>
                            <Link
                                href="my-account"
                                className="inline-block text-blue-500 hover:text-blue-600 font-medium"
                            >
                                Xem tất cả &gt;&gt;
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-[#35509a]">
                                TOÀN BỘ KHÓA HỌC
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {listCourse?.length > 0 &&
                                    listCourse?.map((item: any) => (
                                        <div
                                            key={item._id}
                                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <Link
                                                href={`detailonlinecourse/${item._id}`}
                                            >
                                                <div className="p-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {item.title}
                                                        </h3>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="relative h-2 bg-gray-200 rounded-full">
                                                            <div
                                                                className="absolute h-2 bg-orange-500 rounded-full"
                                                                style={{
                                                                    width: '0%',
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-gray-600 text-sm">
                                                            Tiếp tục bài học:{' '}
                                                            {item
                                                                .detail_short_description
                                                                .length > 50
                                                                ? item.detail_short_description.substring(
                                                                      0,
                                                                      50,
                                                                  ) + '...'
                                                                : item.detail_short_description}
                                                        </p>
                                                        <span className="inline-block bg-orange-400 text-white text-sm px-3 py-1 rounded-lg">
                                                            Học thử
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
