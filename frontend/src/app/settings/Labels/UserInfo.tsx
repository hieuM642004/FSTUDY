'use client';
import { Form, Input, Upload, DatePicker } from 'antd';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
function UserInfo() {
    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <>
            <p className="mb-4 ">
                Email: loikimst2003@gmail.com (STUDY4 không hỗ trợ đổi email.
                Vui lòng liên hệ chúng tôi nếu bạn đã mua khóa học và muốn đổi
                account.)
            </p>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="upload"
                    label="Ảnh đại diện"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra=""
                    className="rounded-full"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>
                            Click to upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="firstlastname" label="Họ và Tên">
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
                <Form.Item name="dirthday" label="Ngày sinh ">
                    <DatePicker />
                </Form.Item>
                <div className="flex justify-end">
                    <ButtonPrimary
                        htmlType="submit"
                        size="small"
                        label="Cập nhật"
                        className="flex justify-center mb-3"
                    />
                </div>
            </Form>
        </>
    );
}

export default UserInfo;
