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
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(2)',
                    ),
                    label: 'Quizzes',
                    intro: '<strong>Bước 1:</strong> Tạo bài học <strong>Quizzes</strong>. Bạn có thể tạo và quản lý các câu hỏi trắc nghiệm ở đây.',
                    position: 'right',
                },
                {
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(3)',
                    ),
                    label: 'Word matchings',
                    intro: '<strong>Bước 2:</strong> Tạo bài học <strong>Word Matching</strong> giúp bạn kết hợp các từ đúng cách.',
                    position: 'right',
                },
                {
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(4)',
                    ),
                    label: 'Fill in the Blank',
                    intro: '<strong>Bước 3:</strong> Tạo bài học <strong>Fill in the Blank</strong> để kiểm tra khả năng của người học.',
                    position: 'right',
                },
                {
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(5)',
                    ),
                    label: 'Videos',
                    intro: '<strong>Bước 4:</strong> Tạo bài học <strong>Video</strong> học tập trong mục này.',
                    position: 'right',
                },
                {
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(6)',
                    ),
                    label: 'Contents',
                    intro: '<strong>Bước 5:</strong> Thêm các bài học vào <strong>Contents</strong>.',
                    position: 'right',
                },
                {
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(7)',
                    ),
                    label: 'Lessons',
                    intro: '<strong>Bước 6:</strong> thêm các gói bài học trong <strong>Contents</strong> vào <strong>Lessons</strong>.',
                    position: 'right',
                },
                {
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(8)',
                    ),
                    label: 'Course Type',
                    intro: '<strong>Bước 7:</strong> Tạo <strong>Course Type</strong> khác nhau mà bạn muốn quản lý.',
                    position: 'right',
                },
                {
                    element: document.querySelector(
                        '.ant-menu-item:nth-child(9)',
                    ),
                    label: 'Courses',
                    intro: '<strong>Bước 8:</strong> Thêm <strong>Course Type</strong> và <strong>Lessons</strong> vào <strong>Courses</strong> cho phép bạn xem và quản lý các khóa học hiện có trong hệ thống.',
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
