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

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      const fetchExam = async () => {
        setLoading(true);
        try {
          const examData = await ExamsService.getAllExamById(id);
          form.setFieldsValue(examData);
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
        // Update existing exam
        await ExamsService.updateExam(id || '', values);
        notification.success({
          message: 'Thành công',
          description: 'Bài thi đã được cập nhật thành công!',
        });
      } else {
        // Add new exam
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ examType: 'toeic', durition: '30 phút' }} 
    className='shadow'
    >
    <div className='p-4'>
        <Form.Item
          label="Loại bài thi"
          name="examType"
          rules={[{ required: true, message: 'Vui lòng chọn loại bài thi' }]}
        >
          <Select placeholder="Chọn loại bài thi">
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
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả bài thi" />
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
          <ButtonPrimary htmlType="submit" loading={loading} label={isUpdate ? 'Cập nhật bài thi' : 'Thêm bài thi'}></ButtonPrimary>
          <ButtonBack label='Hủy' className='ml-2'/>
        </Form.Item>
    </div>
    </Form>
  );
}

export default FormExam;
