'use client';
import React, { useState } from 'react';
import { Input, Button, Form, Radio, Space, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../../../constant/api';
import ButtonPrimary from '../../../../../../components/shared/ButtonPrimary/ButtonPrimary';
import Link from 'next/link';

const CourseQuizzesPage = () => {
    const [form] = Form.useForm();
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const router = useRouter();

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        if (options.length < 5) {
            setOptions([...options, '']);
        } else {
            message.warning('Tối đa chỉ 5 câu trả lời');
        }
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (values: any) => {
        // Kiểm tra dữ liệu không được trống
        const isOptionsEmpty = options.some((option) => option.trim() === '');
        if (isOptionsEmpty) {
            message.error('Tất cả các câu trả lời không được trống!');
            return;
        }

        // Kiểm tra Câu hỏi, Giải thích và Đáp án đúng
        if (!values.question || values.question.trim() === '') {
            message.error('Hãy điền câu hỏi!');
            return;
        }

        if (!values.explanation || values.explanation.trim() === '') {
            message.error('Hãy điền giải thích!');
            return;
        }

        if (correctAnswer === null) {
            message.error('Vui lòng chọn đáp án đúng!');
            return;
        }

        const quizData = {
            ...values,
            options,
            correctAnswer,
            content_type: 'quiz',
        };
        console.log(quizData);

        try {
            await nestApiInstance.post('/course/quiz/create', quizData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            message.success('Bài viết đã được thêm!');
            router.push('/admin/course/quizzes');
        } catch (error) {
            console.error('Error:', error);
            message.error('Có lỗi xảy ra khi thêm bài viết');
        }
    };

    return (
        <div>
            <Link href={'/admin/course/quizzes'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Quiz List'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>

            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Thêm Quizzes</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4"
                >
                    <Form.Item
                        label="Câu hỏi"
                        name="question"
                        rules={[
                            { required: true, message: 'Hãy điền câu hỏi' },
                        ]}
                    >
                        <Input placeholder="Câu hỏi" />
                    </Form.Item>

                    <Form.Item label="Câu trả lời">
                        <Space direction="vertical" className="w-full">
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex space-x-2 items-center"
                                >
                                    <Input
                                        placeholder={`Câu trả lời ${index + 1}`}
                                        value={option}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {options.length > 3 && (
                                        <Button
                                            type="dashed"
                                            onClick={() =>
                                                handleRemoveOption(index)
                                            }
                                            icon={<MinusOutlined />}
                                            className="flex items-center"
                                        />
                                    )}
                                </div>
                            ))}
                            <Button
                                type="dashed"
                                onClick={handleAddOption}
                                icon={<PlusOutlined />}
                                className="flex items-center"
                            >
                                Thêm câu trả lời
                            </Button>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="Đáp án đúng"
                        name="correctAnswer"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn đáp án đúng',
                            },
                        ]}
                    >
                        <Radio.Group
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                        >
                            {options.map((option, index) => (
                                <Radio key={index} value={index.toString()}>
                                    {`Câu ${index + 1}`}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="Giải thích"
                        name="explanation"
                        rules={[
                            { required: true, message: 'Hãy điền giải thích!' },
                        ]}
                    >
                        <Input.TextArea placeholder="Giải thích đáp án..." />
                    </Form.Item>

                    <Form.Item>
                        <ButtonPrimary
                            htmlType="submit"
                            size={'large'}
                            label={'Thêm Quizzes'}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseQuizzesPage;
