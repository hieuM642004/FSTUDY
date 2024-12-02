'use client';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

function Buying() {
    return (
        <>
            <div className="mx-auto shadow-lg rounded-md w-1/3 my-20 p-3">
                <Typography>
                    <p className='text-2xl'>Hướng dẫn thanh toán</p>
                    <Paragraph>
                        {' '}
                        Bạn vui lòng chuyển khoản cho chúng tôi theo một trong
                        các hình thức sau đây.{' '}
                    </Paragraph>
                    <Paragraph>
                     <div className='flex justify-center'>
                            <img src="/images/logoMomo.jpg" className='w-20 h-20 shadow-md rounded-md' alt="" />
                            <img src="/images/logoVnpay.png" className='w-20 h-20 ml-4 shadow-md rounded-md' alt="" />
                     </div>

                    </Paragraph>
                    <Paragraph>
                        Sau khi xác nhận thông tin chuyển khoản, chúng tôi sẽ
                        gửi cho bạn mã kích hoạt qua email, zalo
                        theo số điện thoại hoặc email đặt hàng. Bạn có thể
                        email, nhắn tin vào fanpage hoặc gọi điện trực tiếp cho
                        chúng tôi nếu không nhận được mã kích hoạt.
                    </Paragraph>
                    <Paragraph>
                     <div className='flex justify-center'>
                            <img src="/images/email.png" className='w-20 h-20 shadow-md rounded-md' alt="" />
                            <img src="/images/Icon_of_Zalo.svg.png" className='w-20 h-20 ml-4 shadow-md rounded-md' alt="" />
                     </div>

                    </Paragraph>
                    <Paragraph>
                        Nếu có bất kì thắc mắc hoặc sự cố hãy liên hệ với chúng tôi 
                    </Paragraph>
                </Typography>
            </div>
        </>
    );
}

export default Buying;
