'use client';
import { useState } from 'react';
import { Form, Input, Radio } from 'antd';

interface MultipleChoiceProps {
    question: {
        passageText?: string;
        audioFile?: string;
        imageFile?: string;
        correctAnswer?: string;
        options: string[];
        explanation?: string;
    };
    onChangeAnswer: (answer: string) => void;
    onChangeExplanation: (explanation: string) => void;
    onChangeOption: (optionIndex: number, optionValue: string) => void;
}

const MultipleChoice = ({
    question,
    onChangeAnswer,
    onChangeExplanation,
    onChangeOption,
}: MultipleChoiceProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
        question.correctAnswer || null,
    );

    const handleAnswerChange = (e: any) => {
        const value = e.target.value;
        setSelectedAnswer(value);
        onChangeAnswer(value);
    };

    return (
        <div>
            {question?.passageText && <p>{question?.passageText}</p>}

            {question?.audioFile && (
                <audio controls>
                    <source src={question.audioFile} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}

            {question.imageFile && (
                <img
                    src={question.imageFile}
                    alt="Question related"
                    style={{ maxWidth: '100%' }}
                />
            )}

            <Form.Item label="Chọn đáp án đúng">
            <p className='text-green-500'>{question?.correctAnswer}</p>
                <Radio.Group
                    onChange={handleAnswerChange}
                    value={selectedAnswer}
                >
                    {question.options.map((option, index) => (
                        <Radio key={index} value={option}>
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
               
            </Form.Item>

            {question.options.map((option, index) => (
                <Form.Item label={`Lựa chọn ${index + 1}`} key={index}>
                    <Input
                        value={option}
                        onChange={(e) => onChangeOption(index, e.target.value)}
                        placeholder={`Nhập lựa chọn ${index + 1}`}
                    />
                </Form.Item>
            ))}

            <Form.Item label="Giải thích cho đáp án đúng">
                <Input.TextArea
                    value={question.explanation}
                    onChange={(e) => onChangeExplanation(e.target.value)}
                    placeholder="Nhập giải thích cho đáp án"
                />
            </Form.Item>
        </div>
    );
};

export default MultipleChoice;
