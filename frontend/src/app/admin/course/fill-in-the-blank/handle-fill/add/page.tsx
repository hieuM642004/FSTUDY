'use client';
import React, { useState } from 'react';
import { Input, Button, Form, Radio, Space, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { nestApiInstance } from '../../../../../../constant/api';
import ButtonPrimary from '../../../../../../components/shared/ButtonPrimary/ButtonPrimary';
import Link from 'next/link';

const CourseFillPage = () => {
    const [form] = Form.useForm();
    const [correctAnswers, setCorrectAnswers] = useState(['']); // Giả định có 2 câu trả lời đúng
    const [sentence, setSentence] = useState('');
    const router = useRouter();

    const handleCorrectAnswerChange = (index: number, value: string) => {
        const newAnswers = [...correctAnswers];
        newAnswers[index] = value;
        setCorrectAnswers(newAnswers);
    };

    const handleAddAnswer = () => {
        if (correctAnswers.length < 5) {
            setCorrectAnswers([...correctAnswers, '']);
        } else {
            message.warning('Tối đa chỉ 5 đáp án đúng');
        }
    };

    const handleRemoveAnswer = (index: number) => {
        const newAnswers = correctAnswers.filter((_, i) => i !== index);
        setCorrectAnswers(newAnswers);
    };

    const handleSubmit = async (values: any) => {
        // Kiểm tra dữ liệu không được trống
        if (!sentence || sentence.trim() === '') {
            message.error('Hãy điền câu hỏi!');
            return;
        }

        const hasEmptyAnswer = correctAnswers.some(
            (answer) => answer.trim() === '',
        );
        if (hasEmptyAnswer) {
            message.error('Tất cả các đáp án đúng không được trống!');
            return;
        }

        const quizData = {
            sentence,
            correctAnswers,
            content_type: 'fill_in_the_blank',
        };
        console.log(quizData);

        try {
            await nestApiInstance.post('/course/fill/create', quizData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            message.success('Fill đã được thêm!');
            router.push('/admin/course/fill-in-the-blank');
        } catch (error) {
            console.error('Error:', error);
            message.error('Có lỗi xảy ra khi thêm Fill');
        }
    };

    return (
        <div>
            <Link href={'/admin/course/fill-in-the-blank'}>
                <ButtonPrimary
                    size={'large'}
                    label={'Fill List'}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                />
            </Link>

            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">
                    Thêm Câu Hỏi Fill In The Blank
                </h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4"
                >
                    <Form.Item
                        label="Câu hỏi"
                        rules={[
                            { required: true, message: 'Hãy điền câu hỏi' },
                        ]}
                    >
                        <Input
                            value={sentence}
                            onChange={(e) => setSentence(e.target.value)}
                            placeholder="Vd: Đâu là ____ của ____ ?"
                        />
                    </Form.Item>

                    <Form.Item label="Đáp án đúng">
                        <Space direction="vertical" className="w-full">
                            {correctAnswers.map((answer, index) => (
                                <div
                                    key={index}
                                    className="flex space-x-2 items-center"
                                >
                                    <Input
                                        placeholder={`Đáp án đúng ${index + 1}`}
                                        value={answer}
                                        onChange={(e) =>
                                            handleCorrectAnswerChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {correctAnswers.length > 1 && (
                                        <Button
                                            type="dashed"
                                            onClick={() =>
                                                handleRemoveAnswer(index)
                                            }
                                            className="flex items-center"
                                        >
                                            Xóa
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="dashed"
                                onClick={handleAddAnswer}
                                className="flex items-center"
                            >
                                Thêm đáp án đúng
                            </Button>
                        </Space>
                    </Form.Item>

                    <Form.Item>
                        <ButtonPrimary
                            htmlType="submit"
                            size={'large'}
                            label={'Thêm Câu Hỏi'}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
                        />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CourseFillPage;
