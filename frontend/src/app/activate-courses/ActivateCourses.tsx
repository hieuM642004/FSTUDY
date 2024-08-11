'use client';
import React from 'react';
import { Form, Input } from 'antd';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

type FieldType = {
    activationCode?: string;
    phoneNumber?: string;
};

const onFinish = (values: FieldType) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            backgroundColor: '#f0f2f5',
        }}
    >
        <Form
            name="activation"
            layout="vertical"
            style={{
                width: 516,
                height: 458,
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

            <Form.Item<FieldType>
                label="Số điện thoại mua hàng"
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        message: 'Nhập số điện thoại trong phiếu kích hoạt',
                    },
                    {
                        pattern: /^[0-9]{10}$/,
                        message: 'Số điện thoại phải có đúng 10 chữ số',
                    },
                ]}
            >
                <Input
                    placeholder="Nhập số điện thoại trong phiếu kích hoạt"
                    className="h-10"
                />
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
                <a href="#" className="text-blue-800 hover:text-blue-900">
                    Hướng dẫn mua hàng
                </a>
                <br />
                <a href="#" className="text-blue-800 hover:text-blue-900">
                    Kiểm tra tài khoản đã kích hoạt khóa học
                </a>
            </div>
        </Form>
    </div>
);

export default App;
