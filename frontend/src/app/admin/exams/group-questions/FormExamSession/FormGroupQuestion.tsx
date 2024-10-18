'use client';
import { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Upload,
    Select,
    notification,
    Col,
    Row,
} from 'antd';
import {
    UploadOutlined,
    PlusOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import ExamSessionService from '@/services/exams/ExamSessionService';
import GroupQuestionsService from '@/services/exams/GroupQuestions';
import FillInTheBlank from './FillInTheBlank/FillInTheBlank';
import MultipleChoice from './MultipleChoice/MultipleChoice';
import { useRouter } from 'next/navigation';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ButtonBack from '@/components/shared/ButtonBack/ButtonBack';
import QuestionsService from '@/services/exams/Questions';

const { Option } = Select;

interface Question {
    questionType: string;
    questionText: any;
    options: string[];
    correctAnswer: string;
    explanation: string;
    _id: string;
}

interface FormGroupQuestionsProps {
    id?: string;
}

function FormGroupQuestions({ id }: FormGroupQuestionsProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [examSessions, setExamSessions] = useState<
        {
            _id: string;
            title: string;
            idExam: { title: string; examType: string };
        }[]
    >([]);
    const [questions, setQuestions] = useState<Question[]>([
        {
            questionType: 'multiple-choice',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: '',
            explanation: '',
        },
    ]);
    const [audioFile, setAudioFile] = useState<RcFile | null>(null);
    const [imageFile, setImageFile] = useState<RcFile | null>(null);
    const [transcript,setTranscript]=useState(false)
    const router = useRouter();

    useEffect(() => {
        fetchExamSessions();
        if (id) {
            fetchExamData(id);
        }
    }, [id]);

    const fetchExamSessions = async () => {
        try {
            const { data } = await ExamSessionService.getAllExamsSession();
            setExamSessions(data);
        } catch (error) {
            console.error('Error fetching exam sessions:', error);
        }
    };

    const fetchExamData = async (examId: string) => {
        try {
            const { data } =
                await GroupQuestionsService.getAllGroupQuestionsById(examId);

            form.setFieldsValue({
                title: data.title,
                description: data.description,
                passageText: data.passageText,
                examSession: data.examSession || null,
            });
            if (data.audioUrl) {
                setAudioFile(data.audioUrl);
            }
            if (data.imageUrl) {
                setImageFile(data.imageUrl);
            }
            if (data.questions && data.questions.length > 0) {
                const questionPromises = data.questions.map(
                    (questionId: string) =>
                        QuestionsService.getAllQuestionsById(questionId),
                );

                const questionResponses = await Promise.all(questionPromises);

                const formattedQuestions = questionResponses.map((response) => {
                    const question = response.data;
                    return {
                        _id: question._id,
                        questionType:
                            question.questionType || 'multiple-choice',
                        questionText: question.questionText || '',
                        options: question.options || [],
                        correctAnswer: question.correctAnswer || '',
                        explanation: question.explanation || '',
                    };
                });
                console.log('Formatted questions', formattedQuestions);
                setQuestions(formattedQuestions);
            }
        } catch (error) {
            console.error('Error fetching exam session data:', error);
        }
    };

    const handleAudioChange = (info: UploadChangeParam) => {
        if (info.fileList.length > 0) {
            setTranscript(true)
            setAudioFile(info.fileList[0].originFileObj as RcFile);
        } else {
            setAudioFile(null);
        }
    };

    const handleImageChange = (info: UploadChangeParam) => {
        if (info.fileList.length > 0) {
            setImageFile(info.fileList[0].originFileObj as RcFile);
        } else {
            setImageFile(null);
        }
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionType: 'multiple-choice',
                options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                correctAnswer: '',
                explanation: '',
            },
        ]);
    };

    const handleRemoveQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (
        index: number,
        field: keyof Question,
        value: any,
    ) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index: number, answer: string) => {
        const newQuestions = [...questions];
        newQuestions[index].correctAnswer = answer;
        setQuestions(newQuestions);
    };

    const handleExplanationChange = (index: number, explanation: string) => {
        const newQuestions = [...questions];
        newQuestions[index].explanation = explanation;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (
        index: number,
        optionIndex: number,
        optionValue: string,
    ) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = optionValue;
        setQuestions(newQuestions);
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('passageText', values.passageText);
            formData.append('examSession', values.examSession);

            if (audioFile) {
                formData.append('audio', audioFile);
            }
            if (imageFile) {
                formData.append('image', imageFile);
            }

            let groupQuestionId;

            if (id) {
                await GroupQuestionsService.updateGroupQuestions(id, formData);
                groupQuestionId = id;
            } else {
                const response = await GroupQuestionsService.addGroupQuestions(
                    formData,
                );
                groupQuestionId = response._id;
            }

            if (groupQuestionId && questions.length > 0) {
                for (let question of questions) {
                    if (
                        question.questionType === 'fill-in-the-blank' &&
                        Array.isArray(question.correctAnswer)
                    ) {
                        for (
                            let i = 0;
                            i < question.correctAnswer.length;
                            i++
                        ) {
                            const fillInBlankPayload = {
                                questionText:
                                    question.correctAnswer[i].questionText ||
                                    '',
                                questionType: 'fill-in-the-blank',
                                correctAnswer:
                                    question.correctAnswer[i].correctAnswer ||
                                    '',
                                explanation:
                                    question.correctAnswer[i].explanation || '',
                                options: [],
                                questionGroup: groupQuestionId,
                            };

                            if (question._id) {
                                await QuestionsService.updateQuestions(
                                    question._id,
                                    fillInBlankPayload,
                                );
                            } else {
                                await QuestionsService.addQuestions(
                                    fillInBlankPayload,
                                );
                            }
                        }
                    } else {
                        const questionPayload = {
                            questionText: question.questionText || '',
                            questionType: question.questionType,
                            correctAnswer: Array.isArray(question.correctAnswer)
                                ? question.correctAnswer[0]
                                : question.correctAnswer,
                            explanation: question.explanation || '',
                            options:
                                question.questionType === 'multiple-choice'
                                    ? question.options || []
                                    : [],
                            questionGroup: groupQuestionId,
                        };

                        if (question._id) {
                            await QuestionsService.updateQuestions(
                                question._id,
                                questionPayload,
                            );
                        } else {
                            await QuestionsService.addQuestions(
                                questionPayload,
                            );
                        }
                    }
                }

                notification.success({
                    message: 'Thành công',
                    description: 'Câu hỏi đã được thêm thành công!',
                });
            } else {
                notification.success({
                    message: 'Thành công',
                    description: 'Nhóm câu hỏi đã được thêm thành công!',
                });
            }

            router.push('/admin/exams/group-questions');
        } catch (error) {
            notification.error({
                message: 'Thất bại',
                description: 'Có lỗi xảy ra khi xử lý!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
 
          

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Exam Session"
                        name="examSession"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn session',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn session"
                            showSearch
                            optionFilterProp="children"
                        >
                            {examSessions.map((session) => (
                                <Option key={session._id} value={session._id}>
                                    {`${session.title} - ${session.idExam?.title} (${session.idExam?.examType})`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Câu hỏi"
                        name="passageText"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập câu hỏi',
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Nhập câu hỏi chính" />
                    </Form.Item>
                </Col>
            </Row>
<Row>
{
        transcript && (
             <Col span={12}>
                    <Form.Item label="Transcript" name="description">
                        <Input.TextArea placeholder="Nhập transcript" />
                    </Form.Item>
                </Col>
        )
       }
              
</Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Upload Audio" name="audio">
                        <Upload
                            listType="text"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={handleAudioChange}
                            fileList={
                                audioFile
                                    ? [
                                          {
                                              uid: '-1',
                                              name: 'Audio File',
                                              status: 'done',
                                              url:
                                                  typeof audioFile === 'string'
                                                      ? audioFile
                                                      : URL.createObjectURL(
                                                            audioFile,
                                                        ),
                                          },
                                      ]
                                    : []
                            }
                            onPreview={(file) => {
                                const audio = new Audio(file.url);
                                audio.play();
                            }}
                        >
                            <Button icon={<UploadOutlined />}>
                                Tải lên audio
                            </Button>
                        </Upload>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item label="Upload Image" name="image">
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                            fileList={
                                imageFile
                                    ? [
                                          {
                                              uid: '-1',
                                              name: 'Image File',
                                              status: 'done',
                                              url:
                                                  typeof imageFile === 'string'
                                                      ? imageFile
                                                      : URL.createObjectURL(
                                                            imageFile,
                                                        ),
                                          },
                                      ]
                                    : []
                            }
                            onPreview={(file) => {
                                window.open(file.url);
                            }}
                        >
                            {imageFile ? null : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>
                                        Tải lên hình ảnh
                                    </div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>

            {questions.map((question, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: '16px',
                        padding: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                >
                    <Form.Item label="Loại câu hỏi" required>
                        <Select
                            value={question.questionType}
                            onChange={(value) =>
                                handleQuestionChange(index, 'questionType', value)
                            }
                        >
                            <Option value="multiple-choice">Trắc nghiệm</Option>
                            <Option value="fill-in-the-blank">Điền vào chỗ trống</Option>
                            <Option value="short-answer">Trả lời ngắn</Option>
                        </Select>
                    </Form.Item>

                    {question.questionType === 'fill-in-the-blank' ? (
                        <FillInTheBlank
                            question={question}
                            index={index}
                            onChangeQuestion={handleQuestionChange}
                        />
                    ) : question.questionType === 'short-answer' ? (
                        <>
                          
                            <p className='my-3 italic text-yellow-500'>Với phần thi này không thể lưu đáp án</p>
                        </>
                    ) : (
                        <MultipleChoice
                            question={question}
                            onChangeAnswer={(answer) =>
                                handleAnswerChange(index, answer)
                            }
                            onChangeExplanation={(explanation) =>
                                handleExplanationChange(index, explanation)
                            }
                            onChangeOption={(optionIndex, optionValue) =>
                                handleOptionChange(index, optionIndex, optionValue)
                            }
                        />
                    )}

                    {/* <Button
                        onClick={() => handleRemoveQuestion(index)}
                        icon={<MinusCircleOutlined />}
                        disabled={questions.length === 1}
                    >
                        Xóa câu hỏi
                    </Button> */}
                </div>
            ))}

          
            <Form.Item>
                <ButtonPrimary
                    htmlType="submit"
                    loading={loading}
                    label={id ? 'Cập nhật bài thi' : 'Thêm bài thi'}
                />
                <ButtonBack label="Hủy" className="ml-2" />
            </Form.Item>
        </Form>
    );
}

export default FormGroupQuestions;
