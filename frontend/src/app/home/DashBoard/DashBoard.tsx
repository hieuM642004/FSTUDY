'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RootState } from '@/lib/redux/store';
import { fetchUserData } from '@/lib/redux/features/user/userSlice';
import HomeService from '@/services/home/HomeService';
import PageMyCourses from '@/app/my-account/courses/Courses';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const [userCourse, SetUserCourse] = useState<[] | any>();
    const [listCourse, SetListCourse] = useState<[] | any>();
    const dataUser = useTypedSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!dataUser) {
            dispatch(fetchUserData());
        }
    }, [dispatch, dataUser]);

    useEffect(() => {
        const fetchUserCourseData = async () => {
            try {
                if (dataUser?.id && !userCourse) {
                    const response = await HomeService.getPurchasesByUserId({
                        userId: dataUser.id,
                    });
                    if (response) {
                        SetUserCourse(response);
                    } else {
                        await fetchAllCourses();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAllCourses = async () => {
            try {
                if (!listCourse) {
                    const response = await HomeService.getAllCourse();
                    SetListCourse(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (dataUser) {
            fetchUserCourseData();
        }
    }, [dataUser, userCourse, listCourse]);
    return (
        <div className="max-h-screen bg-blue-50">
            <div className="container mx-auto px-4 py-10">
                <div>
                    <h1 className="text-4xl font-bold text-blue-900">
                        Xin chào, {dataUser?.name}
                    </h1>
                </div>

                {userCourse ? (
                    <>
                        <h2 className="text-xl font-semibold text-[#35509a] space-y-6 mt-3 mb-3">
                            TOÀN BỘ KHÓA HỌC
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userCourse?.length > 0 &&
                                userCourse.map(
                                    (item: any) =>
                                        item?.paymentStatus === 'SUCCESS' && (
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
                                                                    item.course
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
                                                                    .length > 50
                                                                    ? item.course.detail_short_description.substring(
                                                                          0,
                                                                          50,
                                                                      ) + '...'
                                                                    : item
                                                                          .course
                                                                          .detail_short_description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ),
                                )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-6 mt-3">
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
