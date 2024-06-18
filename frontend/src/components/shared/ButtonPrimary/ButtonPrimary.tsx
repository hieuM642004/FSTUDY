'use-client';

import React from 'react';
import { Button } from 'antd';

interface PrimaryButtonProps {
    label: string;
    to?: string;
    size?: 'large' | 'middle' | 'small';
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
}) => {
    let btnClass = `btn-primary font-semibold ${sizeClassMap[size]}`;

    return (
        <Button className={btnClass} type="primary" href={to}>
            {label}
        </Button>
    );
};

export default ButtonPrimary;
