'use client';

import { useEffect, useState } from 'react';
import { Spin, notification, Button, Select, Input } from 'antd';
import { useRouter } from 'next/navigation';
import ExamsService from '@/services/exams/ExamsService';
import Table from '@/components/admin/Table/Table';
import { formatVietnamTime } from '@/utils/formatVietnamTime';
import { FileSearchOutlined, FileTextOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

const { Option } = Select;

function AdminExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [examTypes, setExamTypes] = useState<
        { label: string; value: string }[]
    >([
        { label: 'Tất cả', value: 'all' },
        { label: 'IELTS', value: 'ielst' },
        { label: 'TOEIC', value: 'toeic' },
    ]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const debouncedFetchData = debounce(async () => {
        try {
            setLoading(true);
            let query = '';

            if (activeTab !== 'all') {
                query += `examType=${activeTab}`;
            }

            if (searchQuery) {
                query += (query ? '&' : '') + `title=${searchQuery}`;
            }
            console.log(query);

            const examsData = await ExamsService.getAllExams(query);
            setExams(examsData.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        } finally {
            setLoading(false);
        }
    }, 300);

    useEffect(() => {
        debouncedFetchData();
    }, [activeTab, searchQuery]);

    const handleDelete = async (record: any) => {
        try {
            await ExamsService.deleteExam(record._id);
            notification.success({
                message: 'Xóa thành công',
                description: `Đề thi "${record.title}" đã được xóa.`,
            });
            debouncedFetchData();
        } catch (error) {
            console.error('Error deleting exam:', error);
            notification.error({
                message: 'Xóa thất bại',
                description: 'Đã xảy ra lỗi khi xóa đề thi.',
            });
        }
    };

    const handleSearch = () => {
        debouncedFetchData();
    };

    const handleOverviewClick = (record: any) => {
        const examSlug = record.slug;
        const partSlugs = record.idSession
            .map((session: any) => session.slug)
            .join('&part=');
        const time = 0;
        const url = `/admin/exams/overview?exam=${examSlug}&part=${partSlugs}&time=${time}`;
        router.push(url);
    };

    const columns = [
        {
            title: 'Loại đề thi',
            dataIndex: 'examType',
            key: 'examType',
        },
        {
            title: 'Tên đề thi',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Phần thi',
            dataIndex: 'idSession',
            key: 'idSession',
            render: (idSession: any) =>
                Array.isArray(idSession) ? idSession.length : 0,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thời gian làm bài',
            dataIndex: 'durition',
            key: 'durition',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: any) => formatVietnamTime(new Date(createdAt)),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt: any) => formatVietnamTime(new Date(updatedAt)),
        },
        {
            title: 'Tổng quan',
            key: 'overview',
            render: (text: any, record: any) => (
                <Button
                    type="dashed"
                    color="default"
                    onClick={() => handleOverviewClick(record)}
                >
                    <FileTextOutlined />
                </Button>
            ),
        },
    ];

    const filterComponent = (
        <div className="flex items-center space-x-2">
            <Select
                value={activeTab}
                onChange={(value) => {
                    setActiveTab(value);
                }}
                style={{ width: 200 }}
            >
                {examTypes.map((item, index) => (
                    <Option key={index} value={item.value}>
                        {item.label}
                    </Option>
                ))}
            </Select>

            <Input
                type="text"
                placeholder="Tìm kiếm đề thi"
                className="flex-1 p-1 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button type="default" onClick={handleSearch}>
                <FileSearchOutlined />
            </Button>
        </div>
    );

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin tip="Loading exams..." />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={exams}
                    rowKey="_id"
                    filter={filterComponent}
                    onEdit={(record) => console.log('Edit', record)}
                    onDelete={handleDelete}
                    addLink="/admin/exams/add"
                    editLink={(record) => `/admin/exams/edit/${record._id}`}
                />
            )}
        </div>
    );
}

export default AdminExams;
