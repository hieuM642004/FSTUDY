'use client';

import { useRouter } from 'next/navigation';
import ExamService from '@/services/ExamsService';
import {
    ClockCircleOutlined,
    CommentOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Avatar, List, Checkbox, Select, Row, Col } from 'antd';
import type { CheckboxProps } from 'antd';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Target from '@/components/client/Target/Target';
import ExamResults from '@/components/client/ExamResult/ExamResult';

const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

function Test({ slug }: { slug: string }) {
    const router = useRouter();
    const [exam, setExam] = useState<any>();
    const [selectedSessionSlugs, setSelectedSessionSlugs] = useState<string[]>(
        [],
    );
    const [limit, setLimit] = useState<number>(0);
    const [errors, setErrors] = useState<string>('');
    const examId = exam?._id;
    useEffect(() => {
        const getExam = async () => {
            const exam = await ExamService.getAllExamById(slug);
            setExam(exam);
        };
        getExam();
    }, [slug]);

    const onCheckboxChange = (sessionSlug: string, checked: boolean) => {
        if (checked) {
            setSelectedSessionSlugs((prev) => [...prev, sessionSlug]);
        } else {
            setSelectedSessionSlugs((prev) =>
                prev.filter((slug) => slug !== sessionSlug),
            );
        }
    };
    const handleChange = (value: string) => {
        setLimit(Number(value));
    };

    const handleTakeTest = () => {
        if (selectedSessionSlugs.length === 0) {
            setErrors('Bạn phải chọn ít nhất một phần thi để luyện tập!');
            return;
        }
        setErrors('');

        const query = selectedSessionSlugs
            .map((slug) => `part=${slug}`)
            .join('&');
        const url = `/practice?exam=${exam?.slug}&${query}&time=${limit}`;

        console.log('Luyện tập với các phần thi:', selectedSessionSlugs);
        router.push(url);
    };

    return (
        <div className="p-10 shadow-md m-10 h-auto">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16} lg={18} xl={19}>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        #{exam?.examType}
                    </span>
                    <h2 className="font-bold text-4xl text-balance my-2">
                        {exam && exam?.title}
                    </h2>
                    <p className="text-sm">
                        <ClockCircleOutlined /> 40 phút | <EyeOutlined /> {10} |{' '}
                        <CommentOutlined /> {10}
                    </p>
                    <p className="text-sm">
                        {exam?.idSession?.length || 0} phần thi | 40 câu hỏi
                    </p>
                    <p className="italic text-red-500 mb-6">
                        Chú ý: để được quy đổi sang scaled score (ví dụ trên
                        thang điểm 990 cho TOEIC hoặc 9.0 cho IELTS), vui lòng
                        chọn chế độ làm FULL TEST.
                    </p>
                    <div className="mb-1">
                        <p className="font-bold">Kết quả làm bài của bạn: </p>
                        <div>
                            {examId ? (
                                <ExamResults id={examId} />
                            ) : (
                                <p>Đang tải...</p>
                            )}
                        </div>
                    </div>
                    <p>Chọn phần thi bạn muốn làm</p>

                    <List
                        itemLayout="horizontal"
                        dataSource={exam?.idSession}
                        renderItem={(item: any) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Checkbox
                                            onChange={(e) =>
                                                onCheckboxChange(
                                                    item.slug,
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    }
                                    title={<p>{item.title}</p>}
                                    description={
                                        <div>
                                            {item?.idQuestionGroups?.length} câu
                                            hỏi
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    <p className="text-red-500">{errors}</p>
                    <div className="flex flex-col space-y-3 mt-4">
                        <label htmlFor="select">
                            Giới hạn thời gian (Để trống để làm bài không giới
                            hạn)
                        </label>
                        <Select
                            defaultValue="Chọn thời gian"
                            className="w-3/5"
                            onChange={handleChange}
                            options={[
                                {
                                    value: 0,
                                    label: 'Chọn thời gian (mặc định sẽ không giới hạn)',
                                },
                                { value: 5, label: '5 phút' },
                                { value: 10, label: '10 phút' },
                                { value: 15, label: '15 phút' },
                                { value: 20, label: '20 phút' },
                                { value: 25, label: '25 phút' },
                                { value: 30, label: '30 phút' },
                                { value: 35, label: '35 phút' },
                                { value: 40, label: '40 phút' },
                                { value: 45, label: '45 phút' },
                                { value: 50, label: '50 phút' },
                                { value: 55, label: '55 phút' },
                            ]}
                        />
                        <div>
                            <ButtonPrimary
                                label="Luyện tập"
                                onClick={handleTakeTest}
                            />
                        </div>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={8} lg={6} xl={5}>
                    <Target />
                </Col>
            </Row>
        </div>
    );
}

export default Test;
