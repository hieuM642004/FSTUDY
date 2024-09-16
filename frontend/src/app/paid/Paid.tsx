'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function Paid() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const partnerCode = searchParams.get('partnerCode');
    const email = searchParams.get('email');
    const orderId = searchParams.get('orderId');
    const amount: any = searchParams.get('amount');
    let formattedAmount;
    if (amount) {
        formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            alert('vui lòng check email kích hoạt khóa học');
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, []);
    return (
        <>
            <div className="pt-10  px-6 text-center justify-center items-center flex">
                <div>
                    <h1>Thông tin chuyển khoản</h1>
                    <h2 className="text-red-500">
                        vui lòng check email để kích hoạt khóa học
                    </h2>
                    <div>
                        <p>Mã đơn hàng: {orderId} </p>
                    </div>
                    <div>
                        <p>Email: {email} </p>
                    </div>
                    <div>
                        <p>
                            Thông báo chuyển khoản:{' '}
                            <>
                                {' '}
                                <span className="text-green-400">
                                    {message}{' '}
                                </span>
                            </>
                        </p>
                    </div>
                    <div>
                        <p>
                            Phương thức chuyển khoản:{' '}
                            <>
                                {' '}
                                <span>{partnerCode} </span>
                            </>
                        </p>
                    </div>
                    <div>
                        <p>
                            Tổng tiền:{' '}
                            <>
                                {' '}
                                <span className="text-xl font-bold text-green-400">
                                    {formattedAmount ? formattedAmount : ''}đ
                                </span>
                            </>
                        </p>
                    </div>
                    <Link href="/">Quay về trang chủ</Link>
                </div>
            </div>
        </>
    );
}

export default Paid;
