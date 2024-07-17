'use client';
import React from 'react';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import ExamResults from '@/components/client/ExamResult/ExamResult';

const PageMyStatistics: React.FC = () => {
    return (
        <>
            <div className="pt-5 pb-2 ">
                <ButtonPrimary
                    size={'large'}
                    label={' Thống kê kết quả'}
                    className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-3xl h-10"
                />
            </div>
            <div className="pt-5 pb-2 ">
                <ExamResults />
            </div>
        </>
    );
};

export default PageMyStatistics;
