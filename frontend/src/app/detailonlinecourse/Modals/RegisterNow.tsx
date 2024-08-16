import { Modal, Form, Input } from 'antd';
import React, { useState } from 'react';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

const RegisterNow = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} bắt buộc nhập!',
        types: {
            email: '${label} không hợp lệ!',
        },
        pattern: {
            mismatch: '${label} không hợp lệ',
        },
    };

    const onFinish = (values: any) => {
        console.log(values);
        setIsModalOpen(false); 
    };

    return (
        <>
            <ButtonPrimary
                onClick={showModal}
                size="large"
                label="Đăng kí học ngay"
                className="w-full uppercase"
            />
            <Modal
                title="Mua khoá học: Combo khoá học IELTS Intensive"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'name']}
                        label="Họ tên"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'address']}
                        label="Địa chỉ"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'phone']}
                        label="Số ĐT"
                        rules={[
                            {
                                required: true,
                                type: 'string',
                                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[{ type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <ButtonPrimary
                        htmlType="submit"
                        size="middle"
                        label="Đặt hàng ngay"
                        className="w-full uppercase flex justify-center  mb-3"
                    />
                </Form>
                <div>
                    <a href="" className="block mb-4 text-[#213261]">Điều khoản và điều kiện giao dịch</a>
                    <a href="" className="mb-4 text-[#213261]">Hướng dẫn thanh toán</a>
                </div>
            </Modal>
        </>
    );
};

export default RegisterNow;
