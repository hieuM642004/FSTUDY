'use client';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

function Buying() {
    return (
        <>
            <div className="mx-auto shadow-md rounded-md w-4/5 my-7 p-3">
                <Typography>
                    <Title>Hướng dẫn thanh toán</Title>
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
                </Typography>
            </div>
        </>
    );
}

export default Buying;
