import React, { useState, useEffect } from 'react';
import { StarFilled } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { nestApiInstance } from '../../../constant/api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { Row, Col, Spin } from 'antd';

function Courses({
    data,
    isUserCourse,
}: {
    data?: any;
    isUserCourse?: boolean;
}) {
    const [coursesType, setCoursesType] = useState<any[]>([]);
    const dataUser = useTypedSelector((state) => state.user);

    const fetchCourseType = async () => {
        try {
            const response = await nestApiInstance.get(`/course/type`);
            setCoursesType(response.data.data);
        } catch (error) {
            console.error('Error fetching course types:', error);
        }
    };

    useEffect(() => {
        fetchCourseType();
    }, []);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    return (
        <>
            <div className="px-3">
                {coursesType.length > 0 ? (
                    <div className="mx-auto">
                        {coursesType.map((courseType) => (
                            <div key={courseType._id} className="w-full mb-6">
                                <h2 className="font-bold text-2xl mb-4 pl-2 min-w-80 capitalize">
                                    {courseType.name}:
                                </h2>

                                <Row gutter={[24, 24]}>
                                    {data
                                        ?.filter(
                                            (course: any) =>
                                                course.typeCourse?._id ===
                                                courseType._id,
                                        )
                                        .map((course: any) => {
                                            const discountedPrice =
                                                course.price - course.discount;

                                            return (
                                                <Col
                                                    key={course._id}
                                                    xs={24}
                                                    sm={12}
                                                    md={8}
                                                    lg={6}
                                                    className="flex justify-center"
                                                >
                                                    <div
                                                        className="w-full h-full rounded-md hover:scale-105 transition ease-in-out delay-150 duration-300 p-3"
                                                        style={{
                                                            boxShadow:
                                                                'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                                        }}
                                                    >
                                                        <Link
                                                            href={
                                                                isUserCourse
                                                                    ? `/learning/${course._id}`
                                                                    : `/detailonlinecourse/${course._id}`
                                                            }
                                                        >
                                                            <Image
                                                                src={
                                                                    course?.thumbnail
                                                                }
                                                                width={0}
                                                                height={0}
                                                                sizes="100vw"
                                                                style={{
                                                                    width: '100%',
                                                                    height: 'auto',
                                                                }}
                                                                alt={
                                                                    course.title
                                                                }
                                                                className="mb-4 w-full min-h-[12.5rem] rounded-lg"
                                                            />
                                                            <div className="px-4 pt-2 pb-1 font-medium text-lg truncate">
                                                                {course.title}
                                                            </div>
                                                            <div className="px-4">
                                                                <div className="mt-2">
                                                                    <span className="py-[3px] text-xs px-[10px] bg-[#f0f8ff] rounded-full text-[#35509a]">
                                                                        #Khoá
                                                                        học
                                                                        online
                                                                    </span>
                                                                </div>
                                                                <div className="py-2">
                                                                    <span className="text-[#3cb46e] font-bold text-xl">
                                                                        {formatPrice(
                                                                            discountedPrice,
                                                                        )}
                                                                    </span>
                                                                    <span className="line-through ml-1">
                                                                        {formatPrice(
                                                                            course.price,
                                                                        )}
                                                                    </span>
                                                                    <span className="ml-[.5rem] rounded-full text-[#fff] bg-[#e43a45] font-bold p-1">
                                                                        -
                                                                        {Math.round(
                                                                            (course.discount /
                                                                                course.price) *
                                                                                100,
                                                                        )}
                                                                        %
                                                                    </span>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <ButtonPrimary
                                                                        label={
                                                                            isUserCourse
                                                                                ? 'Học tiếp'
                                                                                : 'Mua khoá học'
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            );
                                        })}
                                </Row>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Spin className="text-center" />
                )}
            </div>
        </>
    );
}

export default Courses;
