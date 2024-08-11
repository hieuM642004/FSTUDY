'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface ButtonBackProps {
  label?: string;
  size?: 'large' | 'middle' | 'small';
  className?: string;
}

const sizeClassMap = {
  large: 'py-4 px-4 w-32 h-10',
  middle: 'py-2 px-3',
  small: 'py-1 px-3',
};

const ButtonBack: React.FC<ButtonBackProps> = ({
  label = 'Back',
  size = 'middle',
  className = '',
}) => {
  const router = useRouter();
  let btnClass = `bg-white text-black !hover:bg-gray-100 font-semibold ${sizeClassMap[size]} ${className}`;

  const handleBack = () => {
    router.back();
  };

  return (
    <Button className={btnClass} onClick={handleBack} type="primary" icon={<ArrowLeftOutlined />}>
      {label}
    </Button>
  );
};

export default ButtonBack;
