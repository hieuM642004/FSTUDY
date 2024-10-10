'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input,Spin } from 'antd';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import IELTSCard from '../../components/client/IELTSCard/IELTSCard';
import Pagination from '../../components/shared/Pagination/Pagination';
import ExamService from '@/services/exams/ExamsService';
import { Exams } from '@/types/Exams';
import Target from '@/components/client/Target/Target';
import './Tests.scss';

const Tests: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [tests, setTests] = useState<Exams[]>([]);
    const [examTypes, setExamTypes] = useState<{ label: string; value: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [empty, setEmpty] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchExamTypes = async () => {
            setLoading(true); 
            const allExams = await ExamService.getAllExams();

            const uniqueExamTypes = Array.from(
                new Set(allExams.data.map((exam: any) => exam.examType)),
            );

            const tabs = [
                { label: 'Tất cả', value: 'all' },
                ...uniqueExamTypes.map((type: any) => ({
                    label: type,
                    value: type,
                })),
            ];

            setExamTypes(tabs);
            setLoading(false); 
        };

        fetchExamTypes();
    }, []);

    useEffect(() => {
        const getTests = async () => {
            setLoading(true);
            let examTypeQuery = activeTab !== 'all' ? `examType=${activeTab}` : '';
            const testsData = await ExamService.getAllExams(examTypeQuery);

            const formattedTests = testsData?.data.map((exam: any) => ({
                title: exam.title,
                examType: exam.examType,
                description: exam.description,
                slug: exam.slug,
                durition: exam.durition,
                idSession: exam.idSession.map((session: any) => ({
                    title: session.title,
                    description: session.description,
                    slug: session.slug,
                })),
            }));

            setTests(formattedTests);
            setLoading(false); 
        };

        getTests();
    }, [activeTab]);

    const handleSearch = async () => {
        setLoading(true); 
        const searchExams = await ExamService.getAllExams(`title=${searchQuery}`);
        if (searchExams.data.length === 0) {
            setEmpty('Không tìm thấy đề thi');
            setTests([]);
        } else {
            setTests(searchExams.data);
        }
        setLoading(false); 
    };

    return (
        <>
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row md:space-x-4 mt-4 gap-8">
                    <Target />
                    <div className="md:basis-2/3 order-2 md:order-1">
                        <h1 className="text-3xl font-bold">Thư viện đề thi</h1>
                        <div className="flex space-x-2 flex-wrap w-auto mt-4">
                            {examTypes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(item.value)}
                                    className={`whitespace-pre-wrap px-4 rounded-lg hover:bg-gray-200 items-center hover:text-black ${
                                        activeTab === item.value
                                            ? 'bg-gray-200 text-black'
                                            : ''
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="flex-1 p-1 border rounded-lg"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <ButtonPrimary
                                onClick={handleSearch}
                                size={'large'}
                                label={'Tìm kiếm'}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {loading ? ( 
                    <div className="flex justify-center items-center h-64">
                        <Spin></Spin>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row md:space-x-4 mt-4 gap-8">
                        <div className="w-full md:w-64 order-2 md:order-2 mb-4 md:mb-0">
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
                            {tests.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                                    {tests.map((test, index) => (
                                        <IELTSCard
                                            key={index}
                                            title={test.title}
                                            idSession={test.idSession}
                                            durition={test.durition}
                                            examType={test.examType}
                                            description={test.description}
                                            slug={test.slug}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">{empty}</div>
                            )}
                        </div>
                    </div>
                )}
                <div className="pt-4">
                    <Pagination />
                </div>
                <div className="pt-8">
                    <Image
                        src="https://study4.com/static/img/testonline_banner.jpg"
                        alt="Avatar"
                        width={1146}
                        height={400}
                        className="bg-gray-300 mb-2 w-full"
                    />
                </div>
            </div>
        </>
    );
};

export default Tests;
