import React from 'react';
import Link from 'next/link';
import {
    ClockCircleOutlined,
    CommentOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { Exams } from '@/types/Exams';

const IELTSCard = ({ title, idSession, durition, slug, examType, description, view }: Exams) => {
    return (
        <div className="test-card-item border max-h-60 p-4 rounded-lg shadow-lg hover:scale-105 transition ease-in-out delay-150 duration-300 flex flex-col justify-between">
            <Link href={`tests/${slug}`} className="flex flex-col h-full justify-between">
                <div>
                    <h3 className="text-lg font-bold !text-black line-clamp-2 overflow-hidden">
                        {title}
                    </h3>
                    <p className="text-sm !text-black mt-2">
                        <ClockCircleOutlined /> {durition} | <EyeOutlined /> {view} |{' '}
                        <CommentOutlined /> {10}
                    </p>
                    <p className="text-sm !text-black mt-1">{idSession?.length} phần thi | 40 câu hỏi</p>
                    <div className="mt-2">
                        <span className="bg-blue-100 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            #{examType}
                        </span>
                        <span className="bg-blue-100 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            #{description}
                        </span>
                    </div>
                </div>
                <ButtonPrimary
                    size="large"
                    label="Chi tiết"
                    className="mt-4 text-white px-4 py-2 rounded-lg w-full"
                />
            </Link>
        </div>
    );
};

export default IELTSCard;
