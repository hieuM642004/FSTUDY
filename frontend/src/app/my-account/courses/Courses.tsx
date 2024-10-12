import React, { useEffect, useState } from 'react';
import { SnippetsOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { RootState } from '@/lib/redux/store';
import { fetchUserData } from '@/lib/redux/features/user/userSlice';
import HomeService from '@/services/home/HomeService';

const PageMyCourses = () => {
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
                } else {
                    getAllCourse();
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
                                            <div
                                                key={item.course._id}
                                                className="bg-white p-4 rounded-lg shadow-md w-min-20 w-[20rem] mx-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300"
                                            >
                                                <Link
                                                    href={`trylearning/${item.course._id}`}
                                                >
                                                    <div className="bg-gray-100 p-4 rounded-lg">
                                                        <div className="flex justify-between items-center mb-2 text-black">
                                                            <span className="font-semibold">
                                                                {
                                                                    item.course
                                                                        .title
                                                                }
                                                            </span>
                                                            <span className="bg-orange-400 rounded-lg p-1 text-white">
                                                                Học thử
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
                                                                item.course
                                                                    .detail_short_description
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
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
                        <h2 className=" font-semibold #35509a text-center">
                            Bạn chưa mua khóa học nào <Link href={"/courses-online"}>mua ngay</Link> 
                        </h2>
                       
                    </>
                )}
            </div>
        </div>
    );
};

export default PageMyCourses;
