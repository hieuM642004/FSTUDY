import React, { useState } from 'react';
import {  Modal } from 'antd';

import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';

function FreeLessons() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

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
                    <div className="mb-4 mr-4 uppercase text-[#677788] w-[20%] text-center spac font-bold text-[.95rem] tracking-wide	">
                        Khóa học <span>1</span>
                    </div>
                    <div className="pb-8    border-b-2">
                        <h3 className="mb-4 font-bold text-[1.2rem]">
                            [IELTS Intensive Listening] Chiến lược làm bài -
                            Chữa đề - Luyện nghe IELTS Listening theo phương
                            pháp Dictation
                        </h3>
                        <ol>
                            <li className="flex justify-between hover:bg-[#ececec] p-2   cursor-pointer	 ">
                                <div>
                                    <span> 1. </span> Hướng dẫn làm dạng
                                    Multiple Choice Question
                                </div>{' '}
                                <div className='bg-[#76a5fb] p-[0.2rem] text-white font-medium rounded-lg '>Học thử</div>
                            </li>
                            <li className="flex justify-between hover:bg-[#ececec] p-2   cursor-pointer	 ">
                                <div>
                                    <span> 2. </span> Hướng dẫn làm dạng
                                    Multiple Choice Question
                                </div>{' '}
                                <div className='bg-[#76a5fb] p-[0.2rem] text-white font-medium rounded-lg '>Học thử</div>
                            </li>
                            <li className="flex justify-between hover:bg-[#ececec] p-2   cursor-pointer	 ">
                                <div>
                                    <span> 3. </span> Hướng dẫn làm dạng
                                    Multiple Choice Question
                                </div>{' '}
                                <div className='bg-[#76a5fb] p-[0.2rem] text-white font-medium rounded-lg '>Học thử</div>
                            </li>
                        </ol>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default FreeLessons;
