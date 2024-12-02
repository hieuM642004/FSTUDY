'use client';
import React from 'react';
import { Carousel } from 'antd';

import '../HomePage.scss';
import Courses from '../../../../components/client/Course/Courses';

const CoursesOnline: React.FC = () => {
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
                </Carousel>
            </div>
        </>
    );
};

export default CoursesOnline;
