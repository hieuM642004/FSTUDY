'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Link from 'next/link';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

function Login() {
    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <>
            <div className="w-full pt-[2rem] pb-[3rem] ">
                <WapperItemCard stylecss="m-auto max-w-[31.25rem] mb-[0]">
                    <p className="mb-4">
                        Đăng nhập ngay để bắt đầu trải nghiệm học tiếng Anh và
                        luyện thi TOEIC/IELTS hiệu quả cùng hàng trăm ngàn học
                        viên mỗi ngày.
                    </p>

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
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                            ]}
                            label="Mật khẩu"
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="nhập mật khẩu"
                            />
                        </Form.Item>
                        <ButtonPrimary
                            htmlType="submit"
                            size="large"
                            label="Đăng nhập"
                            className="w-full  flex justify-center mb-3"
                        />
                    </Form>
                    <ButtonOutline
                        size="large"
                        label="Đăng nhập với Facebook"
                        className="w-full  mt-2 text-[#35509a]  hover:bg-[#35509a] mb-3"
                    />
                    <ButtonOutline
                        size="large"
                        label="Đăng nhập với Google"
                        className="w-full  mt-2 text-[#db4a39] hover:bg-black mb-3"
                    />

                    <Link
                        className="hover:text-black text-[#35509a]"
                        href="/register"
                    >
                        Bạn chưa là một thành viên? Đăng ký ngay!
                    </Link>
                </WapperItemCard>
            </div>
        </>
    );
}

export default Login;
