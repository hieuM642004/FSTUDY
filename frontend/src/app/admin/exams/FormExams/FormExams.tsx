'use client';

import ButtonBack from '@/components/shared/ButtonBack/ButtonBack';
import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ExamsService from '@/services/exams/ExamsService';
import { Form, Input, Button, Select, notification } from 'antd';
import { useState, useEffect } from 'react';

const { Option } = Select;

function FormExam({ id }: { id?: string }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [examType, setExamType] = useState<string>('toeic');
  const [skills, setSkills] = useState<string[]>(['Reading', 'Listening']);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      const fetchExam = async () => {
        setLoading(true);
        try {
          const examData = await ExamsService.getAllExamById(id);
          form.setFieldsValue(examData);
          setExamType(examData.examType); // Cập nhật giá trị loại bài thi
          updateSkills(examData.examType);
        } catch (error) {
          notification.error({
            message: 'Thất bại',
            description: 'Có lỗi xảy ra khi lấy dữ liệu bài thi!',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchExam();
    }
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (isUpdate) {
        await ExamsService.updateExam(id || '', values);
        notification.success({
          message: 'Thành công',
          description: 'Bài thi đã được cập nhật thành công!',
        });
      } else {
        await ExamsService.addExam(values);
        notification.success({
          message: 'Thành công',
          description: 'Bài thi đã được thêm thành công!',
        });
        form.resetFields();
      }
    } catch (error) {
      notification.error({
        message: 'Thất bại',
        description: 'Có lỗi xảy ra khi lưu bài thi!',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSkills = (type: string) => {
    if (type === 'toeic') {
      setSkills(['Reading', 'Listening']);
    } else if (type === 'ielst') {
      setSkills(['Reading', 'Listening', 'Speaking', 'Writing']);
    }
  };

  const handleExamTypeChange = (value: string) => {
    setExamType(value);
    updateSkills(value);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ examType: 'toeic', durition: '30 phút' }}
      className="shadow"
    >
      <div className="p-4">
        <Form.Item
          label="Loại bài thi"
          name="examType"
          rules={[{ required: true, message: 'Vui lòng chọn loại bài thi' }]}
        >
          <Select placeholder="Chọn loại bài thi" onChange={handleExamTypeChange}>
            <Option value="toeic">TOEIC</Option>
            <Option value="ielst">IELST</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input placeholder="Nhập tiêu đề bài thi" />
        </Form.Item>

        <Form.Item
  label="Mô tả"
  name="description"
  rules={[{ required: true, message: 'Vui lòng chọn mô tả' }]}
>
  <Select placeholder="Chọn mô tả">
    {skills.map((skill) => (
      <Option key={skill} value={skill}>
        {skill}
      </Option>
    ))}
  </Select>
</Form.Item>


        <Form.Item
          label="Thời gian"
          name="durition"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian bài thi' }]}
        >
          <Select placeholder="Chọn thời gian bài thi">
            <Option value="30 phút">30 phút</Option>
            <Option value="45 phút">45 phút</Option>
            <Option value="60 phút">60 phút</Option>
            <Option value="90 phút">90 phút</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <ButtonPrimary htmlType="submit" loading={loading} label={isUpdate ? 'Cập nhật bài thi' : 'Thêm bài thi'} />
          <ButtonBack label="Hủy" className="ml-2" />
        </Form.Item>
      </div>
    </Form>
  );
}

export default FormExam;
