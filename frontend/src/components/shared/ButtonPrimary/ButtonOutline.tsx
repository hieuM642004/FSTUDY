'use-client';

import React from 'react';
import { Button } from 'antd';

interface OutlineButtonProps {
    label: string;
    to?: string;
    size?: 'large' | 'middle' | 'small';
    className?: string;
    onClick?: () => void;
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
}) => {
    let btnClass = `btn-outline font-semibold ${sizeClassMap[size]} ${className}`;

    return (
        <Button className={btnClass} onClick={onClick} type="default" href={to}>
            {label}
        </Button>
    );
};

export default ButtonOutline;
