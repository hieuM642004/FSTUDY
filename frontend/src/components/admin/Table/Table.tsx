'use client';

import React, { useState } from 'react';
import { Table as AntTable, Button, Modal, TableProps, Tooltip } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    UndoOutlined, // Icon for restore
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
    onRestore?: (record: T) => void;
    addLink?: string;
    editLink?: (record: T) => string;
    filter?: React.ReactNode;
    restoreLink?: string;
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
    onRestore,
    addLink,
    editLink,
    filter,
    restoreLink,
    report,
    onShowModal,
    ...props
}: TableComponentProps<T>) {
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
                okText: onRestore ? 'Khôi phục' : 'Xóa',
                cancelText: 'Hủy',
            });
        }
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
                {(onDelete || onRestore) && (
                    <Tooltip title={onRestore ? 'Khôi phục' : 'Xóa'}>
                        <Button
                            danger={!onRestore}
                            type={onRestore ? 'primary' : undefined}
                            onClick={() => handleDeleteClick(record)}
                        >
                            {onRestore ? <UndoOutlined /> : <DeleteOutlined />}
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
                {restoreLink ? (
                    <Link href={restoreLink} passHref className="ml-2">
                        <Tooltip title="Khôi phục">
                            <ButtonPrimary
                                className="bg-[#35509a]"
                                icon={<UndoOutlined className="text-white" />}
                            ></ButtonPrimary>
                        </Tooltip>
                    </Link>
                ) : null}
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
