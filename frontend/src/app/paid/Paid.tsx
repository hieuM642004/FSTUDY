'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';

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
          
            <div>
                <section className="flex flex-col justify-center antialiased bg-gray-200 text-gray-600 min-h-screen p-4">
                    <div className="h-full">
                        <div className="max-w-[360px] mx-auto">
                            <div className="bg-white shadow-lg rounded-lg mt-9">
                                <header className="text-center px-5 pb-5">
                                 
                                     <div className="inline-flex items-center bg-white -mt-9 w-[72px] h-[72px] fill-current rounded-full border-4 border-white box-content shadow mb-3">
                                        <Link href="/home" className="text-xl font-bold text-black ">
                                            FSTUDY
                                        </Link>
                                    </div>
                                   
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        Thông tin chuyển khoản
                                    </h3>
                                    <div className="text-sm font-medium text-red-500">
                                        Vui lòng check email để kích hoạt khóa
                                        học{' '}
                                    </div>
                                </header>

                                <div className="bg-gray-100  px-5 py-6">
                                    <div className="text-sm text-center mb-6">
                                        {' '}
                                        Tổng tiền:{' '}
                                        <strong className="font-semibold text-green-400 text-2xl">
                                            {formattedAmount
                                                ? formattedAmount
                                                : ''}
                                            đ
                                        </strong>
                                    </div>
                                    <form className="space-y-3">
                                      <div className='flex-grow '>
                                      <label htmlFor="">Mã đơn hàng</label>
                                        <div className=" shadow-sm rounded mt-1">
                                            <div className="flex-grow justify-start items-start">
                                                <input
                                                   readOnly
                                                    name="card-nr"
                                                    className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                                                    type="text"
                                               
                                                  
                                                    value={orderId || ''}
                                                />
                                            </div>
                                        </div>
                                      </div>
                                     <div>
                                     <label htmlFor="">Email</label>
                                        <div className="flex shadow-sm rounded mt-1">
                                            <div className="flex-grow justify-start items-start">
                                                <input
                                                    name="card-nr"
                                                    className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                                                    type="text"
                                                    value={email || ''}
                                                    
                                                />
                                            </div>
                                        </div>
                                     </div>
                                        <div>
                                        <label htmlFor="">Thông báo chuyển khoản:{' '}</label>
                                        <div className="flex shadow-sm rounded mt-1">
                                            <div className="flex-grow justify-start items-start">
                                                <input
                                                    name="card-nr"
                                                    className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                                                    type="text"
                                                    value={message || ''}
                                                    
                                                />
                                            </div>
                                        </div>
                                        </div>
                                     
                                      <div>
                                      <label htmlFor="">Phương thức chuyển khoản:{' '}</label>
                                        <div className="flex shadow-sm rounded mt-1">
                                            <div className="flex-grow justify-start items-start">
                                                <input
                                                    name="card-nr"
                                                    className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                                                    type="text"
                                                    value={partnerCode || ''}
                                                    
                                                />
                                            </div>
                                        </div>
                                      </div>
                                        <ButtonPrimary
                                            htmlType="button"
                                            size="large"
                                            to='/home'
                                            label="Quay về trang chủ"
                                            className="w-full flex justify-center mb-3 mt-2"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    x-show="open"
                    className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60"
                    x-data="{ open: true }"
                >
                    <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
                        <div>
                            👉{' '}
                            <a
                                className="hover:underline ml-1"
                                href="https://mail.google.com"
                                target="_blank"
                            >
                                Click vào đây để qua mail
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Paid;
