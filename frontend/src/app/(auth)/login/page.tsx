'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ForgotPass from '../forgotpass/page';
import Message from '@/components/shared/Message/Message';
import AuthService from '@/services/auth/AuthService';
import {jwtDecode} from 'jwt-decode'; 
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUserId, fetchUserData } from '@/lib/redux/features/user/userSlice';
import { useState } from 'react';

function Login() {
    const [form] = Form.useForm();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            const newdata = {
                email: values.email,
                password: values.password,
            };

           
            const response = await AuthService.login(newdata);

            if (response) {
                
                form.resetFields();

               
                setCookie('token', response?.accessToken);
                setCookie('refreshToken', response?.refreshToken);

              
                const decoded: any = jwtDecode(response?.accessToken || '');
                setCookie('idU', decoded.id);
                setCookie('name', decoded.username);
                const idUser: string = decoded.id;

                
                dispatch(setUserId(idUser));

               
                await dispatch(fetchUserData()).unwrap();

              
                router.push('/home');
            }else{
                messageApi.open({
                    type: 'error',
                    content: 'Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu.',
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu.',
            });
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
                                {
                                    validator: (_, value) => 
                                        value && value.length > 50 
                                            ? Promise.reject(new Error('Email không được vượt quá 50 ký tự'))
                                            : Promise.resolve(),
                                },
                            ]}
                            label="Email"
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Nhập email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                {
                                    validator: (_, value) => 
                                        value && value.length > 50 
                                            ? Promise.reject(new Error('Mật khẩu không được vượt quá 50 ký tự'))
                                            : Promise.resolve(),
                                },
                            ]}
                            label="Mật khẩu"
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>
                        <ButtonPrimary
                            htmlType="submit"
                            size="large"
                            label="Đăng nhập"
                            className="w-full flex justify-center mb-3"
                        />
                    </Form>
             
                    <ButtonOutline
                        size="large"
                        label="Đăng nhập với Google"
                        htmlType="button"
                        onClick={() => {
                            router.push(`${process.env.baseURL}/auth/google/callback`);
                        }}
                        className="w-full mt-2 text-[#db4a39] hover:bg-[#db4a39] mb-3"
                    />

                    <Link className="hover:text-black text-[#35509a]" href="/register">
                        Bạn chưa là một thành viên? Đăng ký ngay!
                    </Link>
                    <ForgotPass />
                </WapperItemCard>
                {contextHolder}
            </div>
        </>
    );
}

export default Login;
