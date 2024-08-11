'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Select,
    Modal,
    Form,
    Input,
    Card,
    DatePicker,
    Button,
    Flex,
} from 'antd';
import {
    BarChartOutlined,
    ReadOutlined,
    ClockCircleOutlined,
    ScheduleOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import './Analytics.scss';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ListeningPage from './Listening/ListeningPage';

function Analytics() {
    const stats = [
        { date: '01/07/2024', correct: 100 },
        { date: '07/07/2024', correct: 60 },
        { date: '14/07/2024', correct: 83.33 },
    ];

    const nav = [
        { navItem: 'Listening' },
        { navItem: 'Reading' },
        { navItem: 'Writing' },
        { navItem: 'Speaking' },
    ];

    const [activeTab, setActiveTab] = useState('courses');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [navTab, setNavTab] = useState('Listening');
    const handleChangeNavPage = (pageName: string) => {
        setNavTab(pageName);
    };
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                console.log('Form values:', values);
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChangePage = (pageName: string) => {
        setActiveTab(pageName);
    };

    return (
        <>
            <div className="container-header">
                <div className="container-title">
                    <h2 className=" md:text-3xl sm:text-xl mx-auto font-bold flex items-center pt-2">
                        <BarChartOutlined className="mr-2" /> Thống kê kết quả
                        luyện thi
                    </h2>
                </div>
                <div className="container-tab">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`pb-2 ${
                                activeTab === 'all'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            IELTS Academic
                        </button>
                        <button
                            onClick={() => setActiveTab('short')}
                            className={`pb-2 ${
                                activeTab === 'short'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500'
                            }`}
                        >
                            TOEIC
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-body flex flex-col md:flex-row md:space-x-4 mt-4 gap-8">
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
                    <i className="pb-4 text-red-600">
                        Chú ý: Mặc định trang thống kê sẽ hiển thị các bài làm
                        trong khoảng thời gian 30 ngày gần nhất, để xem kết quả
                        trong khoảng thời gian xa hơn bạn chọn ở phần dropdown
                        dưới đây.
                    </i>
                    <p className="pt-2">
                        Lọc kết quả theo ngày (tính từ bài thi cuối):
                    </p>
                    <div className="pt-2">
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: 210, marginRight: 20 }}
                            onChange={handleChange}
                            options={[
                                {
                                    label: '--Chọn khoảng thời gian--',
                                },
                                {
                                    value: 'Tất cả',
                                    label: 'Tất cả',
                                },
                                {
                                    value: '3 ngày gần nhất',
                                    label: '3 ngày gần nhất',
                                },
                                {
                                    value: '7 ngày gần nhất',
                                    label: '7 ngày gần nhất',
                                },
                                { value: '30 ngày', label: '30 ngày' },
                                { value: '60 ngày', label: '60 ngày' },
                                { value: '90 ngày', label: '90 ngày' },
                                { value: '6 tháng', label: '6 tháng' },
                                { value: '1 năm', label: '1 năm' },
                            ]}
                        />
                        <ButtonPrimary
                            size={'middle'}
                            label={'Search'}
                            className="px-4 py-2 text-white rounded-lg font-bold w-fit"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 pt-4">
                        <Card className="text-center">
                            <div className="text-2xl mb-2">
                                <ReadOutlined />
                            </div>
                            <div className="text-gray-600 text-lg">
                                Số đề đã làm
                            </div>
                            <div className="text-xl font-bold">2</div>
                            <div className="text-gray-500 pt-2 text-xl">
                                đề thi
                            </div>
                        </Card>
                        <Card className="text-center">
                            <div className="text-xl mb-2">
                                <ClockCircleOutlined />
                            </div>
                            <div className="text-gray-600 text-lg">
                                Thời gian luyên thi
                            </div>
                            <div className="text-xl font-bold">1:00</div>
                            <div className="text-gray-500 pt-2 text-xl">
                                phút
                            </div>
                        </Card>
                        <Card className="text-center">
                            <div className="text-xl mb-2">
                                <ScheduleOutlined />
                            </div>
                            <div className="text-gray-600 text-lg">
                                Ngày dự thi
                            </div>
                            <div className="text-xl font-bold">27/07/2024</div>
                            <div className="text-gray-500 pt-2 text-xl">
                                <EditOutlined onClick={showModal} />
                            </div>
                            <Modal
                                title="Thay đổi điểm mục tiêu"
                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={[
                                    <ButtonPrimary
                                        size={'middle'}
                                        label={'Lưu'}
                                        className="px-4 py-2 text-white rounded-lg font-bold w-fit"
                                        key="submit"
                                        onClick={handleOk}
                                    />,
                                ]}
                            >
                                <Form
                                    form={form}
                                    layout="vertical"
                                    name="target_form"
                                >
                                    <Form.Item
                                        name="examDate"
                                        label="Ngày dự thi"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng chọn ngày dự thi!',
                                            },
                                        ]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        name="targetScore"
                                        label="Điểm mục tiêu"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập điểm mục tiêu!',
                                            },
                                        ]}
                                    >
                                        <Input type="number" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Link
                                            href={''}
                                            className="hover:text-blue-800"
                                        >
                                            Thay đổi môn thi
                                        </Link>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Card>
                        <Card className="text-center">
                            <div className="text-xl mb-2">
                                <CalendarOutlined />
                            </div>
                            <div className="text-gray-600 text-lg">
                                Tới kỳ thi
                            </div>
                            <div className="text-xl font-bold">0 </div>
                            <div className="text-gray-500 pt-2 text-xl">
                                ngày
                            </div>
                        </Card>
                        <Card className="text-center">
                            <div className="text-xl mb-2">
                                <CheckCircleOutlined />
                            </div>
                            <div className="text-gray-600 text-lg">
                                Điểm mục tiêu
                            </div>
                            <div className="text-xl font-bold">10</div>
                        </Card>
                    </div>
                    <div className="pt-8">
                        <Flex wrap="wrap" gap="small">
                            {nav.map((item, index) => (
                                <Button
                                    key={index}
                                    type="text"
                                    className={`rounded-xl bg-zinc-300 ${
                                        navTab === item.navItem
                                            ? 'text-black border-b-2 bg-zinc-300'
                                            : 'text-gray-500 '
                                    }`}
                                    onClick={() =>
                                        handleChangeNavPage(item.navItem)
                                    }
                                >
                                    {item.navItem}
                                </Button>
                            ))}
                        </Flex>
                    </div>

                    {navTab === 'Listening' ? (
                        <ListeningPage />
                    ) : (
                        <div className="pt-4 font-medium">
                            <h3>
                                Bạn chưa luyện tập bài thi Writing nào. Bắt đầu
                                làm bài ngay!
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Analytics;
