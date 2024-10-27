import React, { useState, useEffect } from 'react';
import { StarFilled } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { nestApiInstance } from '../../../constant/api';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

function Courses({ data, isUserCourse }: { data?: any; isUserCourse?: boolean }) {
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
        <div className="px-3 pt-5 pb-2">
            {coursesType.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {coursesType.map((courseType: any) => (
                        <div key={courseType._id} className="w-full mb-6">
                            <h2 className="font-bold text-2xl mb-4 pl-2">
                               
                                {courseType.name}:
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {data
                                    ?.filter(
                                        (course: any) =>
                                            course.typeCourse?._id === courseType._id,
                                    )
                                    .map((course: any) => {
                                        const discountedPrice =
                                            course.price - course.discount;

                                        return (
                                            <div
                                                key={course._id}
                                                className="px-3 w-[390px] h-[351px] hover:scale-105 transition ease-in-out delay-150 duration-300"
                                            >
                                                <div
                                                    style={{
                                                        boxShadow: '0 4px #e4e6eb',
                                                    }}
                                                    className="mb-4 bg-white w-full min-h-[12.5rem] rounded-lg border-2 h-full"
                                                >
                                                    <Link
                                                        href={
                                                            isUserCourse
                                                                ? `/learning/${course._id}`
                                                                : `/detailonlinecourse/${course._id}`
                                                        }
                                                    >
                                                        <Image
                                                            src={course?.thumbnail}
                                                            width={0}
                                                            height={0}
                                                            sizes="100vw"
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                            }}
                                                            alt={course.title}
                                                        />
                                                        <div className="px-4 pt-2 pb-1 font-medium text-lg truncate">
                                                            {course.title}
                                                        </div>
                                                        <div className="px-4">
                                                            <div className="text-base">
                                                                <div className="inline-block">
                                                                    <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                                                    <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                                                    <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                                                    <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                                                    <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                                                </div>
                                                                <span>
                                                                    (1,260)
                                                                </span>
                                                                <span className="ml-[.25rem]">
                                                                    97,61 Học viên
                                                                </span>
                                                            </div>
                                                            <div className="mt-2">
                                                                <span className="py-[3px] text-xs px-[10px] bg-[#f0f8ff] rounded-full text-[#35509a]">
                                                                    #Khoá học online
                                                                </span>
                                                            </div>
                                                            <div className="py-2">
                                                                <span className="text-[#3cb46e] font-bold text-xl">
                                                                    {formatPrice(
                                                                        discountedPrice,
                                                                    )}
                                                                </span>
                                                                <span className="line-through ml-1">
                                                                    {formatPrice(course.price)}
                                                                </span>
                                                                <span className="ml-[.5rem] rounded-full text-[#fff] bg-[#e43a45] font-bold">
                                                                    -{Math.round(
                                                                        (course.discount /
                                                                            course.price) *
                                                                            100,
                                                                    )}
                                                                    %
                                                                </span>
                                                            </div>
                                                         <div className='mt-3'>   <ButtonPrimary label={isUserCourse ? 'Học tiếp' : 'Mua khóa học'}/></div>
                                                                
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Courses;
