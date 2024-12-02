import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

function HandleComment({
    idBlog,
    socketRef,
    parentId,
    idCourse,
    idMySelf,
    editContent, 
    dataUser
}: String | any) {
    const [open, setOpen] = useState(false);
    
    const [form] = Form.useForm();
    
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = async (values: string | any) => {
        try {
            // update
            if (idMySelf) {
                form.resetFields();
                socketRef.current.emit('updateComment', {
                    _id: idMySelf,
                    content: values?.replies,
                    idBlog ,
                    idCourse
                });
                setOpen(false);
            } else {
                // insert
                const newData = {
                    idUser: dataUser?.id,
                    idBlog: idBlog || null,
                    idCourse: idCourse || null,
                    parentId: parentId || null,
                    content: values?.replies,
                };

                form.resetFields();
                socketRef.current.emit('newComment', newData);

                setOpen(false);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        if (idMySelf) {
            form.setFieldsValue({ replies: editContent });
        } else {
            form.setFieldsValue({ replies: '' });
        }
    }, [idMySelf, editContent]);
    return (
        <>
            <p
                className="hover:text-black text-[#35509a] cursor-pointer mt-2"
                onClick={showModal}
            >
                {dataUser?.id ? <> 
                    {idMySelf ? 'Chỉnh sửa' : 'Trả lời'}
                </> : <> </>}
             
            </p>
            <Modal
                open={open}
                title={idMySelf ? 'Chỉnh sửa bình luận' : 'Trả lời bình luận'}
                onCancel={handleCancel}
                footer={[]}
                width={500}
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        name="replies"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập nội dung',
                            },
                            {
                                validator: (_, value) => 
                                    value && value.length > 500 
                                        ? Promise.reject(new Error('Nội dung không được vượt quá 500 ký tự'))
                                        : Promise.resolve(),
                            },
                        ]}
                        label="nhập nội dung"
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            
                            placeholder="Nhập"
                        />
                    </Form.Item>
                    <ButtonPrimary
                        htmlType="submit"
                        size="large"
                        label="Xác nhận "
                        className="w-full  flex justify-center mb-3"
                    />
                </Form>
            </Modal>
        </>
    );
}

export default HandleComment;
