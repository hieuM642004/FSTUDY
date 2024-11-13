'use client';
import React from 'react';
import { Form, Input } from 'antd';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

import PurchaseService from '@/services/purchase/PurchaseService';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Link from 'next/link';
type FieldType = {
    activationCode?: string;
    phoneNumber?: string;
};

const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = async (values: FieldType) => {
        console.log();
        const key = values.activationCode;
        try {
            const response = await PurchaseService.activeCourse({ key });
            if (response) {
                messageApi.open({
                    type: 'success',
                    content: 'KÍCH HOẠT THÀNH CÔNG',
                });
                form.resetFields();
                router.push('/courses-online');
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'KÍCH HOẠT KHÓA HỌC THẤT BẠI',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            {contextHolder}
            <Form
                form={form}
                name="activation"
                layout="vertical"
                style={{
                    width: 516,
                    height: 400,
                    padding: 24,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h2 className="text-2xl font-bold mb-6">Kích hoạt khoá học</h2>

                <Form.Item<FieldType>
                    label="Mã kích hoạt"
                    name="activationCode"
                    rules={[{ required: true, message: 'Nhập mã kích hoạt' }]}
                >
                    <Input placeholder="Nhập mã kích hoạt" className="h-10" />
                </Form.Item>

                <Form.Item>
                    <ButtonPrimary
                        size="large"
                        label={'Kích hoạt '}
                        className="text-white px-4 py-2 rounded-lg w-full h-10 mt-4"
                        htmlType="submit"
                    />
                </Form.Item>

                <h1 className="text-black mt-4 font-medium">
                    Liên hệ hotline 096-369-5525 nếu bạn gặp vấn đề về kích hoạt
                    khóa học.
                </h1>
                <div className="mt-4">
                    <Link
                        href="/buying-guide"
                        className="text-blue-800 hover:text-blue-900"
                    >
                        Hướng dẫn mua khóa học
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default App;
