'use client';
import React from 'react';
import { Carousel } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import './HomePage.scss';
import OnlineCourse from './CoursesOnline/CoursesOnline';
import Dashboard from '../DashBoard/DashBoard';
import IELTSCard from '../../../components/client/IELTSCard/IELTSCard';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

const App: React.FC = () => {
    const tests = [
        { testNumber: 1, views: 442326, comments: 1432 },
        { testNumber: 2, views: 176373, comments: 392 },
        { testNumber: 3, views: 112365, comments: 204 },
        { testNumber: 4, views: 88719, comments: 215 },
        { testNumber: 5, views: 72702, comments: 143 },
        { testNumber: 6, views: 64167, comments: 115 },
        { testNumber: 7, views: 45558, comments: 74 },
        { testNumber: 10, views: 138996, comments: 396 },
    ];

    return (
        <>
            <div className="container">
                    <Dashboard />
                <div>
                </div>
                <div className="banner">
                    <Carousel arrows infinite={false}>
                        <img
                            src="https://study4.com/media/home/HomeBanner/1/files/233968478_140026628280769_6886569768763456198_n.jpg"
                            alt="banner1"
                        />
                        <img
                            src="https://study4.com/media/home/HomeBanner/1/files/233968478_140026628280769_6886569768763456198_n.jpg"
                            alt="banner1"
                        />
                    </Carousel>
                </div>
                {/* <OnlineCourse />
                <div className="banner2">
                    <Carousel arrows infinite={false}>
                        <img
                            src="https://study4.com/media/home/HomeBanner/2/files/Webp.net-resizeimage_69.jpg"
                            alt="banner1"
                        />
                    </Carousel>
                </div>
                <div className="test-card p-10">
                    <h1 className="text-2xl font-bold mb-6 justify-items-center">
                        Đề thi mới nhất
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {tests.map((test, index) => (
                            <IELTSCard
                                key={index}
                                testNumber={test.testNumber}
                                views={test.views}
                                comments={test.comments}
                            />
                        ))}
                    </div>
                </div>
                <div className="section items-center justify-center min-h-screen">
                    <div className="section-title grid justify-items-center">
                        <h1 className="text-3xl font-bold mb-4">
                            Tham gia cộng đồng
                        </h1>
                        <div className="flex  mb-4">
                            <img
                                src="https://i.pinimg.com/736x/8a/19/74/8a197476d79c2e22004a3367514eb8eb.jpg"
                                alt=""
                                height={35}
                                width={35}
                                className="rounded-full"
                            />
                            <img
                                src="https://i.pinimg.com/736x/8a/19/74/8a197476d79c2e22004a3367514eb8eb.jpg"
                                alt=""
                                height={35}
                                width={35}
                                className="rounded-full"
                            />
                            <img
                                src="https://i.pinimg.com/736x/8a/19/74/8a197476d79c2e22004a3367514eb8eb.jpg"
                                alt=""
                                height={35}
                                width={35}
                                className="rounded-full"
                            />{' '}
                            <i> và hơn 350.000 học viên tham gia mỗi tháng</i>
                        </div>
                    </div>
                    <div className="mx-auto flex flex-col md:flex-row items-center">
                        <div className="md:gap-4 md:w-1/2 p-4 min-h-96">
                            <img
                                src="https://i.pinimg.com/564x/db/15/37/db1537019e4c165a80a56bf8e135a011.jpg"
                                alt=""
                            />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <div className="space-y-2 mb-6">
                                <p>
                                    <CheckOutlined /> Cộng đồng học tiếng Anh và
                                    luyện thi sôi nổi với hơn 250.000 học viên
                                    mỗi tháng
                                </p>
                                <p>
                                    <CheckOutlined /> Đặt câu hỏi cho đội ngũ
                                    trợ giảng cũng như các học viên khác để nhận
                                    giải đáp sau 30 phút
                                </p>
                                <p>
                                    <CheckOutlined /> Chia sẻ kinh nghiệm học
                                    tập và làm bài thi với các thành viên khác
                                </p>
                                <p>
                                    <CheckOutlined /> Luyện tập kỹ năng nói &
                                    viết và nhận được nhận xét và chấm điểm từ
                                    cộng đồng và giảng viên
                                </p>
                            </div>
                            <ButtonPrimary
                                size="large"
                                label={'Tham gia ngay'}
                                className="text-white px-4 py-2 rounded-lg w-full"
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default App;
