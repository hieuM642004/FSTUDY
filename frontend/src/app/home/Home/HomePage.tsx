'use client';
import React from 'react';
import { Button, Card, Col, Row } from 'antd';

import './HomePage.scss';
import Dashboard from '../DashBoard/DashBoard';
import { CaretRightOutlined } from '@ant-design/icons';
import { getCookie } from 'cookies-next';

const App: React.FC = () => {
    const token = getCookie('token') as string;
    console.log(token);

    const data = [
        {
            title: '5 lợi ích khi học IELTS',
            description: `Đáp ứng yêu cầu học tập và làm việc quốc tế: IELTS giúp bạn vào các trường đại học và chương trình quốc tế hàng đầu.

            Cơ hội di cư: IELTS là yêu cầu để định cư tại các nước như Úc, Canada, New Zealand.
            
            Cải thiện kỹ năng tiếng Anh: Luyện thi IELTS nâng cao cả bốn kỹ năng nghe, nói, đọc và viết.
            
            Tăng cơ hội nghề nghiệp: Nhiều công ty quốc tế yêu cầu IELTS, mở ra cơ hội làm việc toàn cầu.
            
            Phát triển tư duy toàn cầu: Học IELTS giúp bạn mở rộng kiến thức về văn hóa và xã hội, sẵn sàng cho môi trường quốc tế.`,
            image: '/images/loi-ich-thi-IELTS-min.jpg',
            buttonText: 'Xem chi tiết',
        },
        {
            title: 'Bạn gặp trở ngại khi học IELTS?',
            description: `
            Chưa học IELTS trước đây nên bạn không biết phải bắt đầu từ đâu, cảm thấy khó khăn trong việc chọn tài liệu và xây dựng lộ trình học hiệu quả.

Thời gian học IELTS kéo dài, mục tiêu không rõ ràng làm bạn chán nản và mất động lực, dẫn đến việc học thiếu tập trung và kém hiệu quả.

Chênh lệch quá nhiều giữa các kỹ năng IELTS khiến điểm tổng không như mong muốn, đặc biệt là kỹ năng viết và nói thường khó đạt điểm cao hơn so với nghe và đọc.

Chưa thể vượt qua áp lực phòng thi mỗi khi thi IELTS thật, gây ảnh hưởng đến khả năng thể hiện tối đa các kỹ năng đã luyện tập.
            `,

            image: '/images/kho-khan-IELTS-min-1.jpg',
            buttonText: 'Đăng ký ngay',
        },
    ];

    return (
        <div className="container">
            {token && <Dashboard />}

            <div className="banner">
                <img
                    src="/images/Kiểm tra trình độ.png"
                    alt="banner1"
                    className="w-full h-auto object-cover rounded-md shadow-md"
                />
            </div>
            <div style={{ padding: '2rem' }}>
                {data.map((item, index) => (
                    <Row
                        key={index}
                        gutter={32}
                        align="middle"
                        style={{ marginBottom: '2rem' }}
                    >
                        {index % 2 === 0 ? (
                            <>
                                <Col xs={24} md={12}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            boxShadow:
                                                '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        }}
                                        className="min-h-72"
                                    />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Card bordered={false} className="min-h-72">
                                        <h2
                                            style={{
                                                fontSize: '1.75rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {item.title}
                                        </h2>
                                        <ul>
                                            {item.description
                                                .split('\n')
                                                .filter(
                                                    (line) =>
                                                        line.trim() !== '',
                                                )
                                                .map((line, idx) => (
                                                    <li key={idx}>
                                                        <span
                                                            style={{
                                                                marginRight:
                                                                    '8px',
                                                            }}
                                                        >
                                                            ➤
                                                        </span>
                                                        {line.trim()}
                                                    </li>
                                                ))}
                                        </ul>
                                    </Card>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col xs={24} md={12}>
                                    <Card bordered={false} className="min-h-72">
                                        <h2
                                            style={{
                                                fontSize: '1.75rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {item.title}
                                        </h2>
                                        <ul>
                                            {item.description
                                                .split('\n')
                                                .filter(
                                                    (line) =>
                                                        line.trim() !== '',
                                                )
                                                .map((line, idx) => (
                                                    <li key={idx}>
                                                        <span
                                                            style={{
                                                                marginRight:
                                                                    '8px',
                                                            }}
                                                        >
                                                            ➤
                                                        </span>
                                                        {line.trim()}
                                                    </li>
                                                ))}
                                        </ul>
                                    </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="min-h-72"
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            boxShadow:
                                                '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </Col>
                            </>
                        )}
                    </Row>
                ))}
            </div>
        </div>
    );
};

export default App;
