'use client';
import React from 'react';
import { Carousel } from 'antd';

import './HomePage.scss';
import Courses from '../../components/client/Course/Courses';

const OnlineCourse: React.FC = () => {
    return (
        <>
            <div className="home-container p-4">
                <h2 className="text-xl font-bold mb-4">
                    Khóa học online nổi bật
                </h2>
                <Carousel
                    slidesToShow={3}
                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true,
                            },
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                initialSlide: 2,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ]}
                    dots={true}
                    arrows={true}
                    infinite={true}
                    draggable={true}
                >
                    <Courses />
                    <Courses />
                    <Courses />
                    {/* <div className="carousel-item p-2">
                        <a
                            href="#"
                            className="block bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src="https://study4.com/media/courses/Course/files/2023/12/12/gt_reading-min.webp"
                                alt="banner1"
                                className="w-full"
                            />
                            <div className="content p-4">
                                <h3 className="text-lg font-bold">
                                    IELTS General Training Reading
                                </h3>
                                <p className="text-sm">
                                    [IELTS General Training] Intensive Reading:
                                    Từ Vựng - Chiến Lược Làm Bài - Chữa đề chi
                                    tiết
                                </p>
                                <span className="text-lg font-semibold">
                                    699.000đ
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="carousel-item p-2">
                        <a
                            href="#"
                            className="block bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src="https://study4.com/media/courses/Course/files/2023/12/12/gt_reading-min.webp"
                                alt="banner2"
                                className="w-full"
                            />
                            <div className="content p-4">
                                <h3 className="text-lg font-bold">
                                    IELTS General Training Writing
                                </h3>
                                <p className="text-sm">
                                    [IELTS General Training] Intensive Writing:
                                    Thực hành luyện tập Writing GT
                                </p>
                                <span className="text-lg font-semibold">
                                    699.000đ
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="carousel-item p-2">
                        <a
                            href="#"
                            className="block bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src="https://study4.com/media/courses/Course/files/2023/12/12/gt_reading-min.webp"
                                alt="banner3"
                                className="w-full"
                            />
                            <div className="content p-4">
                                <h3 className="text-lg font-bold">
                                    TOEIC Complete Course
                                </h3>
                                <p className="text-sm">
                                    [Complete TOEIC] Chiến lược làm bài - Từ
                                    vựng - Ngữ pháp - Luyện nghe với Dictation
                                </p>
                                <span className="text-lg font-semibold">
                                    989.000đ
                                </span>
                            </div>
                        </a>
                    </div> */}
                </Carousel>
            </div>
        </>
    );
};

export default OnlineCourse;
