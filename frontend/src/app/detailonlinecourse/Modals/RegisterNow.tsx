import {  Modal, Tabs, Form, Input } from 'antd';
import type { TabsProps } from 'antd';
import React, { useState } from 'react';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

const DisplayContentDirectTransfer = () => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} bắt buộc nhập!',
        types: {
            email: '${label} không hợp lệ!',
            // number: '${label} không phải dạng số!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
        pattern: {
            mismatch: '${label} không hợp lệ',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <>
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
                    size="large"
                    label="Đặt hàng ngay"
                    className="w-full uppercase flex justify-center  mb-3"
                />
            </Form>
            <div>
                <a href="" className='block mb-4 text-[#213261]'>Điều khoản và điều kiện giao dịch</a>
                <a href="" className='mb-4 text-[#213261]'>Hướng dẫn thanh toán</a>
            </div>
        </>
    );
};
const onChange = (key: string) => {
    console.log(key);
};
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Chuyển khoản trực tiếp',
        children: <DisplayContentDirectTransfer />,
    },
    // {
    //     key: '2',
    //     label: 'Tab 2',
    //     children: <p>Some contents.2.</p>,
    // },
    // {
    //     key: '3',
    //     label: 'Tab 3',
    //     children: 'Content of Tab Pane 3',
    // },
];
function RegisterNow() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
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
                title="Mua khoá học: Combo khoá học IELTS Intensive "
                open={isModalOpen}
                // onOk={handleOk}
                onCancel={handleCancel}
                
                footer={[]}
            >
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Modal>
            
        </>
    );
}

export default RegisterNow;
