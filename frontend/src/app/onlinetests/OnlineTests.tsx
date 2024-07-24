'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import IELTSCard from '../../components/client/IELTSCard/IELTSCard';
import Pagination from '../../components/shared/Pagination/Pagination';
import './Onlinetests.scss';
const OnlineTests: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const list = [
        'Tất cả',
        'IELTS Academic',
        'IELTS General',
        'TOEIC',
        'HSK 1',
        'HSK 2',
        'HSK 3',
        'HSK 4',
        'HSK 5',
        'HSK 6',
        'Tiếng Anh THPTQG',
        'Toán THPTQG',
        'Sinh học THPTQG',
        'Hóa học THPTQG',
        'Vật lý THPTQG',
        'NEW SAT',
        'ACT',
    ];
    const tests = [
        { testNumber: 1, views: 442326, comments: 1432 },
        { testNumber: 2, views: 176373, comments: 392 },
        { testNumber: 3, views: 112365, comments: 204 },
        { testNumber: 4, views: 88719, comments: 215 },
        { testNumber: 5, views: 72702, comments: 143 },
        { testNumber: 6, views: 64167, comments: 115 },
        { testNumber: 7, views: 45558, comments: 74 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
        { testNumber: 10, views: 138996, comments: 396 },
    ];
    return (
        <>
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row md:space-x-4 mt-4 gap-8">
                    <div className="w-full md:w-64 p-4 border rounded-lg order-1 md:order-2 mb-4 md:mb-0">
                        <div className="flex items-center space-x-2">
                            <Image
                                src=""
                                alt="Avatar"
                                width={40}
                                height={40}
                                className="bg-gray-300 rounded-full mb-2"
                            />
                            <div>
                                <div className="font-bold">NgoDuy</div>
                            </div>
                        </div>
                        <hr />
                        <div className="mt-4">
                            <p className="text-sm">IELTS General</p>
                            <p className="text-sm">Ngày dự thi: -</p>
                            <p className="text-sm">Tới kỳ thi: 0 ngày</p>
                            <p className="text-sm">Điểm mục tiêu: -</p>
                        </div>
                        <ButtonPrimary
                            size={'large'}
                            label={' Thống kê kết quả'}
                            className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-lg"
                        />
                    </div>
                    <div className="md:basis-2/3 order-2 md:order-1">
                        <h1 className="text-3xl font-bold">Thư viện đề thi</h1>
                        <div className="flex space-x-2 flex-wrap w-auto mt-4">
                            {list.map((item, index) => (
                                <Link
                                    href={'#'}
                                    key={index}
                                    className="whitespace-pre-wrap px-4 rounded-lg hover:bg-gray-200 h-8 items-center hover:text-black"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="flex-1 p-1 border rounded-lg"
                            />
                            <ButtonPrimary
                                size={'large'}
                                label={'Tìm kiếm'}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            />
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 pl-10">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`pb-2 ${
                                activeTab === 'all'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            Tất cả
                        </button>
                        <button
                            onClick={() => setActiveTab('short')}
                            className={`pb-2 ${
                                activeTab === 'short'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            Đề rút gọn
                        </button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 mt-4 gap-8">
                    <div className="w-full md:w-64  order-2 md:order-2 mb-4 md:mb-0">
                        <Link href={'#'}>
                            <Image
                                src="https://study4.com/media/home/HomeBanner/files/2022/07/06/Learning_English_with.jpg"
                                alt="Banner"
                                width={400}
                                height={100}
                                className="mb-4"
                            />
                        </Link>
                        <Link href={'#'}>
                            <Image
                                src="https://study4.com/media/home/HomeBanner/files/2023/03/31/Learning_English_with_1.png"
                                alt="Banner"
                                width={400}
                                height={100}
                                className="mb-4"
                            />
                        </Link>
                        <Link href={'#'}>
                            <Image
                                src="https://study4.com/media/home/HomeBanner/files/2021/12/01/download_extension.png"
                                alt="Banner"
                                width={400}
                                height={100}
                                className="mb-4"
                            />
                        </Link>
                    </div>
                    <div className="md:basis-2/3 order-1 md:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
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
                </div>
                <div className="pt-4">
                    <Pagination />
                </div>
                <div className="pt-8">
                    <Image
                        src="https://study4.com/static/img/testonline_banner.jpg"
                        alt="Avatar"
                        width={1146}
                        height={400}
                        className="bg-gray-300  mb-2 w-full"
                    />
                </div>
            </div>
        </>
    );
};

export default OnlineTests;
