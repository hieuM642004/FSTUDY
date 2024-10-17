'use client';
import { Form, Input, DatePicker, message } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getCookie } from 'cookies-next';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUserData } from '@/lib/redux/features/user/userSlice';
import UserService from '@/services/user/UserService';
import { useTypedSelector } from '@/hooks/useTypedSelector';

function UserInfo() {
    const dispatch = useAppDispatch();
    const dataUser = useTypedSelector((state) => state.user);
    const [form] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);
    const [checkType, setCheckType] = useState<string | boolean>();
    const [messageApi, contextHolder] = message.useMessage();
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
        }, 2000);
      };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        dispatch(fetchUserData());
        setCheckType(getCookie('typeLogin'));
    }, [dispatch]);

    useEffect(() => {
        console.log('User data updated:', dataUser);
        form.setFieldsValue({
            fullname: dataUser?.name,
            phone: dataUser?.phone ? dataUser?.phone : '',
            birthday: dataUser?.birthday ? moment(dataUser.birthday) : '',
            avatar: dataUser?.avatar,
        });
    }, [dataUser, form]);

    const onFinish = async (values: any) => {
        const iduser = dataUser?.id;
        const infoDataUser: any = new FormData();
        infoDataUser.append('fullname', values.fullname);
        infoDataUser.append('phone', values.phone);
        // API bắt buộc birthday không đc cập nhật null cho lần sau 
        if (values.birthday) {
            infoDataUser.append('birthday', values.birthday);
        }
        if (file) {
            infoDataUser.append('avatar', file);
        }
        try {
            const res = await UserService.updateUser(
                infoDataUser,
                iduser as string,
            );
            if (res) {
                console.log('User updated successfully', res);
                await dispatch(fetchUserData());
                setFile(null)
                messageApi.open({
                    type: 'success',
                    content: 'Cập nhật tài khoản thành công.',
                });
            }
        } catch (error) {
            console.error('Error updating user', error);
            messageApi.open({
                type: 'error',
                content: 'Cập nhật tài khoản thất bại.',
            });
        }
    };

    return (
        <>
            {contextHolder}
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
                                loading={loadings[0]} onClick={() => enterLoading(0)}
                            />
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

export default UserInfo;
