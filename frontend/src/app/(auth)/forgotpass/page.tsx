import React, { useState } from 'react';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';


import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import AuthService from '@/services/auth/AuthService';

function ForgotPass() {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
  
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 3000);
    };
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const onFinish = async (values: string) => {
        try {
           
            const response = await AuthService.forgotPassword(values);       
            form.resetFields();
            if (response !== 400) {
               
            } else {
               
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <p
                className="hover:text-black text-[#35509a] cursor-pointer mt-2"
                onClick={showModal}
            >
                Bạn đã quên mật khẩu
            </p>
            <Modal
                open={open}
                title="Quên mật khẩu"
                onCancel={handleCancel}
                footer={[]}
                width={500}
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên email',
                            },
                            {
                                type: 'email',
                                message: 'email không hợp lệ',
                            },
                        ]}
                        label="Email"
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="nhập email"
                        />
                    </Form.Item>

                    <ButtonPrimary
                        htmlType="submit"
                        size="large"
                        label="Xác nhận quên mật khẩu"
                        className="w-full  flex justify-center mb-3"
                        loading={loadings[0]} onClick={() => enterLoading(0)}
                    />
                </Form>
            </Modal>
        </>
    );
}

export default ForgotPass;
