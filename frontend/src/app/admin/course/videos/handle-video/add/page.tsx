'use client';
import React, { useState } from 'react';
import { Input, Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { nestApiInstance } from '../../../../../../constant/api'; // Cập nhật đường dẫn đúng cho nestApiInstance
import ButtonPrimary from '../../../../../../components/shared/ButtonPrimary/ButtonPrimary';

const AddVideoPage = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [fileList, setFileList] = useState([]);

    const handleFileChange = (info: any) => {
        setFileList(info.fileList); // Cập nhật trạng thái mỗi khi tệp được chọn
    };

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('content_type', 'video');

        if (fileList.length > 0) {
            // Thêm file vào FormData
            formData.append('videoUrl', fileList[0].originFileObj);
        } else {
            message.error('Hãy tải lên tệp video!');
            return;
        }

        try {
            await nestApiInstance.post('/course/video/create', formData, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                },
            });
            message.success('Video đã được thêm thành công!');
            router.push('/admin/course/videos');
        } catch (error) {
            console.error('Error:', error);
            message.error('Có lỗi xảy ra khi thêm video!');
        }
    };

    return (
        <div>
            <Link href={'/admin/course/videos'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Video List'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Thêm Video Mới</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4 "
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy điền tiêu đề video!',
                            },
                        ]}
                    >
                        <Input placeholder="Tiêu đề video" />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy điền mô tả video!',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Mô tả video" rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Tệp Video"
                        name="videoFile"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy tải lên tệp video!',
                            },
                        ]}
                    >
                        <Upload
                            accept="video/*"
                            beforeUpload={() => false} // Không tải lên tự động
                            fileList={fileList} // Liên kết với trạng thái file
                            onChange={handleFileChange} // Cập nhật khi file thay đổi
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>
                                Tải lên tệp video
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <ButtonPrimary
                            htmlType="submit"
                            size={'large'}
                            label={'Thêm Video'}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddVideoPage;
