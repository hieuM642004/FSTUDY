'use client';
import Image from 'next/image';
import {
    EditOutlined,
    BookOutlined,
    UsergroupAddOutlined,
    FieldTimeOutlined,
} from '@ant-design/icons';
import { Anchor } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserOutlined, CommentOutlined, StarFilled } from '@ant-design/icons';
import { useParams } from 'next/navigation';

import Evaluate from '../Evaluates/Evaluate';
import WapperItemCard from '../../../components/client/WapperItemCard/WapperItemCard';
import { nestApiInstance } from '../../../constant/api';
import RegisterNow from '../Modals/RegisterNow';
import FreeLessons from '../Modals/FreeLessons';

function NavBar() {
    const [courseDetail, setCourseDetail] = useState<any>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const { id } = useParams();
    const fetchCourseDetail = async () => {
        try {
            const response = await nestApiInstance.get(`/course/${id}`);
            setCourseDetail(response.data);
        } catch (error) {
            console.error('Error fetching course detail:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await nestApiInstance.get(`/course`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const formatPrice = (price: number | undefined) => {
        return price?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    useEffect(() => {
        fetchCourseDetail();
        fetchCourses();
    }, [id]);

    const detailTitle = courseDetail?.detail_title || '';
    const lines = detailTitle.trim().split('.');
    const matchingCourses = courses.filter(
        (item) => item.typeCourse?._id == courseDetail.typeCourse?._id,
    );

    return (
        <>
            <div className="contentHeader bg-cover ">
                <div className="banner md:text">
                    <div className="overlay"> </div>{' '}
                    <div className="ContainerHeader lg:px-3 lg:pt-10 text-white">
                        <div className="flex">
                            <div className="flex-[1.5]  lg:w-64 ...">
                                {' '}
                                <h2 className="lg:text-xl font-bold ">
                                    {courseDetail?.title}
                                </h2>
                                <div className="course-tags mt-3">
                                    <span className="bg-[#f0f8ff]  py-1 px-[0.625rem]  rounded-xl text-[#35509a]">
                                        #Khóa học online
                                    </span>
                                </div>
                                <div className="course-rating mt-2">
                                    <span className="average text-xl font-bold text-[#ffad3b] ml-[2px]">
                                        4.9
                                    </span>
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <span className="ml-1">(892 Đánh giá)</span>
                                    <span className="ml-1">
                                        123,668 Học viên
                                    </span>
                                </div>
                                <div className="course-overview  lg:mt-2 text-[1rem]">
                                    <div>
                                        <p
                                            className="mb-4 italic"
                                            dangerouslySetInnerHTML={{
                                                __html: courseDetail.detail_title,
                                            }}
                                        />
                                    </div>
                                    {/* <div>
                                        {lines.map((line: any, index: any) => (
                                            <div key={index}>✅ {line}</div>
                                        ))}
                                    </div> */}
                                </div>
                            </div>

                            <div className="lg:flex-1 lg:w-7 ... "></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* nav bar */}
            <div
                className={`MainNavBar lg:w-full border-b-[1] fixed top-12 left-0 right-0`}
            >
                <Anchor
                    className={`lg:h-16 pb-1 mt-4 `}
                    direction="horizontal"
                    items={[
                        {
                            key: 'part-1',
                            href: '#part-1',
                            title: 'Mục tiêu khóa học',
                        },
                        {
                            key: 'part-2',
                            href: '#part-2',
                            title: 'Thông tin khóa học',
                        },
                        {
                            key: 'part-3',
                            href: '#part-3',
                            title: 'Chương trình học',
                        },
                        {
                            key: 'part-4',
                            href: '#part-4',
                            title: 'Đánh giá (991)',
                        },
                    ]}
                />
            </div>
            {/* sidebar  */}
            <div
                className={`MainSideBar fixed  shadow-2xl  md:w-[21.25rem] duration-150 ease-in-out top-[4rem] right-[5.625rem] `}
            >
                <div>
                    <div>
                        <Image
                            className="rounded-lg "
                            src={courseDetail.thumbnail}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />
                    </div>
                    <div className="">
                        <div className="p-4">
                            <div className="mb-2 font-bold text-[1.15rem]">
                                Ưu đãi đặc biệt tháng 6/2024:
                            </div>
                            <div className="flex mb-2">
                                <div className="text-[#3cb46e] text-[1.85rem] font-bold">
                                    {formatPrice(
                                        courseDetail.price -
                                            courseDetail.discount,
                                    )}
                                </div>
                                <div className="flex flex-col ml-1">
                                    <span className="line-through text-[#677788] text-[.86rem]">
                                        {formatPrice(courseDetail.price)}
                                    </span>
                                    <span className="text-[#e43a45] text-[0.86rem] font-bold">
                                        {Math.round(
                                            (courseDetail.discount /
                                                courseDetail.price) *
                                                100,
                                        )}
                                        %
                                    </span>
                                </div>
                            </div>
                            <RegisterNow idCourse={id} />
                            <FreeLessons data={courseDetail} />
                            <div className="border-b-[0.6px] border-gray-500 my-5"></div>
                            <div>
                                <div className="flex mb-[.35rem] text-[0.75rem] items-center">
                                    <div>
                                        <UsergroupAddOutlined className="w-10 text-[1.25rem] text-[#455ea2] inline-flex justify-start items-center" />
                                    </div>
                                    <div>98,671 học viên đã đăng ký</div>
                                </div>
                                <div className="flex mb-[.35rem] text-[0.75rem] items-center">
                                    <div>
                                        <BookOutlined className="w-10 text-[1.25rem] text-[#455ea2] inline-flex justify-start items-center" />
                                    </div>
                                    <div>86 chủ đề, 900 bài học</div>
                                </div>
                                <div className="flex mb-[.35rem] text-[0.75rem] items-center">
                                    <div>
                                        <EditOutlined className="w-10 text-[1.25rem] text-[#455ea2] inline-flex justify-start items-center" />
                                    </div>
                                    <div>2,099 bài tập thực hành</div>
                                </div>
                                <div className="flex mb-[.35rem] text-[0.75rem] items-center">
                                    <div>
                                        <UsergroupAddOutlined className="w-10 text-[1.25rem] text-[#455ea2] inline-flex justify-start items-center" />
                                    </div>
                                    <div>
                                        Combo 4 khoá học có giá trị 12 tháng
                                    </div>
                                </div>
                                <div className="flex mb-[.35rem] text-[0.75rem] items-center">
                                    <div>
                                        <FieldTimeOutlined className="w-10 text-[1.25rem] text-[#455ea2] inline-flex justify-start items-center" />
                                    </div>
                                    <div>98,671 học viên đã đăng ký</div>
                                </div>
                            </div>
                            <div className="border-b-[0.6px] border-gray-500 my-3"></div>
                            <div className="text-[0.75rem]">
                                Chưa chắc chắn khoá học này dành cho bạn?
                                <a
                                    href=""
                                    className="text-[#455ea2]  underline"
                                >
                                    Liên hệ để nhận tư vấn miễn phí!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* sideBar */}
            {/* content */}
            <div className="lg:px-3 lg:pt-8 lg:pb-12">
                <div className="bg-[#f8f9fa!important]">
                    {/* combo học khóa học */}
                    {matchingCourses && (
                        <WapperItemCard>
                            <div className="CourseSeries">
                                <h5 className="font-bold mb-4 text-xl">
                                    Combo này bao gồm:
                                </h5>
                                <ol className="text-base pl-10">
                                    {matchingCourses.map((course, index) => (
                                        <li key={course._id}>
                                            <Link href="#">
                                                {index + 1}.{course.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </WapperItemCard>
                    )}
                    {/* sau khóa học */}
                    <WapperItemCard>
                        <div
                            id="part-1"
                            style={{
                                width: '100%',
                            }}
                        >
                            {' '}
                            <div className="contentblock">
                                <h2 className="font-bold text-2xl">
                                    Bạn sẽ đạt được gì sau khoá học?
                                </h2>
                                <div>
                                    {courseDetail.detail_short_description}
                                </div>
                            </div>
                        </div>
                    </WapperItemCard>
                    {/* thông tin khóa học */}
                    <WapperItemCard>
                        <div
                            id="part-2"
                            style={{
                                width: '100%',
                            }}
                        >
                            {' '}
                            <h2 className="font-bold text-2xl">
                                Thông tin khoá học
                            </h2>
                            <blockquote>
                                <p className="mb-4">
                                    <em>
                                        Bài học được biên soạn và giảng dạy bởi:
                                    </em>
                                </p>

                                <ul className="pl-10 mv mb-4 ">
                                    <li>
                                        <em>
                                            Ms. Phuong Nguyen, Macalester
                                            College, USA. TOEFL 114, IELTS 8.0,
                                            SAT 2280, GRE Verbal 165/170
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            Ms. Uyen Tran, FTU. IELTS 8.0
                                            (Listening 8.5, Reading 8.5)
                                        </em>
                                    </li>
                                </ul>
                            </blockquote>
                            <h3 id="">&nbsp;</h3>
                            <div className="CourseDescription">
                                <h3 id="bạn-sẽ-học-những-gì?">
                                    <strong>Bạn sẽ học những gì?</strong>
                                </h3>

                                <div>
                                    <p
                                        className="mb-4 italic"
                                        dangerouslySetInnerHTML={{
                                            __html: courseDetail.detail_content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </WapperItemCard>
                    {/* chương trình học */}
                    <div
                        id="part-3"
                        className="bg-[#e8f2ff]  rounded-lg p-4 shadow-md lg:w-[47rem] mb-10"
                    >
                        {' '}
                        <h2 className="mb-4 font-bold text-[1.25rem]">
                            Chương trình học
                        </h2>
                        {matchingCourses.length > 0 &&
                            matchingCourses.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="SeriesSyllabusCourse mt-6 lg:flex block"
                                >
                                    <div className="SeriesSyllabusCourse-number lg:w-[100px]">
                                        Khoá học
                                        <span className="SeriesSyllabusCourse-number-index lg:block inline-block">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="series-syllabus-course-content pb-8 border-b-2">
                                        <h3
                                            className="series-syllabus-course-title"
                                            id={`[ielts-fundamentals]-từ-vựng-và-ngữ-pháp-cơ-bản-ielts-${item.id}`}
                                        >
                                            <a
                                                href={`/courses/${item.id}`}
                                                className="text-[#213261] font-bold"
                                            >
                                                {item.title}
                                            </a>
                                        </h3>
                                        <div className="course-rating mb-2">
                                            <span className="average text-xl font-bold text-[#ffad3b] ml-[2px]">
                                                5.0
                                            </span>
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <span className="ml-2">
                                                (211 Đánh giá)
                                            </span>
                                            <span className="ml-2">
                                                16,335 Học viên
                                            </span>
                                        </div>
                                        <div className="series-syllabus-course-overview">
                                            <p
                                                className="mb-4 italic"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.detail_title,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* đánh giá  */}
                    <div
                        id="part-4"
                        style={{
                            width: '100%',
                        }}
                    >
                        {' '}
                        <h2 className="mb-4 font-bold text-[1.25rem]">
                            Nhận xét của học viên
                        </h2>
                        <WapperItemCard>
                            <div className="course-reviews-stats">
                                <div className="flex justify-between flex-wrap items-center">
                                    <div className="">
                                        <div className="reviews-stats font-bold text-[1.5rem]">
                                            <UserOutlined />
                                            123,668
                                        </div>
                                        <div className="reviews-stats-text">
                                            Học viên
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="reviews-stats font-bold text-[1.5rem]">
                                            <CommentOutlined />
                                            891
                                        </div>
                                        <div className="reviews-stats-text">
                                            Nhận xét
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="review-stats course-rating">
                                            <span className="average text-[1.5rem] font-bold text-[#ffad3b] ml-[2px]">
                                                5.0
                                            </span>

                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                        </div>
                                        <div className="reviews-stats-text">
                                            Đánh giá trung bình
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </WapperItemCard>
                        <WapperItemCard>
                            <Evaluate />
                        </WapperItemCard>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
