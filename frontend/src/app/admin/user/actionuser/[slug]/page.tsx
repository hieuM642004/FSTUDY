'use client';
import { Form, Input, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { Typography } from 'antd';

import AuthService from '@/services/auth/AuthService';
import UserService from '@/services/user/UserService';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
    },
};

function PageAddEditUser({ params }: { params: { slug: string } }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);
    const [dataUser, setDataUser] = useState<string | any>(null);
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

    const onFinish = async (values: any) => {
        try {
            const idUser: string = params.slug;
            const PostData: any = new FormData();
            if (file) {
                PostData.append('avatar', file);
            }
            PostData.append('fullname', values.fullname);
            PostData.append('role', values.role);
            PostData.append('email', values.email);

            const res = await UserService.updateUser(
                PostData,
                idUser as string,
            );
            if (res) {
                messageApi.open({
                    type: 'success',
                    content: 'USER CẬP NHẬT THÀNH CÔNG',
                });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'USER CẬP NHẬT THẤT BẠI!',
                });
            }
        } catch (error) {
            console.log('Error:', error);
            messageApi.open({
                type: 'error',
                content: JSON.stringify(error),
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(0);
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            fullname: dataUser?.fullname,
            email: dataUser?.email,
            role: dataUser?.role,
            password: dataUser?.password,
        });
    }, [dataUser]);

    useEffect(() => {
        getByIdUser();
    }, []);

    const getByIdUser = async () => {
        const idUser: string = params.slug;
        const response = await AuthService.getByIdUser(idUser);
        if (response.statusCode === 200) {
            setDataUser(response.data);
        }
    };
    return (
        <>
            <div className="m-auto md:w-[50%] w-full">
                <Title level={3}>CHỈNH SỬA NGƯỜI DÙNG</Title>
                {dataUser?.typeLogin === 'basic' ? (
                    <></>
                ) : (
                    <>
                        <Alert
                            message="TÀI KHOẢN GOOGLE KHÔNG ĐƯỢC QUYỀN CHỈNH SỬA"
                            type="warning"
                            className=" my-3"
                        />
                    </>
                )}
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
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

                    <Form.Item name="password" label="Mật khẩu" hasFeedback>
                        <Input.Password placeholder="nhập mật khẩu" readOnly />
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
                        label="Ảnh đại diện"
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
                    </Form.Item>
                    {dataUser?.typeLogin === 'basic' ? (
                        <>
                            <ButtonPrimary
                                htmlType="submit"
                                size="large"
                                label="Xác nhận"
                                className="w-full  flex justify-center mb-3 "
                                loading={loadings[0]}
                                onClick={() => enterLoading(0)}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </Form>

                {contextHolder}
            </div>
        </>
    );
}

export default PageAddEditUser;
