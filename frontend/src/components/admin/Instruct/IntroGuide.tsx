'use client';
import { useEffect } from 'react';
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';
import './IntroGuide.scss';

const IntroGuide = () => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const steps = [
                {
                    element: document.getElementById('intro-1'),
                    label: 'Quizzes',
                    intro: '<strong>Bước 1:</strong> Tạo bài học <strong>Trắc nghiệm</strong>. Bạn có thể tạo và quản lý các câu hỏi trắc nghiệm ở đây.',
                    position: 'right',
                },
                {
                    element: document.getElementById('intro-2'),
                    label: 'Word matchings',
                    intro: '<strong>Bước 2:</strong> Tạo bài học <strong>Ghép từ</strong> giúp bạn kết hợp các từ đúng cách.',
                    position: 'right',
                },
                {
                    element: document.getElementById('intro-3'),
                    label: 'Fill in the Blank',
                    intro: '<strong>Bước 3:</strong> Tạo bài học <strong>Điền vào chổ trống</strong> để kiểm tra khả năng của người học.',
                    position: 'right',
                },
                {
                    element: document.getElementById('intro-4'),
                    label: 'Videos',
                    intro: '<strong>Bước 4:</strong> Tạo bài học <strong>Video</strong> học tập trong mục này.',
                    position: 'right',
                },
                {
                    element: document.getElementById('intro-5'),
                    label: 'Contents',
                    intro: '<strong>Bước 5:</strong> Thêm các bài học vào <strong>Nội dung</strong>.',
                    position: 'right',
                },
                {
                    element: document.getElementById('intro-6'),
                    label: 'Lessons',
                    intro: '<strong>Bước 6:</strong> thêm các gói bài học trong <strong>Nội dung</strong> vào <strong>Bài học</strong>.',
                    position: 'right',
                },
                {
                    element: document.getElementById('intro-7'),
                    label: 'Course Type',
                    intro: '<strong>Bước 7:</strong> Tạo <strong>Loại khóa học</strong> khác nhau mà bạn muốn quản lý.',
                    position: 'right',
                },
                {
                    element: document.getElementById('intro-8'),
                    label: 'Courses',
                    intro: '<strong>Bước 8:</strong> Thêm <strong>Loại khóa học</strong> và <strong>Nội dung</strong> vào <strong>Khóa học</strong> cho phép bạn xem và quản lý các khóa học hiện có trong hệ thống.',
                    position: 'right',
                },
            ];

            // Lọc các bước hợp lệ
            const validSteps = steps.filter((step) => step.element);
            console.log('Valid steps:', validSteps); // Log để kiểm tra

            if (validSteps.length > 0) {
                introJs()
                    .setOptions({
                        steps: validSteps,
                        showProgress: true,
                        showBullets: true,
                        exitOnOverlayClick: false,
                        skipLabel: 'Bỏ qua',
                        nextLabel: 'Tiếp theo',
                        prevLabel: 'Quay lại',
                        doneLabel: 'Kết thúc',
                    })
                    .start();
            } else {
                console.error('Không tìm thấy các phần tử cho hướng dẫn.');
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    return null;
};

export default IntroGuide;
