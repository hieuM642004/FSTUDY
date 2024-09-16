import { Modal, Form, RadioChangeEvent, Radio, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PurchaseService from '@/services/purchase/PurchaseService';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { fetchUserData } from '@/lib/redux/features/user/userSlice';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import logoVnpay from '/public/images/logoVnpay.png';
import logoMomo from '/public/images/logoMomo.jpg';

const RegisterNow = ({ idCourse }: String | any) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const [value, setValue] = useState(1);
    const dispatch = useAppDispatch();
    const dataUser = useTypedSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);
    const onFinish = async () => {
        const userId = dataUser?.id;
        const courseId = idCourse;
        if (value === 1) {
            const response: string | any = await PurchaseService.purchaseMomo({
                userId,
                courseId,
            });
            if (response) {
                router.push(response?.payUrl);
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'KÍCH HOẠT KHÓA HỌC THẤT BẠI',
                });
            }
        } else {
            const response: string | any = await PurchaseService.purchaseVnpay({
                userId,
                courseId,
            });

            if (response) {
                router.push(response?.paymentUrl);
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'KÍCH HOẠT KHÓA HỌC THẤT BẠI',
                });
            }
        }
    };

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <>
            {contextHolder}
            <ButtonPrimary
                onClick={showModal}
                size="large"
                label="Đăng kí học ngay"
                className="w-full uppercase"
            />
            <Modal
                title="Mua khoá học: Combo khoá học IELTS Intensive"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <h3 className="font-bold text-lg">
                    Thanh toán trực tiếp để học khóa học ngay
                </h3>
                {dataUser?.id ? (
                    <>
                        {' '}
                        <Form
                            {...layout}
                            name="nest-messages"
                            onFinish={onFinish}
                            style={{ maxWidth: 600 }}
                            className="my-3"
                        >
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>
                                    THANH TOÁN MOMO
                                    <Image
                                        src={logoMomo}
                                        width={50}
                                        height={50}
                                        alt="VNPAY"
                                    />
                                </Radio>
                                <Radio value={2}>
                                    THANH TOÁN VNPAY
                                    <Image
                                        src={logoVnpay}
                                        width={50}
                                        height={50}
                                        alt="VNPAY"
                                    />
                                </Radio>
                            </Radio.Group>
                            <ButtonPrimary
                                htmlType="submit"
                                size="middle"
                                label="Thanh Toán"
                                className="w-full uppercase flex justify-center  mb-3 mt-3"
                            />
                        </Form>{' '}
                    </>
                ) : (
                    <>
                        <Link
                            className="mb-4 text-[#213261] text-lg my-5"
                            href="/login"
                        >
                            Vui lòng đăng nhập để thanh toán
                        </Link>
                    </>
                )}

                <div>
                    <a href="" className="block mb-4 text-[#213261]">
                        Điều khoản và điều kiện giao dịch
                    </a>
                    <a href="" className="mb-4 text-[#213261]">
                        Hướng dẫn thanh toán
                    </a>
                </div>
            </Modal>
        </>
    );
};

export default RegisterNow;
