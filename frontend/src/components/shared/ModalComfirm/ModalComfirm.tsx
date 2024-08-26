// ConfirmModal.tsx
'use client';
import React from 'react';
import { Modal } from 'antd';
import './ModalConfirm.scss';

interface ConfirmModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, message, onConfirm, onCancel, okText = 'Có', cancelText = 'Hủy' }) => {
  const handleConfirm = () => {
    onConfirm(); 
  };

  const handleCancel = () => {
    onCancel(); 
  };

  return (
    <Modal
      title="Xác nhận"
      open={visible}
      onOk={handleConfirm}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmModal;
