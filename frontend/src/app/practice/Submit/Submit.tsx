'use client';

import ButtonPrimary from "@/components/shared/ButtonPrimary/ButtonPrimary";
import ConfirmModal from "@/components/shared/ModalComfirm/ModalComfirm";
import { useState } from "react";

function Submit() {
    const [isModalVisible, setIsModalVisible] = useState(false);
const handleShowModal = () => {
    setIsModalVisible(true);
}
    const handleConfirm = () => {
        setIsModalVisible(false);
    }
    const handleCancel=()=>{
        setIsModalVisible(false)
    }
    return (  <> <ButtonPrimary label="Nộp bài" className="mt-2" size='large' onClick={handleShowModal}/>
    <ConfirmModal
                message="Bạn có chắc chắn muốn nộp bài?"
                visible={isModalVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                okText='Có'
                cancelText="Không"
            />
     </>);
}

export default Submit;