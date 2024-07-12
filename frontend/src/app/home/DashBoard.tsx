import React from 'react';
import { SnippetsOutlined, EditOutlined } from '@ant-design/icons';

const Dashboard = () => {
    return (
        <div className=" bg-blue-50 p-10">
            <div className="max-w-7xl m-auto">
                <div className="mt-6 flex flex-wrap">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-900 mb-4">
                            Xin chào, NgoDuy
                        </h1>
                    </div>
                    <div className="flex p-3 gap-6 text-lg">
                        <div>
                            <p className="text-gray-600">
                                {' '}
                                <SnippetsOutlined className="mr-2" />
                                Tới kỳ thi IELTS Academic
                            </p>
                            <b className="text-gray-600 text-2xl">0 ngày</b>
                        </div>
                        <div>
                            <p className="text-gray-600">
                                <EditOutlined className="mr-2" />
                                Ngày dự thi
                            </p>
                            <p className="text-gray-600">-</p>
                        </div>
                        <div>
                            <p className="text-gray-600">
                                <EditOutlined className="mr-2" />
                                Target score
                            </p>
                            <p className="text-gray-600">-</p>
                        </div>
                    </div>
                </div>
                <div className=" p-4 mb-6">
                    <h2 className="text-xl font-semibold text-blue-900 mb-2">
                        Lịch học hôm nay
                    </h2>
                    <p className="text-gray-600">
                        Bạn không có lịch học hôm nay. Vui lòng vào Lịch học của
                        tôi để xem thêm hoặc tạo mới.
                    </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md w-min-20 w-[20rem]">
                    <h2 className="text-xl font-semibold #35509a  mb-2">
                        Khóa học của tôi
                    </h2>
                    <div className="bg-gray-100 p-4 rounded-lg ">
                        <div className="flex justify-between items-center mb-2 ">
                            <span className="font-semibold">
                                IELTS Intensive Listening
                            </span>
                            <span className=" bg-orange-400 rounded-lg p-1">
                                {' '}
                                Học thử
                            </span>
                        </div>
                        <div className="bg-gray-300 h-2 rounded-full mb-2">
                            <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: '0%' }}
                            ></div>
                        </div>
                        <p className="text-gray-600">
                            Tiếp tục bài học: Bài học thử - Luyện nghe chép
                            chính tả
                        </p>
                    </div>
                    <a href="#" className="text-blue-500 mt-2 inline-block">
                        Xem tất cả &gt;&gt;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
