import { Carousel } from 'antd';
import Image from 'next/image';
import { HeartOutlined, StarFilled } from '@ant-design/icons';
import ButtonOutline from '@/components/shared/ButtonPrimary/ButtonOutline';

function Evaluate() {
    return (
        <>
            <Carousel arrows infinite={false}>
                <div>
                    <h3 className="slideshow">
                        {' '}
                        <>
                            <div
                                className="course-featured-review-item swiper-slide swiper-slide-active"
                                role="group"
                            >
                                <div className="course-featured-review-quote">
                                    <HeartOutlined className="text-[2rem]" />

                                    <div className="text-center text-[1.05rem] px-3">
                                        Khóa học Intensive Writing của STUDY4
                                        giúp mình cải thiện kỹ năng writing rất
                                        rất nhiều, đặc biệt là vốn từ vựng (cùng
                                        cách sử dụng chúng hiệu quả khi viết
                                        văn), cohesion/coherence và cách “hành
                                        văn” thật trôi chảy. Khóa học bao gồm
                                        bài luận mẫu từ ex-examiners cho tất cả
                                        các dạng câu hỏi của cả 2 tasks và các
                                        chủ đề thường gặp của Task 2 - mình rất
                                        yên tâm về chất lượng nội dung. Một điểm
                                        cộng của khóa học là đã tiết kiệm rất
                                        nhiều thời gian, so với việc trước kia
                                        mình phải tự take note từ mới, phân tích
                                        câu, vừa không chính xác vừa dễ nản.
                                        Thank you STUDY4.
                                    </div>
                                </div>
                                <div className=" flex justify-center items-center mt-4  ">
                                    <div className="flex justify-center flex-col items-center">
                                        <Image
                                            src="https://tiki.vn/blog/wp-content/uploads/2023/07/thumb-67.jpg"
                                            width={45}
                                            height={45}
                                            alt="Picture of the author"
                                            className="rounded-full"
                                        />
                                        <div className="">
                                            <div className="">
                                                <strong>Phạm Quỳnh Anh</strong>,
                                                THPT Marie Curie, Hà Nội
                                            </div>
                                            <div className="">
                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[0.5rem] text-[0.85rem] text-center text-[#71869d] italic ">
                                    <span className="font-500">
                                        Đánh giá khoá học:{' '}
                                    </span>
                                    <span>
                                        <a
                                            className="text-underline"
                                            href="/courses/25/ielts-intensive-writing/"
                                        >
                                            [IELTS Intensive Writing] Thực hành
                                            luyện tập IELTS Writing
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </>
                    </h3>
                </div>
                <div>
                    <h3 className="slideshow">
                        <>
                            <div
                                className="course-featured-review-item swiper-slide swiper-slide-active"
                                role="group"
                            >
                                <div className="course-featured-review-quote">
                                    <HeartOutlined className="text-[2rem]" />

                                    <div className="text-center text-[1.05rem] px-3">
                                        Khóa học Intensive Writing của STUDY4
                                        giúp mình cải thiện kỹ năng writing rất
                                        rất nhiều, đặc biệt là vốn từ vựng (cùng
                                        cách sử dụng chúng hiệu quả khi viết
                                        văn), cohesion/coherence và cách “hành
                                        văn” thật trôi chảy. Khóa học bao gồm
                                        bài luận mẫu từ ex-examiners cho tất cả
                                        các dạng câu hỏi của cả 2 tasks và các
                                        chủ đề thường gặp của Task 2 - mình rất
                                        yên tâm về chất lượng nội dung. Một điểm
                                        cộng của khóa học là đã tiết kiệm rất
                                        nhiều thời gian, so với việc trước kia
                                        mình phải tự take note từ mới, phân tích
                                        câu, vừa không chính xác vừa dễ nản.
                                        Thank you STUDY4.
                                    </div>
                                </div>
                                <div className=" flex justify-center items-center mt-4  ">
                                    <div className="flex justify-center flex-col items-center">
                                        <Image
                                            src="https://tiki.vn/blog/wp-content/uploads/2023/07/thumb-67.jpg"
                                            width={45}
                                            height={45}
                                            alt="Picture of the author"
                                            className="rounded-full"
                                        />
                                        <div className="">
                                            <div className="">
                                                <strong>Phạm Quỳnh Anh</strong>,
                                                THPT Marie Curie, Hà Nội
                                            </div>
                                            <div className="">
                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>

                                                <span className="rating-star fas fa-star checked"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[0.5rem] text-[0.85rem] text-center text-[#71869d] italic ">
                                    <span className="font-500">
                                        Đánh giá khoá học:{' '}
                                    </span>
                                    <span>
                                        <a
                                            className="text-underline"
                                            href="/courses/25/ielts-intensive-writing/"
                                        >
                                            [IELTS Intensive Writing] Thực hành
                                            luyện tập IELTS Writing
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </>
                    </h3>
                </div>
            </Carousel>

            <div>
                <div className="py-4 border-b-2">
                    <div className="flex">
                        <div className="mr-2 mt-3">
                            <Image
                                src="https://tiki.vn/blog/wp-content/uploads/2023/07/thumb-67.jpg"
                                width={45}
                                height={45}
                                alt="Picture of the author"
                                className="rounded-full"
                            />
                        </div>
                        <div className="">
                            <div className="">
                                <strong>Trịnh Minh Hằng</strong>, Tháng năm 16,
                                2024
                            </div>

                            <div className="">
                                <span className="font-bold">Khoá học: </span>
                                <span>
                                    <a
                                        className=""
                                        href="/courses/15/ielts-intensive-listening/"
                                    >
                                        [IELTS Intensive Listening] Chiến lược
                                        làm bài - Chữa đề - Luyện nghe IELTS
                                        Listening theo phương pháp Dictation
                                    </a>
                                </span>
                            </div>

                            <div className="">
                                rất tốt cho việc cải thiện kỹ năng nghe
                            </div>
                        </div>
                    </div>
                </div>
                <ButtonOutline
                    size="large"
                    label="Xem thêm"
                    className="w-full  mt-2 text-[#35509a] hover:bg-[#35509a]"
                />
            </div>
        </>
    );
}

export default Evaluate;
