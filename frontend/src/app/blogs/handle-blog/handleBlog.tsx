'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Cascader, message } from 'antd';
import { useRouter } from 'next/navigation';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Editor from '../../../components/client/Editer/Editer';
import { nestApiInstance } from '../../../constant/api';
import { useAuth } from '@/hooks/useAuth';

function HandleBlogPage({ id }: { id?: string }) {
    const router = useRouter();
    const isEditForm = Boolean(id);
    const [text, setText] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [initialChildTopics, setInitialChildTopics] = useState<any[]>([]);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [options, setOptions] = useState<any[]>([]);
    const { userId } = useAuth();
    const formik = useFormik({
        initialValues: {
            user: userId,
            title: '',
            content: '',
            avatar: '',
            childTopics: [],
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Tiêu đề không được để trống'),
            childTopics: Yup.array()
                .min(1, 'Đề tài không được để trống')
                .required('Đề tài không được để trống'),
            content: Yup.string().test(
                'content-validation',
                'Nội dung không được để trống',
                () => text.trim().length > 0,
            ),
            avatar: Yup.mixed().test(
                'avatar-validation',
                'Ảnh đại diện không được để trống',
                () => avatar !== null,
            ),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('user', userId as string);
            formData.append('title', values.title);
            formData.append('content', text);

            if (
                !isEditForm ||
                values.childTopics[1] !== initialChildTopics[1]
            ) {
                formData.append('childTopics', values.childTopics[1]);
            }

            if (avatar) {
                formData.append('avatar', avatar);
            }

            try {
                if (isEditForm) {
                    await nestApiInstance.put(
                        `/blog/update-blog/${id}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        },
                    );
                    message.success('Bài viết đã được cập nhật!');
                } else {
                    await nestApiInstance.post('/blog/create-blog', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    message.success('Bài viết đã được thêm!');
                }
                router.push('/blogs');
            } catch (error) {
                console.error('Error submitting blog:', error);
                message.error('Có lỗi xảy ra khi thêm hoặc cập nhật bài viết.');
            }
        },
    });

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicsResponse = await nestApiInstance.get('/blog/topic');
                const childTopicsResponse = await nestApiInstance.get(
                    '/blog/child-topic',
                );

                const topics = topicsResponse.data.data;
                const childTopics = childTopicsResponse.data.data;

                const formattedOptions = formatOptions(topics, childTopics);
                setOptions(formattedOptions);

                if (isEditForm) {
                    const response = await nestApiInstance.get(`/blog/${id}`);
                    const blogData = response.data.data;

                    const selectedChildTopic = blogData.childTopics[0];
                    const initialSelectedChildTopics = [
                        selectedChildTopic.topic[0]._id,
                        selectedChildTopic._id,
                    ];

                    formik.setValues({
                        title: blogData.title,
                        content: blogData.content,
                        avatar: blogData.avatar,
                        childTopics: initialSelectedChildTopics,
                    });

                    setText(blogData.content);
                    setInitialContent(blogData.content);
                    setAvatar(blogData.avatar);
                    setInitialChildTopics(initialSelectedChildTopics);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTopics();
    }, [id, isEditForm]);

    const formatOptions = (topics: any[], childTopics: any[]) => {
        return topics.map((topic) => ({
            value: topic._id,
            label: topic.name,
            children: childTopics
                .filter((child) =>
                    child.topic.some((t: any) => t._id === topic._id),
                )
                .map((child) => ({
                    value: child._id,
                    label: child.name,
                })),
        }));
    };

    return (
        <div className="flex flex-col lg:px-48 lg:py-11">
            <h2 className="text-xl uppercase mb-4 text-left">
                {isEditForm ? 'Cập nhật bài viết' : 'Thêm bài viết'}
            </h2>

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title">Tiêu đề:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Điền tiêu đề"
                        className="rounded-lg border-zinc-300 h-10 p-2 w-full"
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
                    <label htmlFor="childTopics">Đề tài:</label>
                    <br />
                    <Cascader
                        options={options}
                        value={formik.values.childTopics}
                        onChange={(value) =>
                            formik.setFieldValue('childTopics', value)
                        }
                        placeholder="Chọn đề tài"
                        className="w-full h-10"
                    />
                    {formik.errors.childTopics && (
                        <div className="text-red-500">
                            {formik.errors.childTopics}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <Editor
                        value={text}
                        onChange={setText}
                        onImageUpload={setAvatar}
                    />
                    {formik.errors.content && (
                        <div className="text-red-500">
                            {formik.errors.content}
                        </div>
                    )}
                </div>

                <div className="pt-4 text-left">
                    <ButtonPrimary
                        size={'large'}
                        label={
                            isEditForm ? 'Cập nhật bài viết' : 'Thêm bài viết'
                        }
                        htmlType="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    />
                </div>
            </form>
        </div>
    );
}

export default HandleBlogPage;
