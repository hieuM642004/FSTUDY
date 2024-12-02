'use client';
import React from 'react';
import ExamResults from '@/components/client/ExamResult/ExamResult';

const PageMyStatistics: React.FC = () => {
    return (
        <>
            <div className="pt-5 pb-2">
                <ExamResults />
            </div>
        </>
    );
};

export default PageMyStatistics;
