'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import io from 'socket.io-client';
import moment from 'moment';

import Table from '@/components/admin/Table/Table';
import iconUser from '../../../../public/images/user_icon.webp';
import { SOCKET_SERVER_URL } from '@/constant/api';

interface DataType {
    [x: string]: any;
    avatar?: string;
    childTopics?: any[];
    comments?: any[];
    content?: string;
    createdAt?: string;
    date?: string;
    likes?: string[];
    slug?: string;
    status?: string;
    title?: string;
    updatedAt?: string;
    user?: any;
    __v?: number;
    _id?: string;
}
moment.locale('vi');

const columns = [
    {
        title: 'Ảnh đại diện',
        dataIndex: 'idUser',
        key: 'idUser',
        render: (value: string | any) =>
            value?.avatar ? (
                <Image
                    src={value?.avatar}
                    width={50}
                    height={50}
                    alt="FSTUDY"
                />
            ) : (
                <Image src={iconUser} width={50} height={50} alt="FSTUDY" />
            ),
    },
    {
        title: 'Người bình luận',
        dataIndex: 'idUser',
        key: 'idUser',
        render: (value: any | string) => {
            return value ? value?.fullname : '';
        },
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Loại',
        dataIndex: 'idBlog',
        render: (idBlog: string) => {
            return idBlog ? 'Blog' : 'Course';
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: Date) => {
            return moment(createdAt).format('DD/MM/YYYY HH:mm:ss');
        },
    },
];

function Comment() {
    const socketRef: any = useRef(null);
    const [CheckSubmit, setCheckSubmit] = useState(false);

    const [dataSource, setDataSource] = useState<DataType[] | any>(undefined);
    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL);

        socketRef.current.timeout(3000).on('comments', (data: any) => {
            setDataSource(data);
        });

        socketRef.current.emit('requestComments', {});
        socketRef.current.emit('joinRoom', {});

        return () => {
            socketRef.current.disconnect();
        };
    }, [CheckSubmit]);

    const handleDelete = async (
        record: DataType,
        valueReport: string | any,
    ) => {
        if (record) {
            const email = record?.idUser?.email;
            //  submit sever
            const idCmt = record._id;
            const idBlog = record.idBlog;
            const idCourse = record.idCourse;
            socketRef.current.emit(
                'deleteComment',
                idCmt,
                idBlog,
                idCourse,
                email,
                valueReport,
            );

            setCheckSubmit(!CheckSubmit);
        }
    };
    return (
        <>
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                onDelete={handleDelete}
                report={true}
            />
        </>
    );
}

export default Comment;
