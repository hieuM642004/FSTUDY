'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Select, message, Button } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../../../../constant/api';
import RichTextEditor from '../../../../../components/admin/Editer/Editer';

const { Option } = Select;

function HandleCoursesPage({ id }: { id?: string }) {
    const router = useRouter();
    const isEditForm = Boolean(id);
    const [lessons, setLessons] = useState<any>([]);
    const [typeCourse, setTypeCourse] = useState<any>();
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        null,
    );
    const [selectedLesson, setSelectedLesson] = useState<string[]>([]);
    const dataUser = useTypedSelector((state) => state.user);

    const formik = useFormik({
        initialValues: {
            title: '',
            thumbnail: null,
            featured: false,
            display_order: 0,
            detail_title: '',
            detail_short_description: '',
            detail_content: '',
            detail_type: '',
            typeCourse: '',
            lessons: [],
            price: '',
            discount: '',
            createdBy: dataUser.id,
            updatedBy: dataUser.id,
        },
        validationSchema: Yup.object({
            title: Yup.string().required(
                'Tên nội dung khóa học không được để trống',
            ),
            lessons: Yup.array()
                .min(1, 'Phải chọn ít nhất một bài học')
                .required('Tên bài học không được để trống'),
            thumbnail: Yup.mixed().required(
                'Hình ảnh khóa học không được để trống',
            ),
            detail_content: Yup.string().required(
                'Chi tiết khóa học không được để trống',
            ),
            detail_type: Yup.string().required(
                'Chi tiết thể loại khóa học không được để trống',
            ),
            detail_short_description: Yup.string().required(
                'Mô tả ngắn khóa học không được để trống',
            ),
            detail_title: Yup.string().required(
                'Chi tiết tiêu đề khóa học không được để trống',
            ),
            typeCourse: Yup.string().required(
                'Chọn loại khóa học không được để trống',
            ),
            price: Yup.number()
                .min(0, 'Giá không thể nhỏ hơn 0')
                .required('Giá không được để trống'),
            discount: Yup.number()
                .min(0, 'Giá giảm không thể nhỏ hơn 0')
                .required('Giá giảm không được để trống'),
            display_order: Yup.number()
                .min(0, 'Mức độ hiển thị không thể nhỏ hơn 0')
                .required('Mức độ hiển thị không được để trống'),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            if (values.thumbnail) {
                formData.append('thumbnail', values.thumbnail);
            }
            formData.append('featured', String(values.featured));
            formData.append('display_order', String(values.display_order));
            formData.append('detail_title', values.detail_title);
            formData.append(
                'detail_short_description',
                values.detail_short_description,
            );
            formData.append('detail_content', values.detail_content);
            formData.append('typeCourse', values.typeCourse);
            formData.append('detail_type', values.detail_type);
            selectedLesson.forEach((lessonId, index) => {
                formData.append(`lessons[${index}]`, lessonId);
            });
            formData.append('price', values.price);
            formData.append('discount', values.discount);
            formData.append('createdBy', dataUser.id);
            formData.append('updatedBy', dataUser.id);

            try {
                if (isEditForm) {
                    await nestApiInstance.put(`/course/${id}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    message.success('Khóa học đã được cập nhật!');
                } else {
                    await nestApiInstance.post(`/course/create`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    message.success('Khóa học đã được thêm!');
                }
                router.push('/admin/course/courses');
            } catch (error) {
                console.error('Error submitting course:', error);
                message.error('Có lỗi xảy ra khi thêm hoặc cập nhật khóa học.');
            }
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [lessonsData, typeData] = await Promise.all([
                    nestApiInstance
                        .get(`/course/lesson`)
                        .then((res) => res.data),
                    nestApiInstance
                        .get(`/course/type`)
                        .then((res) => res.data.data),
                ]);

                setLessons(lessonsData);
                setTypeCourse(typeData);
                console.log(typeData);

                if (isEditForm) {
                    const response = await nestApiInstance.get(`/course/${id}`);
                    const courseData = response.data;
                    console.log(courseData);

                    formik.setValues({
                        title: courseData.title,
                        thumbnail: courseData.thumbnail,
                        featured: courseData.featured,
                        display_order: courseData.display_order,
                        detail_title: courseData.detail_title,
                        detail_type: courseData.detail_type,
                        detail_short_description:
                            courseData.detail_short_description,
                        detail_content: courseData.detail_content,
                        typeCourse: courseData.typeCourse._id,
                        lessons: courseData.lessons.map(
                            (lesson: any) => lesson._id,
                        ),
                        price: courseData.price,
                        discount: courseData.discount,
                        createdBy: courseData.createdBy,
                        updatedBy: dataUser.id,
                    });
                    setThumbnailPreview(courseData.thumbnail);
                    setSelectedLesson(
                        courseData.lessons.map((lesson: any) => lesson._id),
                    );
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id, isEditForm]);

    const handleLesson = (value: string[]) => setSelectedLesson(value);

    return (
        <div>
            <Link href={'/admin/course/courses'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Courses List'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl uppercase mb-4 text-left">
                    {isEditForm ? 'Cập nhật khóa học' : 'Thêm khóa học'}
                </h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title">Tên khóa học:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Điền tên khóa học"
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

                    <div className="mb-4">
                        <label htmlFor="detail_title">Chi tiết tiêu đề:</label>
                        <RichTextEditor
                            value={formik.values.detail_title}
                            onChange={(value) =>
                                formik.setFieldValue('detail_title', value)
                            }
                        />
                        {formik.errors.detail_title && (
                            <div className="text-red-500">
                                {formik.errors.detail_title}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="detail_short_description">
                            Mô tả ngắn:
                        </label>
                        <textarea
                            id="detail_short_description"
                            name="detail_short_description"
                            placeholder="Điền mô tả ngắn"
                            className="rounded-lg border-zinc-300 h-24 p-2 w-full mt-2 bg-gray-100"
                            onChange={formik.handleChange}
                            value={formik.values.detail_short_description}
                        />
                        {formik.errors.detail_short_description && (
                            <div className="text-red-500">
                                {formik.errors.detail_short_description}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="detail_content">
                            Nội dung chi tiết:
                        </label>
                        <RichTextEditor
                            value={formik.values.detail_content}
                            onChange={(value) =>
                                formik.setFieldValue('detail_content', value)
                            }
                        />
                        {formik.errors.detail_content && (
                            <div className="text-red-500">
                                {formik.errors.detail_content}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="thumbnail">Thumbnail:</label> <br />
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                formik.setFieldValue('thumbnail', file);
                                if (file) {
                                    setThumbnailPreview(
                                        URL.createObjectURL(file),
                                    );
                                }
                            }}
                        />
                        {formik.errors.thumbnail && (
                            <div className="text-red-500">
                                {formik.errors.thumbnail}
                            </div>
                        )}
                    </div>

                    {thumbnailPreview && (
                        <img
                            src={thumbnailPreview}
                            alt="Thumbnail Preview"
                            className="mb-4 h-32 w-32"
                        />
                    )}

                    <div className="mb-4">
                        <label htmlFor="typeCourse">Loại khóa học:</label>
                        <Select
                            id="typeCourse"
                            name="typeCourse"
                            onChange={(value) =>
                                formik.setFieldValue('typeCourse', value)
                            }
                            className="w-full"
                            value={formik.values.typeCourse}
                        >
                            {typeCourse?.map((item: any) => (
                                <Option key={item._id} value={item._id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                        {formik.errors.typeCourse && (
                            <div className="text-red-500">
                                {formik.errors.typeCourse}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lessons">Chọn bài học:</label>
                        <Select
                            mode="multiple"
                            id="lessons"
                            name="lessons"
                            onChange={handleLesson}
                            className="w-full"
                            value={selectedLesson}
                        >
                            {lessons.map((lesson: any) => (
                                <Option key={lesson._id} value={lesson._id}>
                                    {lesson.title}
                                </Option>
                            ))}
                        </Select>
                        {formik.errors.lessons && (
                            <div className="text-red-500">
                                {formik.errors.lessons}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price">Giá khóa học:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Điền giá khóa học"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                        />
                        {formik.errors.price && (
                            <div className="text-red-500">
                                {formik.errors.price}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="discount">Giá giảm:</label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            placeholder="Điền giá giảm (nếu có)"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            onChange={formik.handleChange}
                            value={formik.values.discount}
                        />
                        {formik.errors.discount && (
                            <div className="text-red-500">
                                {formik.errors.discount}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="display_order">Mức độ hiển thị:</label>
                        <input
                            type="number"
                            id="display_order"
                            name="display_order"
                            placeholder="Điền mức độ hiển thị"
                            className="rounded-lg border-zinc-300 h-10 p-2 w-full mt-2 bg-gray-100"
                            onChange={formik.handleChange}
                            value={formik.values.display_order}
                        />
                        {formik.errors.display_order && (
                            <div className="text-red-500">
                                {formik.errors.display_order}
                            </div>
                        )}
                    </div>

                    <ButtonPrimary
                        size={'large'}
                        label={isEditForm ? 'Cập nhật' : 'Thêm khóa học'}
                        htmlType="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    />
                </form>
            </div>
        </div>
    );
}

export default HandleCoursesPage;
