'use client';
import React, { useState } from 'react';
import { Input, Button, Form, Space, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../../../constant/api';
import ButtonPrimary from '../../../../../../components/shared/ButtonPrimary/ButtonPrimary';
import Link from 'next/link';

const CourseWordsMatchingPage = () => {
    const [form] = Form.useForm();
    const [words, setWords] = useState(['']);
    const [matches, setMatches] = useState(['']);
    const router = useRouter();

    const handleWordChange = (index: number, value: string) => {
        const newWords = [...words];
        newWords[index] = value;
        setWords(newWords);
    };

    const handleMatchChange = (index: number, value: string) => {
        const newMatches = [...matches];
        newMatches[index] = value;
        setMatches(newMatches);
    };

    const handleAddWord = () => {
        if (words.length < 5) {
            setWords([...words, '']);
            setMatches([...matches, '']); // Thêm đồng thời từ đồng nghĩa
        } else {
            message.warning('Tối đa chỉ 5 từ');
        }
    };

    const handleRemoveWord = (index: number) => {
        const newWords = words.filter((_, i) => i !== index);
        const newMatches = matches.filter((_, i) => i !== index); // Xóa đồng thời từ đồng nghĩa
        setWords(newWords);
        setMatches(newMatches);
    };

    const handleAddMatch = () => {
        if (matches.length < 5) {
            setMatches([...matches, '']);
            setWords([...words, '']); // Thêm đồng thời từ
        } else {
            message.warning('Tối đa chỉ 5 từ đồng nghĩa');
        }
    };

    const handleRemoveMatch = (index: number) => {
        const newMatches = matches.filter((_, i) => i !== index);
        const newWords = words.filter((_, i) => i !== index); // Xóa đồng thời từ
        setMatches(newMatches);
        setWords(newWords);
    };

    const handleSubmit = async (values: any) => {
        // Kiểm tra dữ liệu không rỗng
        const isWordsEmpty = words.some((word) => word.trim() === '');
        const isMatchesEmpty = matches.some((match) => match.trim() === '');

        if (isWordsEmpty || isMatchesEmpty) {
            message.error(
                'Tất cả các trường từ và từ đồng nghĩa không được rỗng!',
            );
            return;
        }

        const wordMatchingData = {
            ...values,
            words,
            matches,
            content_type: 'word_matching',
        };
        console.log(wordMatchingData);

        try {
            await nestApiInstance.post(
                '/course/word-matching/create',
                wordMatchingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            message.success('Dữ liệu đã được thêm thành công!');
            router.push('/admin/course/word-matching');
        } catch (error) {
            console.error('Error:', error);
            message.error('Có lỗi xảy ra khi thêm dữ liệu');
        }
    };

    return (
        <div>
            <Link href={'/admin/course/word-matching'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Danh sách từ ghép'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>

            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Thêm từ ghép</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4"
                >
                    <Form.Item label="Từ" required>
                        <Space direction="vertical" className="w-full">
                            {words.map((word, index) => (
                                <div
                                    key={index}
                                    className="flex space-x-2 items-center"
                                >
                                    <Input
                                        placeholder={`Từ ${index + 1}`}
                                        value={word}
                                        onChange={(e) =>
                                            handleWordChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {words.length > 1 && (
                                        <Button
                                            type="dashed"
                                            onClick={() =>
                                                handleRemoveWord(index)
                                            }
                                            icon={<MinusOutlined />}
                                            className="flex items-center"
                                        />
                                    )}
                                </div>
                            ))}
                            <Button
                                type="dashed"
                                onClick={handleAddWord}
                                icon={<PlusOutlined />}
                                className="flex items-center"
                            >
                                Thêm từ
                            </Button>
                        </Space>
                    </Form.Item>

                    <Form.Item label="Từ đồng nghĩa" required>
                        <Space direction="vertical" className="w-full">
                            {matches.map((match, index) => (
                                <div
                                    key={index}
                                    className="flex space-x-2 items-center"
                                >
                                    <Input
                                        placeholder={`Từ đồng nghĩa ${
                                            index + 1
                                        }`}
                                        value={match}
                                        onChange={(e) =>
                                            handleMatchChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {matches.length > 1 && (
                                        <Button
                                            type="dashed"
                                            onClick={() =>
                                                handleRemoveMatch(index)
                                            }
                                            icon={<MinusOutlined />}
                                            className="flex items-center"
                                        />
                                    )}
                                </div>
                            ))}
                            <Button
                                type="dashed"
                                onClick={handleAddMatch}
                                icon={<PlusOutlined />}
                                className="flex items-center"
                            >
                                Thêm từ đồng nghĩa
                            </Button>
                        </Space>
                    </Form.Item>

                    <Form.Item>
                        <ButtonPrimary
                            htmlType="submit"
                            size={'large'}
                            label={'Thêm từ ghép'}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseWordsMatchingPage;
