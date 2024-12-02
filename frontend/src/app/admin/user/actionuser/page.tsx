'use client';
import { Form, Input, message, Select, Typography } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import UserService from '@/services/user/UserService';

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
    },
};

function PageAddUser() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);
    const [fileMess, setFileMess] = useState<string | null>(null);
   

    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

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
    const onFinish = async (values: any) => {
        try {
            enterLoading(0);
            const PostData: any = new FormData();
            if (file) {
                PostData.append('avatar', file);
                setFileMess('');
            } else {
                setFileMess('Vui lòng chọn ảnh đại diện');
                return;
            }
            PostData.append('fullname', values.fullname);
            PostData.append('password', values.password);
            PostData.append('role', values.role);
            PostData.append('email', values.email);

            const response = await UserService.createUser(PostData);
            console.log('check response', response);

            if (response) {
                messageApi.open({
                    type: 'success',
                    content: 'USER THÊM THÀNH CÔNG!',
                });
                form.resetFields();
                setFile(null);
                setTimeout(()=>{
                    router.push('/admin/user');
                },2000)
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'USER THÊM THẤT BẠI!',
                });
            }
        } catch (error) {
            console.log('Error:', error);

            messageApi.open({
                type: 'error',
                content: 'USER THÊM THẤT BẠI!',
            });
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(0);
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="m-auto md:w-[50%] w-full">
            <Title level={3}>THÊM NGƯỜI DÙNG</Title>
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
                className="shadow-lg p-3 rounded border"
            >
                <Form.Item
                    name="fullname"
                    label="Họ và Tên"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập  Họ và tên!',
                        },
                        {
                            validator: (_, value) => 
                                value && value.length > 50 
                                    ? Promise.reject(new Error('Họ và tên không được vượt quá 50 ký tự'))
                                    : Promise.resolve(),
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
                    hasFeedback
                >
                    <Input.Password placeholder="nhập mật khẩu" />
                </Form.Item>

                <Form.Item
                    name="role"
                    label="Chọn quyền"
                    rules={[
                        { required: true, message: 'Vui lòng chọn quyền!' },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn quyền"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            { value: 'admin', label: 'admin' },
                            { value: 'user', label: 'user' },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label={<><span className="text-red-500">* </span> Ảnh đại diện</>}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn ảnh',
                        },
                    ]}
                >
                    <input
                        id="file"
                        type="file"
                        name="file"
                        className="block"
                        onChange={handleFileChange}
                    />
                    <span className="text-red-500">{fileMess}</span>
                </Form.Item>
                <ButtonPrimary
                    htmlType="submit"
                    size="large"
                    label="Xác nhận"
                    className="w-full  flex justify-center mb-3 "
                    loading={loadings[0]}
                />
            </Form>

            {contextHolder}
        </div>
    );
}

export default PageAddUser;
