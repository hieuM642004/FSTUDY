'use client';
import { Form, Input, Select } from 'antd';
import Link from 'next/link';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import AuthService from '@/services/auth/AuthService';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
    },
};

function Register() {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
                let newdata = {
                    email: values.email,
                    password: values.password,
                    fullname: values.fullname
                }
                const response = await AuthService.register(newdata);
                if(response){
                    form.resetFields();
                   
                }
        } catch (error) {
        
            console.log('Error:', error);
        }

    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <div className="w-full pt-[2rem] pb-[3rem] ">
                <WapperItemCard stylecss="m-auto max-w-[31.25rem] mb-[0]">
                    <p className="mb-4">
                        Đăng ký ngay để bắt đầu trải nghiệm học tiếng Anh và
                        luyện thi TOEIC/IELTS hiệu quả cùng hàng trăm ngàn học
                        viên mỗi ngày.
                    </p>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '84',
                        }}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                        layout="vertical"
                    >
                          <Form.Item
                            name="fullname"
                            label="Họ và Tên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng  Họ và tên!',
                                },
                            ]}
                        >
                            <Input placeholder="nhập Họ và tên" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Email!',
                                },
                            ]}
                        >
                            <Input placeholder="nhập email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                {
                                    pattern : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ ,
                                    message: 'Vui lòng có 1 chữ viết hoa, 1 chữ viết thường , có 1 chữ số và trên 8 kí tự',
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Xác nhận mật khẩu"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'Mật khẩu mới bạn nhập không khớp!',
                                            ),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="nhập xác nhận mật khẩu" />
                        </Form.Item>

                        {/* <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    type: 'string',
                                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                    message: 'Số điện thoại không hợp lệ!',
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                                placeholder="nhập số điện thoại"
                            />
                        </Form.Item> */}

                        <ButtonPrimary
                            htmlType="submit"
                            size="large"
                            label="Đăng ký"
                            className="w-full  flex justify-center mb-3 "
                        />
                    </Form>
                    <ButtonOutline
                        size="large"
                        label="Đăng ký với Facebook"
                        className="w-full  mt-2 text-[#35509a]  hover:bg-[#35509a] mb-3"
                    />
                    <ButtonOutline
                        size="large"
                        label="Đăng ký với Google"
                        className="w-full  mt-2 text-[#db4a39] hover:bg-black mb-3"
                    />
                    <p className="mb-3">
                        Bằng cách đăng ký, bạn đồng ý với{' '}
                        <Link
                            href=""
                            className="hover:text-black text-[#35509a]"
                        >
                            {' '}
                            điều khoản sử dụng
                        </Link>{' '}
                        và{' '}
                        <Link
                            href=""
                            className="hover:text-black text-[#35509a]"
                        >
                            {' '}
                            điều khoản bảo mật{' '}
                        </Link>{' '}
                        .
                    </p>

                    <Link
                        className="hover:text-black text-[#35509a]"
                        href="/login"
                    >
                        Đã có tài khoản? Đăng nhập ngay!
                    </Link>
                </WapperItemCard>
            </div>
        </>
    );
}

export default Register;
