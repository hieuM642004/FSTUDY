'use client';

import React, { useState } from 'react';
import { Table as AntTable, Button, Modal, TableProps } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Link from 'next/link';

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
    restoreLink?: string; 
    onRestore?: (record: T) => void;
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
        });
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
                    <Button type="primary" onClick={() => handleRestoreClick(record)}>
                       Khôi phục
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
                <Link href={restoreLink} passHref className='ml-2'>
                    <ButtonPrimary
                        
                        className="mb-2 bg-[#35509a]"
                        icon={<DeleteOutlined  className="text-white" />}
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
