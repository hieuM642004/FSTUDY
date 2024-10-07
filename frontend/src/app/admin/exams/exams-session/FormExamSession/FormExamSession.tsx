'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import ExamSessionService from '@/services/exams/ExamSessionService';
import ExamsService from '@/services/exams/ExamsService';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ButtonBack from '@/components/shared/ButtonBack/ButtonBack';

const { Option } = Select;

function FormExamSession({ id }: { id?: string }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [exams, setExams] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchExams();
        if (id) {
            fetchExamData(id);
        }
    }, [id]);

    const fetchExams = async () => {
        try {
            const { data } = await ExamsService.getAllExams();
            setExams(data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const fetchExamData = async (examId: string) => {
        try {
            const { data } = await ExamSessionService.getAllExamsSessionById(
                examId,
            );

            form.setFieldsValue({
                title: data.title,
                description: data.description,
                idExam: data.idExam._id,
                createdAt: new Date(data.createdAt).toLocaleString(),
                updatedAt: new Date(data.updatedAt).toLocaleString(),
            });
        } catch (error) {
            console.error('Error fetching exam session data:', error);
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (id) {
                await ExamSessionService.updateExamsSession(id, {
                    ...values,
                    idExam: values.idExam,
                });
                notification.success({
                    message: 'Thành công',
                    description: 'Phiên thi đã được cập nhật thành công!',
                });
            } else {
                await ExamSessionService.addExamSession({
                    ...values,
                    idExam: values.idExam,
                });
                notification.success({
                    message: 'Thành công',
                    description: 'Phiên thi đã được thêm thành công!',
                });
            }
            router.push('/admin/exams');
        } catch (error) {
            notification.error({
                message: 'Thất bại',
                description: 'Có lỗi xảy ra khi xử lý phiên thi!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Loại bài thi"
                name="idExam"
                rules={[
                    { required: true, message: 'Vui lòng chọn loại bài thi' },
                ]}
            >
                <Select placeholder="Chọn loại bài thi">
                    {exams.map((exam: any) => (
                        <Option key={exam._id} value={exam._id}>
                            {exam.title} ({exam.examType})
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
            >
                <Input placeholder="Nhập tiêu đề phiên thi" />
            </Form.Item>

            <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
            >
                <Input.TextArea placeholder="Nhập mô tả phiên thi" />
            </Form.Item>
            {id && (
                <>
                    <Form.Item label="Ngày tạo" name="createdAt">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Ngày cập nhật" name="updatedAt">
                        <Input disabled />
                    </Form.Item>
                </>
            )}

            <Form.Item>
                <ButtonPrimary
                    htmlType="submit"
                    loading={loading}
                    label={id ? 'Cập nhật phần thi' : 'Thêm phần thi'}
                ></ButtonPrimary>
                <ButtonBack label="Hủy" className="ml-2" />
            </Form.Item>
        </Form>
    );
}

export default FormExamSession;
