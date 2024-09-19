import React from 'react';
import Link from 'next/link';
import {
    ClockCircleOutlined,
    CommentOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { Exams } from '@/types/Exams';
const IELTSCard = ({ title, idSession, durition,slug,examType }: Exams) => {
    return (
        <div className=" test-card-item border p-4 rounded-lg shadow-lg hover:scale-105 transition ease-in-out delay-150 duration-300">
            <Link href={`tests/${slug}`} >
                <h3 className="text-lg font-bold !text-black">
                    {title}
                </h3>
                <p className="text-sm !text-black">
                    <ClockCircleOutlined /> {durition} phút | <EyeOutlined /> {10} |{' '}
                    <CommentOutlined /> {10}
                </p>
                <p className="text-sm !text-black">{idSession?.length} phần thi | 40 câu hỏi</p>
                <p className="text-sm">{idSession?.length} phần thi | 40 câu hỏi</p>
                <div className="mt-2">
                    <span className="bg-blue-100  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">
                        #{examType}
                    </span>
                    <span className="bg-blue-100  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">
                        #Listening
                    </span>
                </div>
                <ButtonPrimary
                    size="large"
                    label='Chi tiết'
                    className="mt-4  text-white px-4 py-2 rounded-lg w-full"
                >
                </ButtonPrimary>
            </Link>
        </div>
    );
};

export default IELTSCard;
