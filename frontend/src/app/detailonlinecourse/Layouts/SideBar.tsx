'use client';
import Image from 'next/image';
import {
    EditOutlined,
    BookOutlined,
    UsergroupAddOutlined,
    FieldTimeOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import RegisterNow from '../Modals/RegisterNow';
import FreeLessons from '../Modals/FreeLessons';

function SideBar() {
    const [isSticky, setSticky] = useState(false);
    const [RemovePostison, setRemovePostison] = useState(false);
    const handleScroll = () => {
        const targetElement: HTMLElement | any =
            document.querySelector('footer');
        const targetPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;

        if (window.scrollY > 400) {
            setSticky(true);
            if (window.scrollY >= targetPosition - 400) {
                setRemovePostison(true);
                console.log('Reached the target element!');
            } else {
                setRemovePostison(false);
            }
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div
                className={`MainSideBar   shadow-2xl  md:w-[21.25rem]  ${
                    isSticky
                        ? 'md:fixed transition duration-150 ease-in-out delay-150 top-[4rem] right-[5.625rem]'
                        : 'md:absolute  top-[123px] right-[5.625rem]'
                } ${
                    RemovePostison
                        ? 'md:absolute  transition duration-150 ease-in-out delay-150'
                        : ''
                }}`}
            >
                <div>
                    <div>
                        <Image
                            className="rounded-lg "
                            src="https://study4.com/media/courses/CourseSeries/files/2023/10/11/combo_intensive.webp"
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
                                    1.525.000đ
                                </div>
                                <div className="flex flex-col ml-1">
                                    <span className="line-through text-[#677788] text-[.86rem]">
                                        Giá gốc: 3.596.000đ
                                    </span>
                                    <span className="text-[#e43a45] text-[0.86rem] font-bold">
                                        Tiết kiệm: 2.071.000đ (-57%)
                                    </span>
                                </div>
                            </div>
                            <RegisterNow />
                            <FreeLessons />
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
        </>
    );
}

export default SideBar;
