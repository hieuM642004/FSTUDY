'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select, Checkbox, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../../../../constant/api';

const { Option } = Select;

function HandleLessonsPage({ id }: { id?: string }) {
    const router = useRouter();
    const isEditForm = Boolean(id); // Kiểm tra xem có phải chế độ chỉnh sửa không
    const [loading, setLoading] = useState(false);
    const [contents, setContents] = useState<any[]>([]); // Chứa danh sách content

    // Formik schema
    const formik = useFormik({
        initialValues: {
            title: '',
            lesson: 1,
            isFree: false,
            content: '', // Lưu _id của content
        },
        validationSchema: Yup.object({
            title: Yup.string().required(
                'Tên nội dung bài học không được để trống',
            ),
            lesson: Yup.number()
                .required('Số bài học không được để trống')
                .min(1, 'Số bài học phải lớn hơn 0'),
            content: Yup.string().required('Bạn cần chọn một content'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('lesson', values.lesson.toString());
            formData.append('isFree', values.isFree ? 'true' : 'false');
            formData.append('content', values.content);

            setLoading(true);
            try {
                if (isEditForm) {
                    await nestApiInstance.put(
                        `/course/lesson/${id}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    message.success('Lessons đã được cập nhật!');
                } else {
                    await nestApiInstance.post(
                        '/course/lesson/create',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    );
                    message.success('Lessons đã được thêm!');
                }
                router.push('/admin/course/lessons');
            } catch (error) {
                console.error('Error submitting Lessons:', error);
                message.error('Có lỗi xảy ra khi thêm hoặc cập nhật Lessons.');
            } finally {
                setLoading(false);
            }
        },
    });

    // Fetch nội dung bài học và content từ API
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await nestApiInstance.get(`/course/content/`);
                setContents(response.data); // Lưu dữ liệu content từ API
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };

        const fetchLesson = async () => {
            if (isEditForm) {
                try {
                    const response = await nestApiInstance.get(
                        `/course/lesson/${id}`,
                    );
                    const data = response.data;
                    console.log(data);

                    formik.setValues({
                        title: data.title || '',
                        lesson: data.lesson || 1,
                        isFree: data.isFree || false,
                        content: data.content[0].title || '',
                    });
                } catch (error) {
                    console.error('Error fetching lesson:', error);
                }
            }
        };

        fetchContents();
        fetchLesson();
    }, [id, isEditForm]);

    return (
        <div>
            <Link href={'/admin/course/lessons'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Lessons List'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl uppercase mb-4 text-left">
                    {isEditForm ? 'Cập nhật Lessons' : 'Thêm Lessons'}
                </h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title">Tên Nội dung khóa học:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            placeholder="Điền tên Nội dung khóa học"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.title && (
                            <div className="text-red-500">
                                {formik.errors.title}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content">Chọn Content:</label>
                        <Select
                            id="content"
                            name="content"
                            value={formik.values.content}
                            onChange={(value) =>
                                formik.setFieldValue('content', value)
                            }
                            className="w-full"
                            placeholder="Chọn content"
                        >
                            {contents.map((content) => (
                                <Option key={content._id} value={content._id}>
                                    {content.title || 'No Title'}
                                </Option>
                            ))}
                        </Select>
                        {formik.errors.content && (
                            <div className="text-red-500">
                                {formik.errors.content}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lesson">Số bài học:</label>
                        <input
                            type="number"
                            id="lesson"
                            name="lesson"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            placeholder="Điền số bài học"
                            value={formik.values.lesson}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.lesson && (
                            <div className="text-red-500">
                                {formik.errors.lesson}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <Checkbox
                            id="isFree"
                            name="isFree"
                            checked={formik.values.isFree}
                            onChange={formik.handleChange}
                        >
                            Miễn phí
                        </Checkbox>
                    </div>

                    <div className="pt-4 text-left">
                        <ButtonPrimary
                            size={'large'}
                            label={
                                isEditForm ? 'Cập nhật Lessons' : 'Thêm Lessons'
                            }
                            htmlType="submit"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            loading={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HandleLessonsPage;
