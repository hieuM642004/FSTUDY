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
        if (dataUser) {
            getUserCourse();
        } else {
            getAllCourse();
        }
    }, [dispatch]);
    useEffect(() => {
        if (dataUser) {
            getUserCourse();
            getAllCourse();
        }
    }, [dataUser]);
    const getUserCourse = async () => {
        try {
            if (dataUser.id) {
                const userId = dataUser.id;
                const response = await HomeService.getPurchasesByUserId({
                    userId,
                });
                console.log('response', response);
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
        <div className=" bg-blue-50 p-10">
            <div className="max-w-7xl m-auto">
                <div className="mt-6 flex flex-wrap justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-900 mb-4 ">
                            Xin chào, {dataUser?.name}
                        </h1>
                    </div>
                   
                </div>
               
                {userCourse ? (
                    <>
                        <h2 className="text-xl font-semibold #35509a  mb-2">
                            {userCourse ? <div>KHÓA HỌC ĐÃ MUA</div> : <></>}
                        </h2>
                        <div className="flex flex-wrap">
                            {userCourse?.length > 0 &&
                                userCourse?.map(
                                    (item: string | any, index: number) => {                             
                                        return (
                                            <>
                                                {item?.paymentStatus ===
                                                    'COMPLETED' && (
                                                    <>
                                                        <div
                                                            key={
                                                                item.course._id
                                                            }
                                                            className="bg-white p-4  mb-3  rounded-lg shadow-md w-min-20 w-[20rem] mx-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300"
                                                        >
                                                            <Link
                                                                href={`learning/${item.course._id}`}
                                                            >
                                                                <div className="bg-gray-100 p-4 rounded-lg">
                                                                    <div className="flex justify-between items-center mb-2 text-black">
                                                                        <span className="font-semibold">
                                                                            {
                                                                                item
                                                                                    .course
                                                                                    .title
                                                                            }
                                                                        </span>
                                                                      
                                                                    </div>
                                                                    <div className="bg-gray-300 h-2 rounded-full mb-2">
                                                                        <div
                                                                            className="bg-orange-500 h-2 rounded-full"
                                                                            style={{
                                                                                width: '0%',
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="text-gray-600">
                                                                        Tiếp tục
                                                                        bài học:{' '}
                                                                        {
    item.course.detail_short_description.length > 50
        ? item.course.detail_short_description.substring(0, 50) + '...'
        : item.course.detail_short_description
}

                                                                    </div>
                                                                    <span className="bg-orange-400 rounded-lg p-1 mt-2 text-white ">
                                                                Học thử
                                                            </span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        );
                                    },
                                )}
                        </div>
                        {userCourse ? (
                            <>
                                {' '}
                                <Link
                                    href="my-account"
                                    className="text-blue-500 mt-2 inline-block"
                                >
                                    Xem tất cả &gt;&gt;
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold #35509a  mb-2">
                            TOÀN BỘ KHÓA HỌC
                        </h2>
                        <div className="flex flex-wrap">
                            {listCourse?.length > 0 &&
                                listCourse?.map(
                                    (item: string | any, index: number) => {
                                        return (
                                            <div
                                                key={item._id}
                                                className="bg-white  mb-3  p-4 rounded-lg shadow-md w-min-20 w-[20rem] mx-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300"
                                            >
                                                <Link
                                                    href={`detailonlinecourse/${item._id}`}
                                                >
                                                    <div className="bg-gray-100 p-4 rounded-lg">
                                                  
                                                        <div className="flex justify-between items-center mb-2 text-black">
                                                            <span className="font-semibold">
                                                                {item.title}
                                                            </span>
                                                           
                                                        </div>
                                                        <div className="bg-gray-300 h-2 rounded-full mb-2">
                                                            <div
                                                                className="bg-orange-500 h-2 rounded-full"
                                                                style={{
                                                                    width: '0%',
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <div className="text-gray-600">
                                                            Tiếp tục bài học:{' '}
                                                            {
    item.detail_short_description.length > 50
        ? item.detail_short_description.substring(0, 50) + '...'
        : item.detail_short_description
}

                                                        </div>
                                                    <span className="bg-orange-400 rounded-lg p-1 mt-2 text-white ">
                                                                Học thử
                                                            </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    },
                                )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
