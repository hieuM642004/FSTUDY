// components/AdminExams.tsx
'use client';

import { useEffect, useState } from 'react';
import { notification, Spin } from 'antd';

import Table from '@/components/admin/Table/Table';
import ExamSessionService from '@/services/exams/ExamSessionService';

function AdminSessionExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await ExamSessionService.getAllExamsSession();
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (record: any) => {
        try {
            setLoading(true);
            await ExamSessionService.deleteExamsSession(record._id); 
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
            title: 'Đề thi',
            dataIndex: 'idExam.title',
            key: 'idExam.title',
            render: (text:any, record:any) => record.idExam?.title || 'N/A',
        },
        {
            title: 'Tên phần thi',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Số nhóm câu hỏi',
            dataIndex: 'idQuestionGroups',
            key: 'idQuestionGroups',
            render: (idQuestionGroups:any) => (Array.isArray(idQuestionGroups) ? idQuestionGroups.length : 0),
        },
       
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
       
    ];
const handleAdd = () => {
    
}
    return (
        <div>
            {loading ? (
                 <div className='flex justify-center items-center'><Spin tip="Loading exams..."  /></div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={exams}
                    rowKey="_id"
                    onEdit={(record) => console.log('Edit', record)}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    addLink="/admin/exams/exams-session/add"
                    editLink={(record) =>
                        `/admin/exams/exams-session/edit/${record._id}`
                    }
                />
            )}
        </div>
    );
}

export default AdminSessionExams;
