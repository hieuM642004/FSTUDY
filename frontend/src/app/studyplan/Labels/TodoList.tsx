import React, { useState } from 'react';
import {
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import { Form, Select, Input } from 'antd';

import Modals from '../Modals/Modal';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

function TodoList() {
    // modal todolist
    const [Opentodolist, setOpentodolist] = useState(false);
    const [IdTodolist, setIdTodolist] = useState<string>();

    const showModal = (id?: string) => {
        if (id) {
            setIdTodolist(id);
            setOpentodolist(true);
        } else {
            setIdTodolist(undefined);
            setOpentodolist(true);
        }
    };

    const handleCancel = () => {
        setOpentodolist(false);
    };
    const onFinish = (values: any) => {
        console.log(values);
    };

    // modal task
    const [openTask, setopenTask] = useState(false);
    const [idTask, setidTask] = useState<string>();

    const showModaltask = (id?: string) => {
        if (id) {
            setidTask(id);
            setopenTask(true);
        } else {
            setidTask(undefined);
            setopenTask(true);
        }
    };

    const handleCanceltask = () => {
        setopenTask(false);
    };
    return (
        <>
            <p
                onClick={() => {
                    showModal();
                }}
                className="mb-1  bg-[#f8f9fa] py-1 px-4 rounded-full w-36 cursor-pointer hover:bg-[#d1e2ff]"
            >
                + Thêm To-do list
            </p>
            <p className="text-red-600 mb-3">
                Click vào mỗi task để chỉnh sửa hoặc vào nút X màu đỏ để xóa.
            </p>
            <Modals handleCancel={handleCancel} open={Opentodolist}>
                <h3 className="text-3xl font-bold mb-4">
                    {IdTodolist ? 'Chỉnh sửa To-do list' : 'Tạo To-do list'}
                </h3>
                <p className="font-bold text-lg mb-2">
                    Bạn sẽ thực hiện todolist này vào lúc nào?
                </p>
                <p className="mb-1">
                    Nhập 2,3,4...8 cho thứ 2,3,4...CN. Nhập 1-31 cho các ngày
                    trong tháng. Có thể nhập tối đa 5 ngày, cách nhau bằng dấu
                    phẩy.
                </p>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <div className="flex">
                        <Form.Item
                            label="Dạng schedule"
                            name=""
                            className="w-[48%]"
                        >
                            <Select>
                                <Select.Option value="daily">
                                    Hàng ngày
                                </Select.Option>
                                <Select.Option value="Day of the week">
                                    Ngày trong tuần
                                </Select.Option>
                                <Select.Option value="Day in month">
                                    Ngày trong tháng
                                </Select.Option>
                                <Select.Option value="Do it during the day">
                                    Làm trong ngày
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="typeDay"
                            label="Ngày schedule"
                            className="w-[48%] ml-2"
                        >
                            <Input placeholder="" />
                        </Form.Item>
                    </div>

                    <Form.Item name="Title" label="Tên / tiêu đề">
                        <Input placeholder="" />
                    </Form.Item>
                    <div className="flex justify-end">
                        <ButtonPrimary
                            htmlType="submit"
                            size="small"
                            label="Lưu"
                            className="flex justify-center mb-3"
                        />
                    </div>
                </Form>
            </Modals>

            <div className="overflow-y-auto w-full h-44">
                {/*  list item task */}
                <div className="rounded-xl bg-[#f8f9fa] p-2 mb-2 mr-2 border border-[#e0e0e0] h-full 	w-[15rem] overflow-x-auto	inline-block">
                    <div>
                        <div>
                            <span className="px-[3px] py-[1px] rounded-lg font-bold text-white bg-[#09a5be]">
                                {' '}
                                hoc từ vựng{' '}
                            </span>
                            <div
                                onClick={() => {
                                    showModal('1213');
                                }}
                                className="inline-block mx-2 text-blue-600"
                            >
                                <EditOutlined className="text-xl cursor-pointer" />
                            </div>
                            <div
                                className="inline-block "
                                onClick={() => {
                                    if (confirm('Bạn có chắc chắn muốn xóa?')) {
                                        //    xóa
                                    } else {
                                        //    hủy
                                    }
                                }}
                            >
                                <DeleteOutlined className="text-xl cursor-pointer text-red-600" />
                            </div>
                            {/* add task */}
                            <div>
                                <p
                                    onClick={() => {
                                        showModaltask();
                                    }}
                                    className="w-full border my-1 border-gray-400 rounded-lg
                                   bg-white p-[1px] hover:cursor-pointer hover:border-[#35509a] pl-1"
                                >
                                    <PlusCircleOutlined  className='mr-1'/>
                                    Thêm task
                                </p>{' '}
                                {/* modal task */}
                                <Modals
                                    handleCancel={handleCanceltask}
                                    open={openTask}
                                >
                                    <h3 className="text-3xl font-bold mb-4">
                                        {idTask
                                            ? 'Chỉnh sửa task'
                                            : ' Thêm task'}
                                    </h3>
                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        layout="vertical"
                                    >
                                        <Form.Item
                                            label="Tên task"
                                            name="nametask"
                                        >
                                            <Input.TextArea rows={6} />
                                        </Form.Item>
                                        <div className="flex justify-end">
                                            <ButtonPrimary
                                                htmlType="submit"
                                                size="small"
                                                label="Lưu"
                                                className="flex justify-center mb-3"
                                            />
                                        </div>
                                    </Form>
                                </Modals>
                            </div>
                        </div>
                        {/* list task */}
                        <ul className="pl-4 ">
                            <li className="task cursor-pointer hover:text-[#35509a]">
                                {' '}
                                <div className="  inline relative ">
                                    <span
                                        onClick={() => {
                                            showModaltask('123');
                                        }}
                                    >
                                        <CheckOutlined className="mr-1" />
                                        Anh trực tuyến hàng đầu
                                    </span>

                                    <span
                                        className="hidden-element"
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    'Bạn có chắc chắn muốn xóa?',
                                                )
                                            ) {
                                                //    xóa
                                            } else {
                                                //    hủy
                                            }
                                        }}
                                    >
                                        x
                                    </span>
                                </div>
                            </li>
                            <li className="task cursor-pointer hover:text-[#35509a]">
                                {' '}
                                <div className="  inline relative">
                                    <span
                                        onClick={() => {
                                            showModaltask('123');
                                        }}
                                    >
                                        <CheckOutlined className="mr-1" />
                                        Công ty giáo dục FSTUDY
                                    </span>

                                    <span
                                        className="hidden-element"
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    'Bạn có chắc chắn muốn xóa?',
                                                )
                                            ) {
                                                //    xóa
                                            } else {
                                                //    hủy
                                            }
                                        }}
                                    >
                                        x
                                    </span>
                                </div>
                            </li>
                            <li className="task cursor-pointer hover:text-[#35509a]">
                                {' '}
                                <div className="  inline relative">
                                    <span
                                        onClick={() => {
                                            showModaltask('123');
                                        }}
                                    >
                                        <CheckOutlined className="mr-1" />
                                        Giấy chứng nhận Đăng ký doanh nghiệp số
                                    </span>

                                    <span
                                        className="hidden-element"
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    'Bạn có chắc chắn muốn xóa?',
                                                )
                                            ) {
                                                //    xóa
                                            } else {
                                                //    hủy
                                            }
                                        }}
                                    >
                                        x
                                    </span>
                                </div>
                            </li>
                            <li className="task cursor-pointer hover:text-[#35509a]">
                                {' '}
                                <div className="  inline relative">
                                    <span
                                        onClick={() => {
                                            showModaltask('123');
                                        }}
                                    >
                                        <CheckOutlined className="mr-1" />
                                        hoc dem
                                    </span>

                                    <span
                                        className="hidden-element"
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    'Bạn có chắc chắn muốn xóa?',
                                                )
                                            ) {
                                                //    xóa
                                            } else {
                                                //    hủy
                                            }
                                        }}
                                    >
                                        x
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoList;
