'use client';
import Link from 'next/link';
import { Col, Row } from 'antd';
import type { TabsProps } from 'antd';
import { FacebookOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React, { useState } from 'react';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import Tab from '@/components/client/Tabs/Tabs';
import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import JobsToday from './Labels/JobsToday';
import JobWeek from './Labels/JobWeek';
import TodoList from './Labels/TodoList';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Modals from './Modals/Modal';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Hôm nay cần làm ',
        children: <JobsToday />,
    },
    {
        key: '2',
        label: 'Theo tuần',
        children: <JobWeek />,
    },
    {
        key: '3',
        label: 'Chỉnh sửa/Thêm mới',
        children: <TodoList />,
    },
];
function StudyPlan() {
    // modal book
    const [openBook, setopenBook] = useState(false);
    const [book, setidbook] = useState<string>();

    const showModal = (id?: string) => {
        if (id) {
            setidbook(id);
            setopenBook(true);
        } else {
            setidbook(undefined);
            setopenBook(true);
        }
    };

    const handleCancel = () => {
        setopenBook(false);
    };
    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <>
            {/* banner  */}
            <div className="bg-gradient-to-r from-[#fffcdc] via-[#d9a7c7] to-[#d9a7c7] py-4 h-50 ">
                {/* container */}
                <div className="px-3 pb-4 pt-8">
                    <div className="mb-4">
                        <h3 className="text-3xl font-bold inline-block">
                            <CalendarOutlined />
                            Lịch học
                        </h3>
                        <ButtonPrimary
                            htmlType="button"
                            size="middle"
                            label="Tạo lịch học"
                            className="mb-3 ml-3"
                            iconbtn={'+'}
                            onClick={() => {
                                showModal();
                            }}
                        />
                        {/* modal book */}
                        <Modals handleCancel={handleCancel} open={openBook}>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                <h3 className="text-3xl font-bold mb-4">
                                    {book
                                        ? 'Chỉnh sửa lịch học'
                                        : ' Tạo lịch học'}
                                </h3>
                                <Form.Item
                                    name="titlebook"
                                    label="Tên / tiêu đề"
                                >
                                    <Input placeholder="" />
                                </Form.Item>

                                <Form.Item label="Mô tả" name="description">
                                    <Input.TextArea />
                                </Form.Item>
                                <div className="flex justify-end">
                                    <ButtonPrimary
                                        htmlType="submit"
                                        size="small"
                                        label="Lưu"
                                        className="flex justify-center mb-3"
                                    />
                                </div>
                            </Form>
                        </Modals>
                    </div>
                    {/* book  */}
                    <div>
                        <ul className="flex">
                            <li className="bg-[#e8f2ff] py-1 px-4 rounded-full text-[#35509a] font-bold">
                                <Link href="">Lịch học của tôi</Link>
                            </li>
                            <li className="ml-3 bg-[#f8f9fa] py-1 px-4 rounded-full">
                                <Link href="">Khám phá</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* container  */}
            <Row>
                <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                    <WapperItemCard stylecss="lg:w-full m-[14px]  overflow-auto">
                        <div className="flex items-center justify-between ">
                            <h3 className="text-xl font-bold">
                                {' '}
                                tên task{' '}
                                <span
                                    onClick={() => {
                                        showModal('a123123');
                                    }}
                                >
                                    <EditOutlined className="cursor-pointer" />
                                </span>
                            </h3>
                            <div className="bg-[#3cb46e] text-white font-semibold p-1 rounded-lg">
                                Active
                            </div>
                        </div>
                        <Tab items={items} />
                    </WapperItemCard>
                </Col>
                {/* side bar */}
                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                    <div className="mx-[14px] mt-[14px] mb-10 px-4">
                        <Link href="" className="mb-3 block">
                            <Image
                                src="https://study4.com/media/home/HomeBanner/files/2022/07/06/Learning_English_with.jpg"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                alt="Picture of the author"
                                className=""
                            />
                        </Link>
                        <Link href="" className="mb-3 block">
                            <Image
                                src="https://study4.com/media/home/HomeBanner/files/2021/12/01/download_extension.png"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                                alt="Picture of the author"
                                className=""
                            />
                        </Link>
                        {/* list group FB */}
                        <div>
                            <div className="text-center border mb-3">
                                <Image
                                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/225605814_137648018518630_1539189158239507292_n.png?stp=dst-png_s370x247&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeFszJH9ggzus_v2V_9j7D2ULTlQJT_4jnYtOVAlP_iOduYseFkcXbLtiCMMcbcS80tbS97zDf04juzM1WekhLSa&_nc_ohc=KfGV9WukLlgQ7kNvgFtSfF_&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYBUeSJ5ABI62H6dqx-_w5zIdm0YrPPb7LOwHvsD1LY55Q&oe=669536AA"
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"
                                    className=""
                                />
                                <p className="mx-3 mt-2 mb-1 font-bold text-sm">
                                    Chia sẻ kinh nghiệm và tài liệu tự học IELTS
                                    8.0+
                                </p>
                                <p className=" text-xs text-gray-500 mb-2">
                                    Facebook group · 257,154 members
                                </p>
                                <div className="flex items-center justify-center">
                                    <Link
                                        target="_blank"
                                        href="https://www.facebook.com/groups/study4.ielts/?ref=web_social_plugin"
                                        className="bg-[#4267b2]  block w-[85%]  rounded text-white font-bold mb-2"
                                    >
                                        {' '}
                                        <FacebookOutlined /> Visit group
                                    </Link>
                                </div>
                            </div>
                            <div className="text-center border mb-3">
                                <Image
                                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/225605814_137648018518630_1539189158239507292_n.png?stp=dst-png_s370x247&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeFszJH9ggzus_v2V_9j7D2ULTlQJT_4jnYtOVAlP_iOduYseFkcXbLtiCMMcbcS80tbS97zDf04juzM1WekhLSa&_nc_ohc=KfGV9WukLlgQ7kNvgFtSfF_&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYBUeSJ5ABI62H6dqx-_w5zIdm0YrPPb7LOwHvsD1LY55Q&oe=669536AA"
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"
                                    className=""
                                />
                                <p className="mx-3 mt-2 mb-1 font-bold text-sm">
                                    Chia sẻ kinh nghiệm tự học tiếng Anh cho
                                    người đi làm
                                </p>
                                <p className=" text-xs text-gray-500 mb-2">
                                    Facebook group · 30,424 members
                                </p>
                                <div className="flex items-center justify-center">
                                    <Link
                                        target="_blank"
                                        href="https://www.facebook.com/groups/dilam.hoctienganh/?ref=web_social_plugin"
                                        className="bg-[#4267b2]  block w-[85%]  rounded text-white font-bold mb-2"
                                    >
                                        {' '}
                                        <FacebookOutlined /> Visit group
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default StudyPlan;
