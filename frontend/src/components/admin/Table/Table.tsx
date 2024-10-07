'use client';

import React, { useState } from 'react';
import { Table as AntTable, Button, Modal, TableProps, Tooltip } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

interface TableComponentProps<T> extends TableProps<T> {
    columns: TableProps<T>['columns'];
    dataSource: TableProps<T>['dataSource'];
    pagination?: TableProps<T>['pagination'];
    rowKey?: string | ((record: T) => string);
    onAdd?: () => void;
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    addLink?: string;
    editLink?: (record: T) => string;
    filter?: React.ReactNode;
}

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
    filter,
    ...props
}: TableComponentProps<T>) {
    const [selectedRecord, setSelectedRecord] = useState<T | null>(null);

    const handleDeleteClick = (record: T) => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn xóa?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            onOk() {
                if (onDelete) {
                    onDelete(record);
                }
            },
            okText: 'Đồng ý',
            cancelText: 'Huỷ',
        });
    };

    const actionColumn = {
        title: 'Hành động',
        key: 'actions',
        render: (text: any, record: T) => (
            <div className="flex space-x-2">
                {editLink ? (
                    <Link href={editLink(record)} passHref>
                        <Button
                            type="primary"
                            className="flex items-center justify-center p-2 md:p-3"
                        >
                            <EditOutlined />
                        </Button>
                    </Link>
                ) : (
                    onEdit && (
                        <Button
                            type="primary"
                            className="flex items-center justify-center p-2 md:p-3"
                            onClick={() => onEdit(record)}
                        >
                            <EditOutlined />
                        </Button>
                    )
                )}
                {onDelete && (
                    <Tooltip title="Xóa">
                        <Button
                            danger
                            className="flex items-center justify-center p-2 md:p-3"
                            onClick={() => handleDeleteClick(record)}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Tooltip>
                )}
            </div>
        ),
    };

    return (
        <>
            <div className="flex items-center space-x-4 mb-2">
                {addLink ? (
                    <Link href={addLink} passHref>
                        <Tooltip title="Thêm">
                            <ButtonPrimary
                                className="bg-[#35509a]"
                                icon={<PlusOutlined className="text-white" />}
                            ></ButtonPrimary>
                        </Tooltip>
                    </Link>
                ) : (
                    onAdd && (
                        <Tooltip title="Thêm">
                            <ButtonPrimary
                                onClick={onAdd}
                                className="bg-[#35509a]"
                                icon={<PlusOutlined className="text-white" />}
                            ></ButtonPrimary>
                        </Tooltip>
                    )
                )}
                {filter && <div>{filter}</div>}
            </div>
            <AntTable
                columns={
                    Array.isArray(columns)
                        ? [...columns, actionColumn]
                        : [actionColumn]
                }
                dataSource={Array.isArray(dataSource) ? dataSource : []}
                pagination={pagination}
                rowKey={rowKey}
                {...props}
            />
        </>
    );
}

export default Table;
