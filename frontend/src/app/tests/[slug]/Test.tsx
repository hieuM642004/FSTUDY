'use client';

import { useRouter } from 'next/navigation';
import ExamService from '@/services/exams/ExamsService';
import {
    ClockCircleOutlined,
    CommentOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Avatar, List, Checkbox, Select, Row, Col, Spin, Layout } from 'antd';
import type { CheckboxProps } from 'antd';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Target from '@/components/client/Target/Target';
import ExamResults from '@/components/client/ExamResult/ExamResult';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Comment from '@/components/client/Comment/Comment';

const { Header, Footer, Sider, Content } = Layout;
const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

function Test({ slug }: { slug: string }) {
    const router = useRouter();
    const [exam, setExam] = useState<any>();
    const [selectedSessionSlugs, setSelectedSessionSlugs] = useState<string[]>(
        [],
    );
    const [totalQuestions, setTotalQuestions] = useState<number>(0);
    const [limit, setLimit] = useState<number>(0);
    const [errors, setErrors] = useState<string>('');
    const { isLoggedIn, userId } = useAuth();
    const examId = exam?._id;
    useEffect(() => {
        const getExam = async () => {
            const exam = await ExamService.getAllExamById(slug);
            setExam(exam);

            const totalQuestions = exam.idSession.reduce(
                (sum: any, session: any) => {
                    return sum + (session.idQuestionGroups?.length || 0);
                },
                0,
            );
            setTotalQuestions(totalQuestions);
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
        if (!isLoggedIn) {
            router.push('/login');
        }
        if (selectedSessionSlugs.length === 0) {
            setErrors('Bạn phải chọn ít nhất một phần thi để luyện tập!');
            return;
        }
        setErrors('');

        const query = selectedSessionSlugs
            .map((slug) => `part=${slug}`)
            .join('&');

        const url = `/practice?exam=${exam?.slug}&${query}&time=${limit}`;
        router.push(url);
    };

    return (
        <div className="p-10 shadow-md m-10 h-auto">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16} lg={18} xl={19}>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        #{exam?.examType} | #{exam?.description}
                    </span>
                    <h2 className="font-bold text-2xl sm:text-xl md:text-3xl lg:text-4xl my-2 break-words">
                        {exam && exam?.title}
                    </h2>

                    <p className="text-sm">
                        <ClockCircleOutlined /> {exam?.durition} phút
                    </p>
                    <p className="text-sm">
                        {exam?.idSession?.length || 0} phần thi |{' '}
                        {totalQuestions} câu hỏi
                    </p>

                    <div className="mb-1">
                        <p className="font-bold">Kết quả làm bài của bạn: </p>
                        <div>
                            {examId ? (
                                <ExamResults id={examId} />
                            ) : (
                                <div className="flex justify-center p-10">
                                    <Spin></Spin>
                                </div>
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
                <div className='mb-1'><Target /></div>
                    <div className='flex justify-center items-center'>
                        <img
                            src="/images/HỌC CÙNG FSTUDY 2.png"
                            className="shadow-md rounded-md mb-2"
                            alt=""
                        />
                    </div>
                </Col>
            </Row>
            <div className="my-7">
                <Comment idCourse={exam?._id} />
            </div>
        </div>
    );
}

export default Test;
