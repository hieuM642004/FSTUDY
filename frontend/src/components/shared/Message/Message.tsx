'use client';

import React, { useEffect } from 'react';
import { message } from 'antd';

interface CustomMessageProps {
    type: 'success' | 'error' | 'warning';
    content: string;
    onClose?: () => void;
}

const Message: React.FC<CustomMessageProps> = ({ type, content, onClose }) => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const key = `msg_${Date.now()}`;
        const updateMessage = () => {
            messageApi.open({
                key,
                type,
                content,
            });

            const timer = setTimeout(() => {
                messageApi.destroy(key);
                if (onClose) onClose();
            }, 3000);

            return () => clearTimeout(timer); // Cleanup timer on component unmount or update
        };

        updateMessage();
    }, [type, content, messageApi, onClose]);

    return contextHolder;
};

export default Message;
