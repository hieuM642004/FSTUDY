'use client';

import React, { useRef, useState } from 'react';
import { Table as AntTable, Button, Modal, Select, TableProps } from 'antd';
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Typography } from 'antd';
import { Input } from 'antd';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

const { TextArea } = Input;
const { Text } = Typography;
interface TableComponentProps<T> extends TableProps<T> {
    columns: TableProps<T>['columns'];
    dataSource: TableProps<T>['dataSource'];
    pagination?: TableProps<T>['pagination'];
    rowKey?: string | ((record: T) => string);
    onAdd?: () => void;
    onEdit?: (record: T) => void;
    onDelete?: (record: T, valueReport?: string) => void;
    addLink?: string;
    editLink?: (record: T) => string;
    restoreLink?: string;
    onRestore?: (record: T) => void;
    report?: boolean;
}

const arrMessReport = [
    {
        value: null,
        label: 'Xóa (Không gửi thông báo)',
    },
    {
        value: true,
        label: 'Nhập lí do báo cáo bình luận',
    },
    {
        value: 'Nội dung kiêu dâm',
        label: 'Nội dung kiêu dâm',
    },
    {
        value: 'Nội dung bạo lực hoặc phản cảm',
        label: 'Nội dung bạo lực hoặc phản cảm',
    },
    {
        value: 'Nội dung lăng mạ hoặc kích động thù hận',
        label: 'Nội dung lăng mạ hoặc kích động thù hận',
    },
    {
        value: 'Thông tin sai lệch',
        label: 'Thông tin sai lệch',
    },
    {
        value: 'Hành động gây hại hoặc nguy hiểm',
        label: 'Hành động gây hại hoặc nguy hiểm',
    },
    {
        value: 'Nội dung quấy rối bắt nạt',
        label: 'Nội dung quấy rối bắt nạt',
    },
    {
        value: 'Lí do khác',
        label: 'Lí do khác',
    },
];
const onSearch = (value: string) => {
    console.log('search:', value);
};

function Table<T extends object>({
    columns,
    dataSource,
    pagination = undefined,
    rowKey = 'id',
    onAdd,
    onEdit,
    onDelete,
    addLink,
    editLink,
    restoreLink,
    onRestore,
    report,
    ...props
}: TableComponentProps<T>) {
    const [selectedRecord, setSelectedRecord] = useState<T | null>(null);
    const valueReportRef = useRef<string | any>(null);
    const [checkInputRp, setCheckInputRp] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectValue, setSelectValue] = useState<string | null>(null);
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const showModal = () => {
        setIsModalOpen(true);
        resetModalValues();
    };

    const resetModalValues = () => {
        setSelectValue('Xóa (Không gửi thông báo)');
        setTextAreaValue('');
        setCheckInputRp(false);
        valueReportRef.current = null;
    };

    const handleOk = async () => {
        if (onDelete) {
            setConfirmLoading(true);
            onDelete(currentRecord, valueReportRef.current);
            setTimeout(() => {
                setIsModalOpen(false);
                setConfirmLoading(false);
                resetModalValues();
                setCurrentRecord(null);
            }, 500);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        resetModalValues();
    };
    const onChangeRp = (value: string | boolean) => {
        setSelectValue(value as string);
        if (value === true) {
            setCheckInputRp(true);
            valueReportRef.current = null;
        } else {
            setCheckInputRp(false);
            valueReportRef.current = value;
        }
    };
    const onChangeInputRp = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setTextAreaValue(e.target.value);
        valueReportRef.current = e.target.value || null;
    };

    const handleDeleteClick = (record: T) => {
        if (report) {
            showModal();
            setCurrentRecord(record);
        } else {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn xóa?',
                icon: <ExclamationCircleOutlined />,
                content: 'This action cannot be undone.',
                onOk() {
                    if (onDelete) {
                        onDelete(record);
                    }
                },
            });
        }
    };
    const handleRestoreClick = (record: T) => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn khôi phục dữ liệu?',
            icon: <ExclamationCircleOutlined />,
            content: 'Hành động này không thể hoàn tác.',
            onOk() {
                if (onRestore) {
                    onRestore(record);
                }
            },
        });
    };
    const actionColumn = {
        title: '#',
        key: 'actions',
        render: (text: any, record: T) => (
            <>
                {editLink ? (
                    <Link href={editLink(record)} passHref>
                        <Button type="primary" style={{ marginRight: 8 }}>
                            Edit
                        </Button>
                    </Link>
                ) : (
                    onEdit && (
                        <Button
                            type="primary"
                            style={{ marginRight: 8 }}
                            onClick={() => onEdit(record)}
                        >
                            Edit
                        </Button>
                    )
                )}
                {onDelete && (
                    <Button danger onClick={() => handleDeleteClick(record)}>
                        Delete
                    </Button>
                )}
                {onRestore && (
                    <Button
                        type="primary"
                        onClick={() => handleRestoreClick(record)}
                    >
                        Khôi phục
                    </Button>
                )}
            </>
        ),
    };

    return (
        <>
            <Modal
                title="Bạn chắc chắn muốn xóa?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
            >
                <div className="mb-2">
                    <Text mark>Báo cáo bình luận</Text>
                </div>
                <Select
                    className=""
                    showSearch
                    value={selectValue}
                    placeholder="Hãy chọn lí do"
                    optionFilterProp="children"
                    style={{ width: '100%' }}
                    onChange={onChangeRp}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={arrMessReport}
                />
                {checkInputRp === true ? (
                    <>
                        <TextArea
                            showCount
                            maxLength={100}
                            onChange={onChangeInputRp}
                            value={textAreaValue}
                            className="mt-2 mb-2"
                            placeholder="Nhập nội dung báo cáo bình luận"
                        />
                        <Text strong>Không nhập mặc định sẽ xóa thẳng</Text>
                    </>
                ) : null}
            </Modal>
            {addLink ? (
                <Link href={addLink} passHref>
                    <ButtonPrimary
                        className="mb-2 bg-[#35509a]"
                        icon={<PlusOutlined className="text-white" />}
                    ></ButtonPrimary>
                </Link>
            ) : (
                onAdd && (
                    <ButtonPrimary
                        onClick={onAdd}
                        className="mb-2 bg-[#35509a]"
                        icon={<PlusOutlined className="text-white" />}
                    ></ButtonPrimary>
                )
            )}
            {restoreLink ? (
                <Link href={restoreLink} passHref className="ml-2">
                    <ButtonPrimary
                        className="mb-2 bg-[#35509a]"
                        icon={<DeleteOutlined className="text-white" />}
                    ></ButtonPrimary>
                </Link>
            ) : (
                ''
            )}
            <AntTable
                columns={
                    Array.isArray(columns)
                        ? [...columns, actionColumn]
                        : [actionColumn]
                }
                dataSource={dataSource}
                pagination={pagination}
                rowKey={rowKey}
                {...props}
            />
        </>
    );
}

export default Table;
