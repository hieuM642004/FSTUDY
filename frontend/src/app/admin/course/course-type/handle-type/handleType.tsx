'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../../../../constant/api';

function HandleTypePage({ id }: { id?: string }) {
    const router = useRouter();
    const isEditForm = Boolean(id);
    const [courseType, setCourseType] = useState<any>();
    // const { userId } = useAuth();
    // const dataUser = useTypedSelector((state) => state.user);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên khóa học không được để trống'),
            description: Yup.string().required(
                'Tên khóa học không được để trống',
            ),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);

            try {
                if (isEditForm) {
                    await nestApiInstance.put(
                        `/course/type/update-course-type/${id}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    message.success('Khóa học đã được cập nhật!');
                } else {
                    await nestApiInstance.post(
                        '/course/type/create-course-type',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    message.success('Khóa học đã được thêm!');
                }
                router.push('/admin/course/course-type');
            } catch (error) {
                console.error('Error submitting course type:', error);
                message.error('Có lỗi xảy ra khi thêm hoặc cập nhật khóa học.');
            }
        },
    });

    useEffect(() => {
        const fetchType = async () => {
            try {
                if (isEditForm) {
                    const response = await nestApiInstance.get(
                        `/course/type/${id}`,
                    );
                    const Data = response.data.data;
                    setCourseType(Data);
                    formik.setValues({
                        name: Data.name,
                        description: Data.description,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchType();
    }, [id, isEditForm]);

    return (
        <div>
            <div>
                <Link href={'/admin/course/course-type'}>
                    <ButtonPrimary
                        size={'large'}
                        label={'type List'}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    />
                </Link>
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl uppercase mb-4 text-left">
                    {isEditForm ? 'Cập nhật Khóa học' : 'Thêm Khóa học'}
                </h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name">Tên khóa học:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Điền tên khóa học"
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
                        <label htmlFor="childTopics">Mô tả:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Điền mô tả khóa học"
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
                            label={
                                isEditForm
                                    ? 'Cập nhật Khóa học'
                                    : 'Thêm Khóa học'
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
