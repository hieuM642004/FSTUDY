import React from 'react';
import {
    ClockCircleOutlined,
    CommentOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
const IELTSCard = ({ testNumber, views, comments }) => {
    return (
        <div className="test-card-item border p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">
                IELTS Simulation Listening test {testNumber}
            </h3>
            <p className="text-sm">
                <ClockCircleOutlined /> 40 phút | <EyeOutlined /> {views} |{' '}
                <CommentOutlined /> {comments}
            </p>
            <p className="text-sm">4 phần thi | 40 câu hỏi</p>
            <div className="mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    #IELTS Academic
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    #Listening
                </span>
            </div>
            <ButtonPrimary
                size="large"
                label={'Chi tiết'}
                className="mt-4  text-white px-4 py-2 rounded-lg w-full"
            >
                Chi tiết
            </ButtonPrimary>
        </div>
    );
};

export default IELTSCard;
