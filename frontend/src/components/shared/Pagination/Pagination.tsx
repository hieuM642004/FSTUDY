import React from 'react';
import Link from 'next/link';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './Pagination.scss';

function Pagination({ currentPage, totalPages, onPageChange }: any) {
    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="rounded-lg mt-3">
            <span
                className={`inline-block px-3 py-2 border text-[#35509a] rounded-l-lg ${
                    currentPage == 1
                        ? 'cursor-not-allowed'
                        : 'hover:bg-[#eceef0] cursor-pointer'
                }`}
                onClick={handlePrevClick}
            >
                <LeftOutlined />
            </span>
            {[...Array(totalPages)].map((_, index) => (
                <span
                    key={index}
                    className={`inline-block px-3 py-2 text-[#35509a] border ${
                        currentPage == index + 1 ? 'activepanation' : ''
                    } hover:bg-[#eceef0] cursor-pointer`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </span>
            ))}
            <span
                className={`inline-block px-3 py-2 text-[#35509a] border rounded-r-lg ${
                    currentPage == totalPages
                        ? 'cursor-not-allowed'
                        : 'hover:bg-[#eceef0] cursor-pointer'
                }`}
                onClick={handleNextClick}
            >
                <RightOutlined />
            </span>
        </div>
    );
}

export default Pagination;
