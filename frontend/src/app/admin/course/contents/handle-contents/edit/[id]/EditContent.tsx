'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Select, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../../../../../../constant/api';

function AddContentPage({ id }: { id?: string }) {
    const router = useRouter();
    const isEditForm = Boolean(id);
    const [contents, setContents] = useState<any>();
    const [quizzes, setQuizzes] = useState<any>();
    const [words, setWords] = useState<any>();
    const [fill, setFill] = useState<any>();
    const [videos, setVideos] = useState<any>();
    const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [selectedFill, setSelectedFill] = useState<string[]>([]);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

    const formik = useFormik({
        initialValues: {},
        enableReinitialize: true,
        onSubmit: async () => {
            const dataIds = [
                ...selectedQuizzes,
                ...selectedWords,
                ...selectedFill,
                ...selectedVideos,
            ];

            try {
                await nestApiInstance.patch(
                    `/course/content/add/${id}`,
                    { dataIds }, // Chuyển đổi thành chuỗi
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                );
                message.success('Bài học đã được thêm!');
                router.push('/admin/course/contents');
            } catch (error) {
                console.error('Error submitting course type:', error);
                message.error('Có lỗi xảy ra khi thêm hoặc cập nhật khóa học.');
            }
        },
    });

    const handleQuizzChange = (value: string[]) => setSelectedQuizzes(value);
    const handleWordChange = (value: string[]) => setSelectedWords(value);
    const handleFillChange = (value: string[]) => setSelectedFill(value);
    const handleVideoChange = (value: string[]) => setSelectedVideos(value);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const quizzData = await nestApiInstance
                    .get(`/course/quiz`)
                    .then((res) => res.data);
                const fillData = await nestApiInstance
                    .get(`/course/fill`)
                    .then((res) => res.data);
                const wordData = await nestApiInstance
                    .get(`/course/word-matching`)
                    .then((res) => res.data);
                const videoData = await nestApiInstance
                    .get(`/course/video`)
                    .then((res) => res.data);

                setQuizzes(quizzData);
                setFill(fillData);
                setWords(wordData);
                setVideos(videoData);

                if (isEditForm) {
                    const response = await nestApiInstance.get(
                        `/course/content/${id}`,
                    );
                    const Data = response.data.title;
                    setContents(Data);
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
                        <p>{contents}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title">Quizz:</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn bài học quizz"
                            onChange={handleQuizzChange}
                            options={quizzes?.map((quiz: any) => ({
                                value: quiz._id,
                                label: quiz.question,
                            }))}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title">Word:</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn bài học word"
                            onChange={handleWordChange}
                            options={words?.map((words: any) => ({
                                value: words._id,
                                label: words.words,
                            }))}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title">Fill in the blank:</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn bài học fill"
                            onChange={handleFillChange}
                            options={fill?.map((fill: any) => ({
                                value: fill._id,
                                label: fill.sentence,
                            }))}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title">Video:</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn bài học Video"
                            onChange={handleVideoChange}
                            options={videos?.map((videos: any) => ({
                                value: videos._id,
                                label: videos.title,
                            }))}
                        />
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

export default AddContentPage;
