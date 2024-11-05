'use client';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Descriptions, Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { nestApiInstance } from '../../../constant/api';

interface DataType {
    _id: string;
    user_id: string;
    course: string;
    user: string;
    paymentStatus: string;
    paymentMethod: string;
    purchaseDate: string;
    price: number; // Đảm bảo price là số
    discount: number; // Đảm bảo discount là số
}

const columns = (showModal: (record: DataType) => void) => [
    {
        title: 'Khóa học',
        dataIndex: 'course',
        key: 'course',
    },
    {
        title: 'Người dùng',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Ngày mua',
        dataIndex: 'purchaseDate',
        key: 'purchaseDate',
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (text: any, record: DataType) => (
            <Button
                type="link"
                icon={<EyeOutlined />}
                onClick={() => showModal(record)}
            />
        ),
    },
];

function AdminPurchasesPage() {
    const [purchases, setPurchases] = useState<DataType[]>([]);
    const [selectedPurchaseDetail, setSelectedPurchaseDetail] =
        useState<DataType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = async (record: DataType) => {
        const selectedPurchase = purchases.find(
            (purchase) => purchase._id === record._id,
        );
        if (selectedPurchase) {
            setSelectedPurchaseDetail(selectedPurchase);
        }
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedPurchaseDetail(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedPurchaseDetail(null);
    };

    const fetchPurchases = async () => {
        try {
            const response = await nestApiInstance.get(
                `/course/allPurchases/all`,
            );
            const data: DataType[] = response.data.map((item: any) => ({
                _id: item._id,
                user_id: item.user._id,
                course: item.course.title,
                price: item.course.price,
                discount: item.course.discount,
                user: item.user.fullname,
                email: item.user.email,
                typeLogin: item.user.typeLogin,
                paymentMethod: item.paymentMethod,
                paymentStatus: item.paymentStatus,
                purchaseDate: new Date(item.purchaseDate).toLocaleDateString(),
            }));
            setPurchases(data);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    return (
        <>
            <div>
                <Table<DataType>
                    columns={columns(showModal)}
                    dataSource={purchases}
                    rowKey={(record) => record._id}
                />
            </div>
            <Modal
                title="Thông tin khóa học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800} // Đặt chiều rộng modal
            >
                {selectedPurchaseDetail && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Khóa học">
                            {selectedPurchaseDetail.course}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá">
                            {formatCurrency(selectedPurchaseDetail.price)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giảm giá">
                            {formatCurrency(selectedPurchaseDetail.discount)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phương thức thanh toán">
                            {selectedPurchaseDetail.paymentMethod}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái thanh toán">
                            {selectedPurchaseDetail.paymentStatus}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày mua">
                            {selectedPurchaseDetail.purchaseDate}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người dùng">
                            {selectedPurchaseDetail.user}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {selectedPurchaseDetail.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Loại đăng nhập">
                            {selectedPurchaseDetail.typeLogin}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </>
    );
}

export default AdminPurchasesPage;
