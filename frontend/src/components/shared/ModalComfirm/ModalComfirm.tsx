// ConfirmModal.tsx
'use client';
import React from 'react';
import { Modal } from 'antd';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import './ModalConfirm.scss';
interface ConfirmModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, message, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm(); // Call the confirm handler passed as a prop
  };

  const handleCancel = () => {
    onCancel(); // Call the cancel handler passed as a prop
  };

  return (
    <Modal
      title="Xác nhận"
      visible={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      okText='có'
      cancelText="Không"
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmModal;
