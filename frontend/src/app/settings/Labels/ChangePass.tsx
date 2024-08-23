'use client';
import { Form, Input } from 'antd';
import { getCookie } from 'cookies-next';
import { useContext, useEffect, useState } from 'react';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import UserService from '@/services/user/UserService';
import { AuthContext } from '@/context/auth/AuthContext';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
    },
};

function ChangePass() {
    const [form] = Form.useForm();
    const { getProfileUser }: any = useContext(AuthContext);
    const [dataUser, setDataUser] = useState<any | object>();
    const [checkType, setCheckType] = useState<string | boolean>();

    useEffect(() => {
        const fetchDataUser = async () => {
            const data = await getProfileUser();
            setDataUser(data);
        };
        fetchDataUser();
        setCheckType(getCookie('typeLogin'));
    }, []);

    const onFinish = async (values: object | any) => {
        try {
            const idUser = dataUser?._id;
            const newData: object = {
                password: values?.confirm,
                fullname: dataUser?.fullname,
            };
            const res = await UserService.changePassword(newData, idUser);
            if (res) {
                form.resetFields();
            }
        } catch (error) {
            console.error('Error changepass user', error);
        }
    };
    return (
        <>
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
                    name="password"
                    label="Mật khẩu mới"
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
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="nhập mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Xác nhận mật khẩu mới"
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
                {checkType ? (
                    <> </>
                ) : (
                    <>
                        <div className="flex justify-end">
                            <ButtonPrimary
                                htmlType="submit"
                                size="small"
                                label="Đổi mật khẩu"
                                className="flex justify-center mb-3 "
                            />
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

export default ChangePass;
