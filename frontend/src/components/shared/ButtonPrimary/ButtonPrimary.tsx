'use-client';

import React from 'react';
import { Button } from 'antd';

interface PrimaryButtonProps {
    label: string;
    to?: string;
    size?: 'large' | 'middle' | 'small';
    className?: string;
    onClick?: () => void;
    htmlType?: "button" | "reset" | "submit" | undefined ,
    iconbtn? : any
}
const sizeClassMap = {
    large: ' py-4 px-4',
    middle: 'py-2 px-3',
    small: ' py-1 px-3',
};

const ButtonPrimary: React.FC<PrimaryButtonProps> = ({
    label,
    to,
    size = 'middle',
    className = '',
    onClick,
    htmlType ,
    iconbtn 
}) => {
    let btnClass = `btn-primary font-semibold ${sizeClassMap[size]} ${className}`;

    return ( 
        <Button className={btnClass} onClick={onClick} type="primary" href={to} htmlType={htmlType}>
            {iconbtn}
            {label}
        </Button>
    );
};

export default ButtonPrimary;
