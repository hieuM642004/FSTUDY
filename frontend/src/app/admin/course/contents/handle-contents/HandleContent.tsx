'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select, Space, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../../../../constant/api';

function HandleTypePage({ id }: { id?: string }) {
    const router = useRouter();
    const isEditForm = Boolean(id);
    const [contents, setContents] = useState();

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required(
                'Tên nội dung khóa học không được để trống',
            ),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            // const formContent = new FormData();
            formData.append('title', values.title);

            try {
                if (isEditForm) {
                    await nestApiInstance.put(`/course/content/`, formData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    message.success('Khóa học đã được cập nhật!');
                } else {
                    await nestApiInstance.post(
                        '/course/content/create',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    message.success('Khóa học đã được thêm!');
                }
                router.push('/admin/course/contents');
            } catch (error) {
                console.error('Error submitting course type:', error);
                message.error('Có lỗi xảy ra khi thêm hoặc cập nhật khóa học.');
            }
        },
    });

    useEffect(() => {
        const fetchContents = async () => {
            try {
                if (isEditForm) {
                    const response = await nestApiInstance.get(
                        `/course/content/${id}`,
                    );
                    const Data = response.data;
                    console.log(Data);

                    setContents(Data);
                    formik.setValues({
                        title: Data.title,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchContents();
    }, [id, isEditForm]);

    return (
        <div>
            <Link href={'/admin/course/contents'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Contents List'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl uppercase mb-4 text-left">
                    {isEditForm
                        ? 'Cập nhật Nội dung khóa học'
                        : 'Thêm Nội dung khóa học'}
                </h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title">Tên Nội dung khóa học:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Điền tên Nội dung khóa học"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        {formik.errors.title && (
                            <div className="text-red-500">
                                {formik.errors.title}
                            </div>
                        )}
                    </div>

                    <div className="pt-4 text-left">
                        <ButtonPrimary
                            size={'large'}
                            label={
                                isEditForm ? 'Cập nhật Content' : 'Thêm Content'
                            }
                            htmlType="submit"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HandleTypePage;
