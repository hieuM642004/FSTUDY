'use client';
import React from 'react';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';

const PageMyCourses: React.FC = () => {
    const listCourses = [
        {
            courses: 'Khóa học của tôi',
            type: 'Học thử',
            lab: 'Bài học thử - Luyện nghe chép chính tả',
        },
        {
            courses: 'Khóa học của tôi',
            type: 'Học thử',
            lab: ' Hướng dẫn làm các dạng câu hỏi trong IELTS Listening - Note/form/table/flow-chart completion',
        },
        {
            courses: 'Khóa học của tôi',
            type: 'Học thử',
            lab: ' Nguyên âm (Vowels) và phụ âm (Consonants) - Phụ âm /ʒ/',
        },
        {
            courses: 'Khóa học của tôi',
            type: 'Học thử',
            lab: 'Bài học thử - Luyện nghe chép chính tả',
        },
        {
            courses: 'Khóa học của tôi',
            type: 'Học thử',
            lab: '[Vocabulary] Từ vựng theo chủ đề - Study, education, research (Học tập, giáo dục, nghiên cứu)',
        },
    ];

    return (
        <>
            <div className="pt-5 pb-2 ">
                <h2 className="text-xl font-semibold #35509a  mb-2">
                    Khóa học của tôi
                </h2>
                <div className="flex flex-wrap gap-4 max-lg:justify-center ">
                    {listCourses.map((items, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 p-4 rounded-lg w-[240px] hover:scale-105 transition ease-in-out delay-150 duration-300"
                        >
                            <div className="flex flex-wrap items-center mb-2">
                                <span className="font-semibold">
                                    {items.courses}
                                </span>
                                <span className="bg-orange-400 rounded-lg p-1 ml-2">
                                    {items.type}
                                </span>
                            </div>
                            <div className="bg-gray-300 h-2 rounded-full mb-2">
                                <div
                                    className="bg-orange-500 h-2 rounded-full"
                                    style={{ width: '0%' }}
                                ></div>
                            </div>
                            <p className="text-gray-600">
                                <span className="font-semibold">
                                    Tiếp tục bài học:
                                </span>{' '}
                                {items.lab}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PageMyCourses;
