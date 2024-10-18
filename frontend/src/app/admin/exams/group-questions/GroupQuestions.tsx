'use client';

import { useEffect, useState } from 'react';
import { notification, Spin, Modal, Button, Descriptions, Tooltip } from 'antd';

import Table from '@/components/admin/Table/Table';
import GroupQuestionsService from '@/services/exams/GroupQuestions';

function AdminGroupQuestions() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExam, setSelectedExam] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GroupQuestionsService.getAllGroupQuestions();
            setExams(response || []);
        } catch (error) {
            console.error('Error fetching exams:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (record: any) => {
        try {
            setLoading(true);
            await GroupQuestionsService.deleteGroupQuestions(record._id);
            notification.success({
                message: 'Xóa thành công',
                description: `Phần thi "${record.title}" đã được xóa.`,
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting exam session:', error);
            notification.error({
                message: 'Xóa thất bại',
                description: 'Đã xảy ra lỗi khi xóa phần thi.',
            });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
       
        {
            title: 'Câu hỏi',
            dataIndex: 'passageText',
            key: 'passageText',
            render: (text: any, record: any) => {
                const maxLength = 15;
                const passageText = record?.passageText || 'N/A';
                const displayText = passageText.length > maxLength
                    ? `${passageText.substring(0, maxLength)}...`
                    : passageText;
    
                return (
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="link"
                            onClick={() => handleViewDetails(record)}
                        >
                            {displayText}
                        </Button>
                    </Tooltip>
                );
            },
        },

        {
            title: 'Phần thi',
            dataIndex: 'examSession',
            key: 'examSession',
            render: (text: any, record: any) =>
                record?.examSession?.title ? record?.examSession?.title : 'N/A',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: any) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date: any) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Số câu hỏi',
            dataIndex: 'questions',
            key: 'questions',
            render: (questions: any) => (questions ? questions.length : 0),
        },
    ];

    const handleAdd = () => {};

    const handleViewDetails = (record: any) => {
        setSelectedExam(record);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedExam(null);
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin tip="Loading exams..." />
                </div>
            ) : (
                <>
                    <Table
                        columns={columns}
                        dataSource={exams}
                        rowKey="_id"
                        onEdit={(record) => console.log('Edit', record)}
                        onDelete={handleDelete}
                        onAdd={handleAdd}
                        addLink="/admin/exams/group-questions/add"
                        editLink={(record) =>
                            `/admin/exams/group-questions/edit/${record._id}`
                        }
                    />
                    {selectedExam && (
                        <Modal
                            visible={isModalVisible}
                            title="Chi tiết nhóm câu hỏi"
                            onCancel={handleCloseModal}
                            footer={[
                                <Button key="close" onClick={handleCloseModal}>
                                    Đóng
                                </Button>,
                            ]}
                        >
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Tên nhóm câu hỏi">
                                    <Tooltip title="Xem chi tiết">
                                        {selectedExam.title}
                                    </Tooltip>
                                </Descriptions.Item>
                                <Descriptions.Item label="Transcription">
                                    {selectedExam.transcription === undefined && 'Chưa có'}
                                    {/* {typeof selectedExam.description ===
                                    'object'
                                        ? JSON.stringify(
                                              selectedExam.description,
                                          )
                                        : selectedExam.description || 'N/A'} */}
                                </Descriptions.Item>
                                <Descriptions.Item label="Câu hỏi chính">
                                    {selectedExam.passageText || 'Chưa có'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Audio">
                                    {selectedExam.audioUrl ? (
                                        <audio controls>
                                            <source
                                                src={selectedExam.audioUrl}
                                                type="audio/mpeg"
                                            />
                                            Trình duyệt của bạn không hỗ trợ thẻ
                                            audio.
                                        </audio>
                                    ) : (
                                        'Chưa có'
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Hình ảnh">
                                    {selectedExam.imageUrl ? (
                                        <img
                                            src={selectedExam.imageUrl}
                                            alt="Exam Image"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    ) : (
                                        'Chưa có'
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Phần thi">
                                    {selectedExam.examSession?.title || 'N/A'}
                                </Descriptions.Item>

                                <Descriptions.Item label="Số câu hỏi">
                                    {selectedExam.questions?.length || 0}
                                </Descriptions.Item>
                            </Descriptions>
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
}

export default AdminGroupQuestions;
