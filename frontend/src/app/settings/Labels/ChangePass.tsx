'use client';
import { Form, Input } from 'antd';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

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

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
                    name="passwordold"
                    label="Mật khẩu cũ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="nhập mật khẩu cũ" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu mới"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="nhập mật khẩu hiện tại" />
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
                <div className="flex justify-end">
                    <ButtonPrimary
                        htmlType="submit"
                        size="small"
                        label="Đổi mật khẩu"
                        className="flex justify-center mb-3 "
                    />
                </div>
            </Form>
        </>
    );
}

export default ChangePass;
