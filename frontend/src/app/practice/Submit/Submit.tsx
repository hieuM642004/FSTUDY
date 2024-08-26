'use client';

import ButtonPrimary from "@/components/shared/ButtonPrimary/ButtonPrimary";
import ConfirmModal from "@/components/shared/ModalComfirm/ModalComfirm";
import { useState } from "react";
import CountDown from "../CountDown";

function Submit({ onPause, onResume, pausedTime }: any) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleShowModal = () => {
        if (onPause) {
            onPause();  // Tạm dừng bộ đếm khi người dùng nhấn "Nộp bài"
        }
        setIsModalVisible(true);
    };

    const handleConfirm = () => {
        console.log("Thời gian dừng lại:", pausedTime);
        // Thực hiện hành động nộp bài với giá trị thời gian đã dừng
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        if (onResume) {
            onResume();  // Tiếp tục bộ đếm thời gian khi người dùng chọn "Không"
        }
    };

    return (
        <>
            <ButtonPrimary
                label="Nộp bài"
                className="mt-2"
                size="large"
                onClick={handleShowModal}
            />
          
            <ConfirmModal
                message="Bạn có chắc chắn muốn nộp bài?"
                visible={isModalVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                okText="Có"
                cancelText="Không"
            />
        </>
    );
}

export default Submit;
