'use client';

import React, { useState } from 'react';
import { Table as AntTable, Button, Modal, TableProps } from 'antd';
import {
    DeleteOutlined,
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
    onDelete?: (record: T, valueReport?: string) => void;
    addLink?: string;
    editLink?: (record: T) => string;
    restoreLink?: string;
    onRestore?: (record: T) => void;
    report?: boolean;
    onShowModal?: (record: T) => void;
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
    restoreLink,
    onRestore,
    report,
    onShowModal,
    ...props
}: TableComponentProps<T>) {
    const [selectedRecord, setSelectedRecord] = useState<T | null>(null);

    const handleDeleteClick = (record: T) => {
        if (report && onShowModal) {
            onShowModal(record);
        } else {
            Modal.confirm({
                title: onRestore
                    ? 'Bạn chắc chắn muốn khôi phục dữ liệu?'
                    : 'Bạn chắc chắn muốn xóa?',
                icon: <ExclamationCircleOutlined />,
                content: 'Hành động này không thể hoàn tác.',
                onOk() {
                    if (onRestore) {
                        onRestore(record);
                    } else if (onDelete) {
                        onDelete(record);
                    }
                },
            });
        }
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
                {(onDelete || onRestore) && (
                    <Button
                        danger={!onRestore}
                        type={onRestore ? 'primary' : undefined}
                        onClick={() => handleDeleteClick(record)}
                    >
                        {onRestore ? 'Khôi phục' : 'Xóa'}
                    </Button>
                )}
            </>
        ),
    };

    return (
        <>
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
