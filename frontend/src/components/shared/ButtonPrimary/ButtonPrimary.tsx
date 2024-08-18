'use client';

import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

interface PrimaryButtonProps {
    label: string;
    to?: string;
    size?: 'large' | 'middle' | 'small';
    className?: string;
    onClick?: () => void;
    htmlType?: "button" | "reset" | "submit" | undefined;
    disabled?: boolean;
    loading?: boolean
}

const sizeClassMap = {
    large: 'py-4 px-4 w-32 h-10',
    middle: 'py-2 px-3',
    small: 'py-1 px-3',
};

const ButtonPrimary: React.FC<PrimaryButtonProps> = ({
    label,
    to,
    size = 'middle',
    className = '',
    onClick,
    htmlType = "button",
    disabled = false,
    loading = false,
}) => {
    let btnClass = `btn-primary font-semibold ${sizeClassMap[size]} ${className}`;

    return to ? (
        <Link href={to}>
            <Button className={btnClass} onClick={onClick} type="primary" htmlType={htmlType} disabled={disabled}>
                {label}
            </Button>
        </Link>
    ) : (
        <Button className={btnClass} onClick={onClick} loading={loading} type="primary" htmlType={htmlType} disabled={disabled}>
            {label}
        </Button>
    );
};

export default ButtonPrimary;
