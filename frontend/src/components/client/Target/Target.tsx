'use client';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { Image } from 'antd';

function Target() {
    return (
        <>
            <div className="md:min-w-64 p-4 border rounded-lg order-1 md:order-2 mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                    <Image
                        src=""
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="bg-gray-300 rounded-full mb-2"
                    />
                    <div>
                        <div className="font-bold">NgoDuy</div>
                    </div>
                </div>
                <hr />
                <div className="mt-4">
                    <p className="text-sm">IELTS General</p>
                    <p className="text-sm">Ngày dự thi: -</p>
                    <p className="text-sm">Tới kỳ thi: 0 ngày</p>
                    <p className="text-sm">Điểm mục tiêu: -</p>
                </div>
                <ButtonPrimary
                    size={'large'}
                    label={' Thống kê kết quả'}
                    className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-lg text-balance"
                />
            </div>
        </>
    );
}

export default Target;
