'use client';
import { LockOutlined,  } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import AuthService from '@/services/auth/AuthService';


function Login() {
    const [form] = Form.useForm();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onFinish = async (values: any) => {
        try {

            const response = await AuthService.resetPassword(values, token);
            if (response) {
                form.resetFields();
                router.push('/login');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    return (
        <>
            <div className="w-full pt-[2rem] pb-[3rem] ">
                <WapperItemCard stylecss="m-auto max-w-[31.25rem] mb-[0]">
                    <p className="mb-4 text-2xl font-bold">Đổi mật khẩu mới</p>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                {
                                    pattern:
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                    message:
                                        'Vui lòng có 1 chữ viết hoa, 1 chữ viết thường , có 1 chữ số và trên 8 kí tự',
                                }, 
                                {
                                    validator: (_, value) => 
                                        value && value.length > 50 
                                            ? Promise.reject(new Error('Mật khẩu không được vượt quá 50 ký tự'))
                                            : Promise.resolve(),
                                },
                            ]}
                            label="Mật khẩu mới"
                        >
                            <Input
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="nhập mật khẩu mới"
                            />
                        </Form.Item>
                        <ButtonPrimary
                            htmlType="submit"
                            size="large"
                            label="Đổi mật khẩu"
                            className="w-full  flex justify-center mb-3"
                        />
                    </Form>
                </WapperItemCard>
            </div>
        </>
    );
}

export default Login;
