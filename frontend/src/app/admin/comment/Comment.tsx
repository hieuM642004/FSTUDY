'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import io from 'socket.io-client';
import moment from 'moment';
import { Modal, Select, Typography, Input, message } from 'antd';

import Table from '@/components/admin/Table/Table';
import iconUser from '../../../../public/images/user_icon.webp';
import { SOCKET_SERVER_URL } from '@/constant/api';

const { Text } = Typography;
const { TextArea } = Input;

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
function Comment() {
    const [messageApi, contextHolder] = message.useMessage();

    const socketRef: any = useRef(null);
    const [CheckSubmit, setCheckSubmit] = useState(false);
    // handler modal
    const valueReportRef = useRef<string | any>(null);
    const [checkInputRp, setCheckInputRp] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectValue, setSelectValue] = useState<string | null>(null);
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const showModal = (record: any) : void => {
        setCurrentRecord(record);
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
        setConfirmLoading(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setConfirmLoading(false);
            resetModalValues();
            setCurrentRecord(null);
        }, 500);
        if (currentRecord) {
            const email = currentRecord?.idUser?.email;
            //  submit sever
            const idCmt = currentRecord._id;
            const idBlog = currentRecord.idBlog;
            const idCourse = currentRecord.idCourse;
            socketRef.current.emit(
                'deleteComment',
                idCmt,
                idBlog,
                idCourse,
                email,
                valueReportRef.current,
            );

            setCheckSubmit(!CheckSubmit);
            messageApi.open({
                type: 'success',
                content: 'XÓA THÀNH CÔNG',
            });
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

    return (
        <>
        {contextHolder}
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
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                onDelete={handleOk}
                report={true}
                onShowModal={showModal}
            />
        </>
    );
}

export default Comment;
