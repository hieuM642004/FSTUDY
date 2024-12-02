'use client';
import React, { useEffect, useState } from 'react';
import 'moment/locale/vi';
import Image from 'next/image';
import moment from 'moment';
import { message, Button, Select, Input, Spin } from 'antd';
import { debounce } from 'lodash';
import { FileSearchOutlined } from '@ant-design/icons';

import Table from '@/components/admin/Table/Table';
import UserService from '@/services/user/UserService';
import iconUser from '../../../../public/images/user_icon.webp';

const { Option } = Select;

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

function User() {
    const [dataSource, setDataSource] = useState<DataType[] | undefined>(undefined);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('0');
    const [userTypes, setUserTypes] = useState<
    { label: string; value: string }[]
>([
    { label: 'Tất cả', value: '0' },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
]);
const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = () => {
        debouncedFetchData();
    };

    const handleDelete = async (record: DataType) => {
        if (record.role === 'admin' || record.typeLogin === 'google') {
            messageApi.open({
                type: 'error',
                content: 'Bạn không thể xóa tài khoản quản trị và google!',
            });
        } else {
            if (record._id) {
                const res = await UserService.deleteUser(record._id);
                if (res) {
                    messageApi.open({
                        type: 'success',
                        content: 'XÓA THÀNH CÔNG!',
                    });
                    debouncedFetchData()
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'XÓA THẤT BẠI!',
                    });
                }
            }
        }
    };


  
    const debouncedFetchData = debounce(async () => {
        try {
            setLoading(true);
            let query = '?page=1&limit=0&';

            if (activeTab !== '0') {
                query += `userType=${activeTab}`;
            }

            if (searchQuery) {
                query += (query ? '&' : '') + `email=${searchQuery}`;
            }

            const res = await  UserService.getAllUserSreach(query);
           
            const data = typeof res === 'string' ? JSON.parse(res) : res;

            if (data?.users) {
                const activeItems = data.users.filter((item: any) => item.active === true).reverse();;
                
                setDataSource(activeItems);
            } else {
                setDataSource([]);
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
        } finally {
            setLoading(false);
        }
    }, 600);

    useEffect(() => {
        debouncedFetchData();
    }, [activeTab, searchQuery]);
    const filterComponent = (
        <div className="flex items-center space-x-2">
            <Select
                value={activeTab}
                onChange={(value) => {
                    setActiveTab(value);
                }}
                style={{ width: 200 }}
            >
                {userTypes.map((item, index) => (
                    <Option key={index} value={item.value}>
                        {item.label}
                    </Option>
                ))}
            </Select>

            <Input
                type="text"
                placeholder="Tìm kiếm người dùng"
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
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                onDelete={handleDelete}
                filter={filterComponent}
                addLink="/admin/user/actionuser"
                editLink={(record:any) => `/admin/user/actionuser/${record._id}`}
                restoreLink="/admin/user/restore"
            />
        )}
            {contextHolder}
        </div>
    );
}

export default User;
