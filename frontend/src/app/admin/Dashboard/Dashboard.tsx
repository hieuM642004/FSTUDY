'use client';

import { nestApiInstance } from '@/constant/api';
import { useState, useEffect } from 'react';

function Dashboard() {
    const [courses, setCourses] = useState();
    const [courseHasSell, setcourseHasSell] = useState();
    const [totalPurchase, settotalPurchase] = useState();
    const [exams, setExams] = useState();
    const [examTurn, setExamTurn] = useState();
    const [users, setUsers] = useState();
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Hàm để định dạng ngày hiện tại
        const formatDate = (date:any) => {
            return new Intl.DateTimeFormat('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).format(date);
        };

        const fetchCourses = async () => {
            try {
                const course = await nestApiInstance.get(
                    `/course/statistics/count-all-course`,
                );
                setCourses(course.data);
                const courseHasSell = await nestApiInstance.get(
                    `/course/statistics/count-all-course-has-sell`,
                );
                setcourseHasSell(courseHasSell.data);
                const totalPurchase = await nestApiInstance.get(
                    `/course/statistics/total-purchase`,
                );
                settotalPurchase(totalPurchase.data);
                const exams = await nestApiInstance.get(`/exams/static-exam`);
                setExams(exams.data);
                const examTurn = await nestApiInstance.get(
                    `/exam-result/count-exam-result`,
                );
                setExamTurn(examTurn.data);
                const user = await nestApiInstance.get(`/users/static-users`);
                setUsers(user.data);
                // Cập nhật ngày hiện tại
                setCurrentDate(formatDate(new Date()));
            } catch (error) {
                console.log(error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <>
            <div className="bg-gray-200 px-2 py-6">
                <div id="features" className="mx-auto max-w-6xl">
                    <p className="text-center text-base font-semibold leading-7 text-primary-500">
                        FSTUDY
                    </p>
                    <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Chào bạn đến trang quản trị của FSTUDY
                    </h2>
                    <ul className="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
                        <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
                            <img
                                src="https://www.svgrepo.com/show/530438/ddos-protection.svg"
                                alt=""
                                className="mx-auto h-10 w-10"
                            />
                            <h3 className="my-3 font-display font-medium">
                                Khóa học đã phát hành
                            </h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                {courses}
                            </p>
                            <p className="mt-1.5 text-xs leading-6 text-gray-500">
                                Cập nhật ngày: {currentDate}
                            </p>
                        </li>
                        <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
                            <img
                                src="https://www.svgrepo.com/show/530442/port-detection.svg"
                                alt=""
                                className="mx-auto h-10 w-10"
                            />
                            <h3 className="my-3 font-display font-medium">
                                Khóa học đã được bán
                            </h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                {courseHasSell}
                            </p>
                            <p className="mt-1.5 text-xs leading-6 text-gray-500">
                                Cập nhật ngày: {currentDate}
                            </p>
                        </li>
                        <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
                            <img
                                src="https://www.svgrepo.com/show/530444/availability.svg"
                                alt=""
                                className="mx-auto h-10 w-10"
                            />
                            <h3 className="my-3 font-display font-medium">
                                Tổng doanh thu của khóa học
                            </h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                {totalPurchase}
                            </p>
                            <p className="mt-1.5 text-xs leading-6 text-gray-500">
                                Cập nhật ngày: {currentDate}
                            </p>
                        </li>
                        <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
                            <img
                                src="https://www.svgrepo.com/show/530440/machine-vision.svg"
                                alt=""
                                className="mx-auto h-10 w-10"
                            />
                            <h3 className="my-3 font-display font-medium group-hover:text-primary-500">
                                Tổng số đề thi đã phát hành
                            </h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                {exams}
                            </p>
                            <p className="mt-1.5 text-xs leading-6 text-gray-500">
                                Cập nhật ngày: {currentDate}
                            </p>
                        </li>
                        <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
                            <img
                                src="https://www.svgrepo.com/show/530450/page-analysis.svg"
                                alt=""
                                className="mx-auto h-10 w-10"
                            />
                            <h3 className="my-3 font-display font-medium group-hover:text-primary-500">
                                Tổng số lượt luyện đề thi
                            </h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                {examTurn}
                            </p>
                            <p className="mt-1.5 text-xs leading-6 text-gray-500">
                                Cập nhật ngày: {currentDate}
                            </p>
                        </li>
                        <li className="rounded-xl bg-white px-6 py-8 shadow-sm">
                            <img
                                src="https://www.svgrepo.com/show/530453/mail-reception.svg"
                                alt=""
                                className="mx-auto h-10 w-10"
                            />
                            <h3 className="my-3 font-display font-medium group-hover:text-primary-500">
                                Tổng người dùng đang hoạt động
                            </h3>
                            <p className="mt-1.5 text-sm leading-6 text-secondary-500">
                                {users}
                            </p>
                            <p className="mt-1.5 text-xs leading-6 text-gray-500">
                                Cập nhật ngày: {currentDate}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
