'use-client';

import React from 'react';
import { Button } from 'antd';
import './ButtonOuline.scss';
interface OutlineButtonProps {
    label: string;
    to?: string;
    size?: 'large' | 'middle' | 'small';
    className?: string;
    onClick?: () => void;
    htmlType?: "button" | "reset" | "submit" | undefined;
}
const sizeClassMap = {
    large: 'py-4 px-4 w-32 h-10',
    middle: 'py-2 px-3',
    small: ' py-1 px-3',
};

const ButtonOutline: React.FC<OutlineButtonProps> = ({
    label,
    to,
    size = 'middle',
    className = '' ,
    onClick,
    htmlType = "button",
}) => {
    let btnClass = `btn-outline !hover:outline font-semibold ${sizeClassMap[size]} ${className}`;

    return (
        <Button className={btnClass} onClick={onClick} htmlType={htmlType} type="default" href={to}>
            {label}
        </Button>
    );
};

export default ButtonOutline;
