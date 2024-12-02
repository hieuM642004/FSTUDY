'use client';
import React, { useEffect, useState } from 'react';
import 'moment/locale/vi';
import Image from 'next/image';
import moment from 'moment';
import { message } from 'antd';
import { Typography } from 'antd';

import Table from '@/components/admin/Table/Table';
import UserService from '@/services/user/UserService';
import iconUser from '../../../../../public/images/user_icon.webp';

const { Title } = Typography;

interface DataType {
    _id?: string | null;
    avatar?: string;
    fullname?: string;
    email: string;
    role?: string;
    createdAt?: Date;
    typeLogin?: string;
}

moment.locale('vi');
const columns = [
    {
        title: 'Hình ảnh',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (image: string | any) =>
            image ? (
                <Image src={image} width={50} height={50} alt="FSTUDY" />
            ) : (
                <Image src={iconUser} width={50} height={50} alt="FSTUDY" />
            ),
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullname',
        key: 'fullname',
    },

    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Quyền',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Kiểu đăng nhập',
        dataIndex: 'typeLogin',
        key: 'typeLogin',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: Date) => moment(createdAt).format('LLL'),
    },
];

function PageRestoreUser() {
    const [dataSource, setDataSource] = useState<DataType[] | undefined>(
        undefined,
    );
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        getAllUser();
    }, []);

    const handleRestore = async (record: DataType) => {
        console.log(record);

        if (record._id) {
            const res = await UserService.restoreUser(record._id);
            if (res) {
                messageApi.open({
                    type: 'success',
                    content: 'KHÔI PHỤC THÀNH CÔNG!',
                });
                getAllUser();
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'KHÔI PHỤC THẤT BẠI!',
                });
            }
        }
    };
    const getAllUser = async () => {
        try {
            const res = await UserService.getAllUser({});
            const data = typeof res === 'string' ? JSON.parse(res) : res;

            if (data?.users) {
                const activeItems = data.users.filter(
                    (item: any | any[]) => item.active === false,
                );
                setDataSource(activeItems);
            } else {
                setDataSource([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Title keyboard level={3}>Mục đã xóa</Title>
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                onRestore={handleRestore}
            />
            {contextHolder}
        </div>
    );
}

export default PageRestoreUser;
