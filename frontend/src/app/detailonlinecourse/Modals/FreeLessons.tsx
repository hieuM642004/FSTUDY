import React, { useState } from 'react';
import {  Modal } from 'antd';

import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';
import ItemFreeLessons from './ItemFreeLessons';

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
                {/* Item bài học miễn phí  */}
               <ItemFreeLessons/>
               <ItemFreeLessons/>
               <ItemFreeLessons/>
               <ItemFreeLessons/>
            </Modal>
        </>
    );
}

export default FreeLessons;
