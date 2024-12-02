'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select, Space, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../../../constant/api';

function HandleTopicPage({ id }: { id?: string }) {
    const router = useRouter();
    const isEditForm = Boolean(id);
    const [topic, setTopic] = useState();

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên nội Topic không được để trống'),
            description: Yup.string().required('Mô tả không được để trống'),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            // const formContent = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);

            try {
                await nestApiInstance.post('/blog/create-topic', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                message.success('Topic đã được thêm!');

                router.push('/admin/topics');
            } catch (error) {
                message.error('Có lỗi xảy ra khi thêm Topic!');
            }
        },
    });

    return (
        <div>
            <Link href={'/admin/topics'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Topics List'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl uppercase mb-4 text-left">Thêm Topic</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name">Tên Topic:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Điền tên Topic"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name && (
                            <div className="text-red-500">
                                {formik.errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description">Mô tả Topic:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Mô tả Topic"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                        {formik.errors.description && (
                            <div className="text-red-500">
                                {formik.errors.description}
                            </div>
                        )}
                    </div>

                    <div className="pt-4 text-left">
                        <ButtonPrimary
                            size={'large'}
                            label={'Thêm Topic'}
                            htmlType="submit"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HandleTopicPage;
