'use client';
import { Form, Input, Upload, DatePicker } from 'antd';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { getCookie } from 'cookies-next';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { AuthContext } from '@/context/auth/AuthContext';
import UserService from '@/services/user/UserService';

function UserInfo() {
    const { getProfileUser }: any = useContext(AuthContext);
    const [dataUser, setDataUser] = useState<any | object>();
    const [form] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);
    const [checkType, setCheckType] = useState<string | boolean>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    useEffect(() => {
        const fetchDataUser = async () => {
            const data = await getProfileUser();
            setDataUser(data);
            form.setFieldsValue({
                fullname: data?.fullname,
                phone: data?.phone,
                birthday: data?.birthday ? moment(data.birthday) : null,
                avatar: data?.upload,
            });
        };
        fetchDataUser();
        setCheckType(getCookie('typeLogin'));
    }, [form]);

    const onFinish = async (values: any) => {
        const iduser = dataUser?._id;
        const infoDataUser: any = new FormData();
        infoDataUser.append('fullname', values.fullname);
        infoDataUser.append('phone', values.phone);
        if (values.birthday) {
            infoDataUser.append('birthday', values.birthday);
        }
        if (file) {
            infoDataUser.append('avatar', file);
        }
        try {
            const res = await UserService.updateUser(infoDataUser, iduser);
            if (res) {
                console.log('User updated successfully', res);
                await getProfileUser();
            }
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    return (
        <>
            <p className="mb-4 ">
                Email: {dataUser?.email} (STUDY4 không hỗ trợ đổi email. Vui
                lòng liên hệ chúng tôi nếu bạn đã mua khóa học và muốn đổi
                account.)
            </p>
            <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item label="File">
                    <input
                        id="file"
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                    />
                </Form.Item>
                <Form.Item name="fullname" label="Họ và Tên">
                    <Input placeholder="nhập Họ và Tên của bạn" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            type: 'string',
                            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                            message: 'Số điện thoại không hợp lệ!',
                        },
                    ]}
                >
                    <Input
                        style={{ width: '100%' }}
                        placeholder="nhập số điện thoại"
                    />
                </Form.Item>
                <Form.Item name="birthday" label="Ngày sinh ">
                    <DatePicker />
                </Form.Item>
                {checkType ? (
                    <></>
                ) : (
                    <>
                        <div className="flex justify-end">
                            <ButtonPrimary
                                htmlType="submit"
                                size="small"
                                label="Cập nhật"
                                className="flex justify-center mb-3"
                            />
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

export default UserInfo;
