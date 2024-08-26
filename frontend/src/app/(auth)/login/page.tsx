'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ForgotPass from '../forgotpass/page';
import AuthService from '@/services/auth/AuthService';

function Login() {
    const [form] = Form.useForm();
    const router = useRouter();
    const { login }: any = useContext(AuthContext);

    // handler login 
    const onFinish = async (values: any) => {
        try {
            let newdata = {
                email: values.email,
                password: values.password,
            };
            const response = await AuthService.login(newdata);
            if (response) {
                form.resetFields();
                setCookie('token', response.accessToken);
                setCookie('refreshToken', response.refreshToken);
                router.push('/');
                login({
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                });
              
            }
        } catch (error) {
            console.log('Error:', error);
        }
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
                        htmlType='button'
                        onClick={()=>{
                            router.push(`${process.env.baseURL}/auth/google/callback`);
                       
                        }}
                        className="w-full  mt-2 text-[#db4a39] hover:bg-black mb-3"
                    />

                    <Link
                        className="hover:text-black text-[#35509a]"
                        href="/register"
                    >
                        Bạn chưa là một thành viên? Đăng ký ngay!
                    </Link>
                    <ForgotPass />
                </WapperItemCard>
            </div>
        </>
    );
}

export default Login;
