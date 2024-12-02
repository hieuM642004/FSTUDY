'use client';
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Link from 'next/link';

import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';

const FreeLessons = ({ data }: { data: any }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [checkIsFree, setCheckIsFree] = useState(false);
    const [stateData, setStateData] = useState(data);
    const checkFree = '';
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        setStateData(data);
        console.log('test', stateData);
    }, [data]);

    return (
        <>
            <ButtonOutline
                onClick={showModal}
                size="large"
                label="Học thử miễn phí"
                className="w-full uppercase mt-2 text-[#71869d]"
            />
            <Modal
                open={open}
                title="Lựa chọn bài học miễn phí"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
                width={850}
            >
                <div className="mt-6 flex">
                    {stateData && (
                        <>
                            <>
                                <div className="mb-4 mr-4 uppercase text-[#677788] w-[20%] text-center spac font-bold text-[.95rem] tracking-wide">
                                    <span>Khóa học</span>
                                </div>
                                <div className="pb-8 border-b-2 w-full">
                                    <h3 className="mb-4 font-bold text-[1.2rem]">
                                        {stateData.title}
                                    </h3>
                                    <ol>
                                        {stateData.lessons?.map(
                                            (item: any, index: any) => (
                                                <li className="flex justify-between hover:bg-[#ececec] p-2 cursor-pointer">
                                                    <Link
                                                        href={`/trylearning/${stateData._id}`}
                                                        className="text-black"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    {/* <div className="bg-[#76a5fb] p-[0.2rem] text-white font-medium rounded-lg">
                                                        Học thử
                                                      
                                                    </div> */}
                                                    {item?.isFree ? (
                                                        <div className="bg-[#76a5fb] p-[0.2rem] text-white font-medium rounded-lg">
                                                            Học thử
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </li>
                                            ),
                                        )}
                                    </ol>
                                </div>
                            </>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default FreeLessons;
