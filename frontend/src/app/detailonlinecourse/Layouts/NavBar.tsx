'use client';
import { Anchor } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, CommentOutlined, StarFilled } from '@ant-design/icons';

import Comment from '../Evaluates/Comment';
import Evaluate from '../Evaluates/Evaluate';
import SideBar from './SideBar';
import WapperItemCard from '../../../components/client/WapperItemCard/WapperItemCard';

function NavBar() {
    const [isSticky, setSticky] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 400) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            {/* nav bar */}
            <div
                className={`MainNavBar lg:w-full border-b-[1] ${
                    isSticky ? 'fixed top-12 left-0 right-0  ' : ''
                }`}
            >
                <Anchor
                    className={`lg:h-16 pb-1 mt-4 ${
                        isSticky ? 'lg:ml-10 lg:pl-10' : ''
                    }`}
                    direction="horizontal"
                    items={[
                        {
                            key: 'part-1',
                            href: '#part-1',
                            title: 'Mục tiêu khóa học',
                        },
                        {
                            key: 'part-2',
                            href: '#part-2',
                            title: 'Thông tin khóa học',
                        },
                        {
                            key: 'part-3',
                            href: '#part-3',
                            title: 'Chương trình học',
                        },
                        {
                            key: 'part-4',
                            href: '#part-4',
                            title: 'Đánh giá (991)',
                        },
                    ]}
                />
            </div>
            {/* sidebar  */}

            <SideBar />
            {/* content */}
            <div className="lg:px-3 lg:pt-8 lg:pb-12">
                <div className="bg-[#f8f9fa!important]">
                    {/* combo học khóa học */}
                    <WapperItemCard>
                        <div className="CourseSeries ">
                            <h5 className="font-bold mb-4 text-xl">
                                Combo này bao gồm:
                            </h5>
                            <ol className="text-base pl-10">
                                <li>
                                    <a href="#course-syllabus">
                                        [IELTS Fundamentals] Từ vựng và ngữ pháp
                                        cơ bản IELTS
                                    </a>
                                </li>

                                <li>
                                    <a href="#course-syllabus">
                                        [IELTS Intensive Listening] Chiến lược
                                        làm bài - Chữa đề - Luyện nghe IELTS
                                        Listening theo phương pháp Dictation
                                    </a>
                                </li>

                                <li>
                                    <a href="#course-syllabus">
                                        [IELTS Intensive Reading] Chiến lược làm
                                        bài - Chữa đề - Từ vựng IELTS Reading
                                    </a>
                                </li>

                                <li>
                                    <a href="#course-syllabus">
                                        [IELTS Intensive Speaking] Thực hành
                                        luyện tập IELTS Speaking
                                    </a>
                                </li>

                                <li>
                                    <a href="#course-syllabus">
                                        [IELTS Intensive Writing] Thực hành
                                        luyện tập IELTS Writing
                                    </a>
                                </li>

                                <li>
                                    <a href="#course-syllabus">
                                        [Khóa chấm chữa] Advanced IELTS Writing
                                        &amp; Speaking (Target 6.5+)
                                    </a>
                                </li>
                            </ol>
                        </div>
                    </WapperItemCard>
                    {/* sau khóa học */}
                    <WapperItemCard>
                        <div
                            id="part-1"
                            style={{
                                width: '100%',
                            }}
                        >
                            {' '}
                            <div className="contentblock">
                                <h2 className="font-bold text-2xl">
                                    Bạn sẽ đạt được gì sau khoá học?
                                </h2>

                                <div>
                                    1️⃣ Có nền tảng ngữ pháp trung cấp B1-B2
                                </div>

                                <div>
                                    2️⃣ Xây dựng vốn từ vựng học thuật,
                                    làm&nbsp;nền móng để đọc/nghe hiểu&nbsp;các
                                    chủ điểm chắc chắn sẽ xuất hiện trong 2 phần
                                    thi Listening và Reading
                                </div>

                                <div>
                                    3️⃣ Làm chủ tốc độ và các ngữ điệu&nbsp;khác
                                    nhau trong phần thi IELTS Listening
                                </div>

                                <div>
                                    4️⃣ Nắm trọn 4000 từ vựng 99% sẽ xuất hiện
                                    trong IELTS
                                </div>

                                <div>
                                    5️⃣&nbsp;Nắm chắc chiến thuật và phương
                                    pháp&nbsp;làm các dạng câu hỏi trong IELTS
                                    Listening và Reading
                                </div>

                                <div>
                                    6️⃣&nbsp;Luyện tập phát âm, từ vựng, ngữ pháp
                                    và thực hành luyện nói các chủ đề thường gặp
                                    và forecast trong&nbsp;IELTS Speaking
                                </div>
                            </div>
                        </div>
                    </WapperItemCard>
                    {/* thông tin khóa học */}
                    <WapperItemCard>
                        <div
                            id="part-2"
                            style={{
                                width: '100%',
                            }}
                        >
                            {' '}
                            <h2 className="font-bold text-2xl">
                                Thông tin khoá học
                            </h2>
                            <blockquote>
                                <p className="mb-4">
                                    <em>
                                        Bài học được biên soạn và giảng dạy bởi:
                                    </em>
                                </p>

                                <ul className="pl-10 mv mb-4 mb-4">
                                    <li>
                                        <em>
                                            Ms. Phuong Nguyen, Macalester
                                            College, USA. TOEFL 114, IELTS 8.0,
                                            SAT 2280, GRE Verbal 165/170
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            Ms. Uyen Tran, FTU. IELTS 8.0
                                            (Listening 8.5, Reading 8.5)
                                        </em>
                                    </li>
                                </ul>
                            </blockquote>
                            <h3 id="">&nbsp;</h3>
                            <div className="CourseDescription">
                                <h3 id="bạn-sẽ-học-những-gì?">
                                    <strong>Bạn sẽ học những gì?</strong>
                                </h3>

                                <p>
                                    <strong>
                                        1. Từ vựng và ngữ pháp cơ bản cho IELTS
                                    </strong>
                                </p>

                                <p>
                                    Khóa học IELTS Fundamentals: Grammar and
                                    Vocabulary for IELTS hướng đến đối tượng các
                                    bạn đang ở trình độ sơ cấp (tương đương
                                    A1-A2) và có mong muốn thi IELTS trong tương
                                    lai. Mục tiêu khóa học là xây dựng cho các
                                    bạn nền móng từ vựng và ngữ pháp để đạt điểm
                                    tối thiểu 4.0 sau 3-4 tháng học đúng lộ
                                    trình.
                                </p>

                                <p>
                                    Phần Từ vựng gồm hơn 1.800 từ&nbsp;được chia
                                    thành 20 chủ đề khác nhau như nghệ thuật,
                                    văn học, lịch sử, khảo cổ, khoa học, đời
                                    sống ... là những chủ điểm chắc chắn sẽ xuất
                                    hiện khi đi thi. Mỗi chủ đề bao gồm bô
                                    flashcards gồm đầy đủ nghĩa Anh-Việt/
                                    Anh-Anh&nbsp;hình ảnh, phiên âm, phát âm,
                                    câu ví dụ. Phần ôn tập flashcards của STUDY4
                                    được thiết kế theo phương pháp Spaced
                                    repetition (học lặp lại ngắt quãng) giúp bạn
                                    tối ưu hóa thời gian và hiệu quả ôn tập: chỉ
                                    ôn những từ sắp quên và bỏ qua những từ đã
                                    nhớ. Giúp bạn hoàn toàn có thể học trọn
                                    1.800 từ này trong 2.5-3 tháng (~75 ngày).
                                    Ngoài ra, khóa học cung cấp rất nhiều các
                                    dạng bài tập mini-game&nbsp;khác nhau để bạn
                                    luyện tập từ vựng như tìm cặp, nghe điền từ,
                                    nghe chọn từ đúng, chính tả, trắc nghiệm.
                                </p>

                                <p>
                                    Phần Ngữ pháp gồm 29 chủ điểm ngữ pháp quan
                                    trọng nhất trong kỳ thi IELTS.&nbsp;Mỗi chủ
                                    điểm bao gồm 1 video dài 10-15 phút giảng
                                    dạy chi tiết từ giáo viên có chuyên môn cao
                                    của STUDY4, slide để bạn take note khi học
                                    và phần nội dung dạng text&nbsp;để đọc kỹ
                                    hơn. Bên cạnh đó, khóa học cung câp thêm các
                                    dạng bài tập luyện chuyên sâu ngữ pháp kết
                                    hợp các kỹ năng như nghe, đọc, viết giúp bạn
                                    thực hành hàng ngày ngữ pháp hiệu quả.
                                </p>

                                <p>
                                    <strong>
                                        2. Chiến lược làm tất cả các dạng câu
                                        hỏi IELTS Reading và Listening
                                    </strong>
                                </p>

                                <p>
                                    Khóa học IELTS Intensive Listening và
                                    Intensive Reading cung cấp video bài giảng
                                    hướng dẫn chi tiết cách làm tất cả các dạng
                                    câu hỏi, tips làm nhanh &amp; chính
                                    xác&nbsp;và chiến lược kiểm soát thời gian
                                    hiệu quả.
                                </p>

                                <p>
                                    <strong>3. Video chữa đề chi tiết</strong>
                                </p>

                                <p>
                                    Khóa học IELTS Intensive cung cấp hơn 400h
                                    clip chữa chi tiết rất nhiều bộ đề quan
                                    trọng. Mỗi bài chữa đều bao gồm phương pháp
                                    đọc câu hỏi, tìm keywords, cách tìm đáp án
                                    đúng hay lựa chọn câu trả lời phù hợp.
                                </p>

                                <p>
                                    <strong>
                                        4. Phương pháp luyện nghe và chép chính
                                        tả cực hiệu quả:
                                    </strong>
                                </p>

                                <p>
                                    Khoá học IELTS Intensive Listening - luyện
                                    nghe bằng phương pháp Dictation gồm hơn 200
                                    bài nghe từ đề thi thật. Phương pháp
                                    dictation là một&nbsp;phương pháp học ngôn
                                    ngữ bằng cách nghe hội thoại hoặc văn
                                    bản,&nbsp;và sau đó&nbsp;viết ra những gì
                                    bạn nghe được.&nbsp;STUDY4 có 3 chế độ luyện
                                    tập: dễ, trung bình và nâng cao; tăng
                                    dần&nbsp;tương ứng với số lượng ô trống bạn
                                    cần điền trong 1 câu.
                                </p>

                                <ul>
                                    <li>
                                        <strong>Nghe âm thanh</strong>

                                        <ul>
                                            <li>
                                                <em>
                                                    Thông qua các bài tập, bạn
                                                    sẽ phải nghe rất nhiều, đó
                                                    là chìa khóa để cải thiện kỹ
                                                    năng nghe IELTS của bạn
                                                </em>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>
                                            Nhập những gì bạn nghe thấy
                                        </strong>
                                        <ul>
                                            <li>
                                                <em>
                                                    Việc gõ những gì bạn nghe
                                                    được buộc bạn phải tập trung
                                                    vào từng chi tiết giúp bạn
                                                    trở nên tốt hơn trong việc
                                                    phát âm, đánh vần và viết.
                                                </em>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Kiểm tra và sửa chữa</strong>
                                        <ul>
                                            <li>
                                                <em>
                                                    Việc sửa lỗi rất quan trọng
                                                    đối với độ chính xác khi
                                                    nghe và khả năng đọc hiểu
                                                    của bạn, tốt nhất là bạn nên
                                                    highlight và lưu lại những
                                                    lỗi sai mình mắc phải
                                                </em>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                                <p>
                                    <strong>
                                        5. Bộ từ vựng có xác&nbsp;suất&nbsp;99%
                                        sẽ xuất hiện trong phần thi&nbsp;IELTS
                                        Reading và Listening
                                    </strong>
                                </p>

                                <p>
                                    Theo thống kê của trung tâm luyện thi New
                                    Oriental, bộ đề Cam&nbsp;có đủ lượng từ
                                    vựng&nbsp;bạn cần để có thể i.e đạt được
                                    band 9&nbsp;trong&nbsp;phần thi IELTS
                                    Reading và Listening. Vì vậy, bên cạnh việc
                                    luyện đề, học từ mới trong bộ đề này là một
                                    việc cực kỳ quan trọng nếu bạn muốn đạt điểm
                                    cao trong 2 phần thi trên. Với mục đích giúp
                                    các bạn học viên tiết kiệm thời gian tra từ,
                                    đánh dấu cũng như có phương tiện ôn từ hiệu
                                    quả nhất,&nbsp;STUDY4 đã tổng hợp từ
                                    vựng&nbsp;trong bộ đề này thành khoá học duy
                                    nhất gồm flashcards, highlights từ vựng
                                    trong bài, và các bài tập thực hành dễ dùng
                                    dễ học.
                                </p>

                                <p>
                                    <strong>
                                        6. Hệ thống bài luyện tập dưới dạng game
                                        lý thú
                                    </strong>
                                </p>

                                <p>
                                    Với mỗi list từ vựng, thay vì phải làm những
                                    bài tập khô khan, bạn sẽ “phải” chơi hàng
                                    loạt trò chơi. Việc này vừa giúp việc học
                                    không hề nhàm chán, căng thẳng mà việc tiếp
                                    xúc cả hình ảnh, màu sắc, âm thanh liên quan
                                    đền từ vựng sẽ kích thích não bộ ghi nhớ
                                    nhanh hơn và lâu hơn.&nbsp;
                                </p>

                                <p>
                                    4000 từ vựng tưởng như nhiều nhưng với
                                    phương pháp học mà chơi, chơi mà học, việc
                                    phá đảo khối lượng từ khủng như vậy hoàn
                                    toàn nằm trong lòng bàn tay bạn.&nbsp;
                                </p>

                                <p>
                                    <strong>
                                        7. Nắm trọn cách trả lời các dạng câu
                                        hỏi Task 1 và chủ đề thông dụng Task 2
                                        phần thi IELTS Writing
                                    </strong>
                                </p>

                                <p>
                                    Trong khóa học IELTS Intensive
                                    Writing,&nbsp;bạn sẽ:
                                </p>

                                <ul>
                                    <li>
                                        Hiểu cấu trúc của phần thi IELTS Writing
                                    </li>
                                    <li>
                                        Học cách viết câu trả lời cho&nbsp;bất
                                        kỳ&nbsp;câu hỏi Writing Task 1 và Task 2
                                        nào sau khi học cách nhận dạng các loại
                                        câu hỏi khác nhau
                                    </li>
                                    <li>
                                        Học cách tạo trong bài luận của bạn để
                                        bạn có thể bắt đầu viết như người bản xứ
                                        bằng từ/cụm từ liên kết (cohesive
                                        devices)
                                    </li>
                                    <li>
                                        Tăng lượng từ vựng của bạn một cách
                                        nhanh chóng và hiệu quả
                                    </li>
                                    <li>
                                        Thực hành nhận dạng và sửa những lỗi ngữ
                                        pháp, chính tả thường gặp khi viết (mạo
                                        từ, dấu câu, mệnh đề quan hệ ...)
                                    </li>
                                    <li>
                                        bắt đầu cảm thấy tự tin, yên tâm và ngày
                                        càng chuẩn bị tốt hơn cho phần thi viết
                                        trong kỳ thi IELTS tiếp theo
                                    </li>
                                </ul>

                                <p>
                                    Mỗi bài học là 1 bài luận được viết bởi một
                                    cựu giám khảo IELTS. STUDY4 đã tạo ra các
                                    bài tập tương ứng giúp bạn học được tối đa
                                    mỗi bài luận, bao gồm:
                                </p>

                                <ul>
                                    <li>Học từ mới trong bài</li>
                                    <li>
                                        Học từ, cụm từ liên kết các câu, ý nổi
                                        bật được sử dụng trong bài
                                    </li>
                                    <li>Luyện tập tìm và sửa lỗi ngữ pháp</li>
                                    <li>
                                        Học vai trò từng câu trong bài văn và
                                        luyện tập viết lại câu
                                    </li>
                                </ul>

                                <p>
                                    <strong>
                                        8. Thực hành luyện tập các&nbsp;chủ đề
                                        thường gặp cũng như forecast mới
                                        nhất&nbsp;Part 1, 2, 3 phần thi IELTS
                                        Speaking
                                    </strong>
                                </p>

                                <p>
                                    Trong khóa học IELTS Intensive
                                    Speaking&nbsp;này, bạn sẽ:
                                </p>

                                <ul>
                                    <li>
                                        Nắm lòng cách phát âm IPA và những yếu
                                        tố quan trọng khi nói tiếng Anh như
                                        intonation, stress, thought groups, cách
                                        trả lời các dạng câu hỏi (Wh- hay
                                        yes/no)
                                    </li>
                                    <li>
                                        Hiểu cấu trúc của phần thi IELTS
                                        Speaking
                                    </li>
                                    <li>
                                        Học cách&nbsp;trả lời cho các chủ đề
                                        part 1, 2, và 3&nbsp;thường gặp và các
                                        chủ đề mới nhất được update theo các quý
                                    </li>
                                    <li>
                                        Tăng lượng từ vựng của bạn một cách
                                        nhanh chóng và hiệu quả
                                    </li>
                                    <li>
                                        Thực hành nhận dạng và sửa những lỗi ngữ
                                        pháp, chính tả thường gặp khi nói
                                    </li>
                                    <li>
                                        bắt đầu cảm thấy tự tin, yên tâm và ngày
                                        càng chuẩn bị tốt hơn cho phần thi nói
                                        trong kỳ thi IELTS tiếp theo
                                    </li>
                                </ul>

                                <p>
                                    Mỗi bài speaking sample được viết bởi một
                                    cựu giám khảo IELTS. STUDY4 đã tạo ra các
                                    bài tập tương ứng giúp bạn học được tối đa
                                    mỗi bài, bao gồm:
                                </p>

                                <ul>
                                    <li>Học từ mới trong bài</li>
                                    <li>Luyện tập tìm và sửa lỗi ngữ pháp</li>
                                    <li>
                                        Thực hành luyện nói theo phương pháp
                                        shadowing
                                    </li>
                                    <li>
                                        Lưu lại bài nói trên cộng đồng học tập
                                        để học hỏi từ các bạn học viên khác
                                    </li>
                                </ul>

                                <p>
                                    <strong>
                                        9. Chấm chữa chi tiết bài làm IELTS
                                        Speaking và Writing bởi giáo viên bản
                                        ngữ
                                    </strong>
                                </p>

                                <p>
                                    Để đạt được điểm số cao trong hai phần
                                    thi&nbsp;IELTS Speaking và Writing
                                    là&nbsp;rất khó.&nbsp;Bất chấp mọi nỗ lực
                                    của bạn, bạn vẫn đạt được không thể vượt qua
                                    band 6.5!&nbsp;😩 Bạn cố gắng học thật chăm
                                    chỉ, tập viết và nói thật nhiều&nbsp;nhưng
                                    điểm số của bạn vẫn vậy.&nbsp;Dường như
                                    không có gì có thể đẩy bạn lên đến band 7 và
                                    8. Tại sao?
                                </p>

                                <p>
                                    Sau khi làm bài, bạn cần phải được chấm chữa
                                    và nhận xét để&nbsp;biết lỗi sai của mình ở
                                    đâu và cách khắc phục chuẩn xác. Có như vậy
                                    bạn mới có thể cải thiện được trình độ.
                                </p>

                                <p>
                                    Khóa học chấm chữa&nbsp;IELTS Writing &amp;
                                    Speaking được xây dựng nhằm giúp các bạn
                                    hiểu rõ cách làm, khắc phục điểm yếu, học
                                    cách hành văn và cải thiện nhanh chóng hai
                                    kỹ năng khó nhằn nhất trong kỳ thi IELTS.
                                    Tất cả các bài làm (gồm bài luận&nbsp;và thu
                                    âm bài nói) đều được&nbsp;chấm chữa và cho
                                    điểm chi tiết bởi đội ngũ giáo viên giàu
                                    kinh nghiệm và trình độ chuyên môn cao của
                                    STUDY4. Khi đăng ký khóa học, bạn sẽ được:
                                </p>

                                <ul>
                                    <li>
                                        Chấm chữa đầy đủ từ vựng, ngữ pháp, liên
                                        kết, nội dung
                                    </li>
                                    <li>
                                        Phân tích chi tiết và lời khuyên để cải
                                        thiện
                                    </li>
                                    <li>
                                        Phiếu nhận xét&nbsp;và chấm điểm chuẩn
                                        form&nbsp;IELTS
                                    </li>
                                    <li>
                                        Nhận điểm từ 1-3 ngày&nbsp;sau khi nộp
                                        (trừ cuối tuần và ngày nghỉ lễ)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </WapperItemCard>
                    {/* chương trình học */}
                    <div
                        id="part-3"
                        className="bg-[#e8f2ff]  rounded-lg p-4 shadow-md lg:w-[47rem] mb-10"
                    >
                        {' '}
                        <h2 className="mb-4 font-bold text-[1.25rem]">
                            Chương trình học
                        </h2>
                        <>
                            <div className="SeriesSyllabusCourse mt-6 lg:flex block">
                                <div className="SeriesSyllabusCourse-number lg:w-[100px]">
                                    Khoá học
                                    <span className="SeriesSyllabusCourse-number-index lg:block inline-block">
                                        1
                                    </span>
                                </div>
                                <div className="series-syllabus-course-content pb-8 border-b-2">
                                    <h3
                                        className="series-syllabus-course-title"
                                        id="[ielts-fundamentals]-từ-vựng-và-ngữ-pháp-cơ-bản-ielts"
                                    >
                                        <a
                                            href="/courses/26/ielts-fundamentals/"
                                            className="text-[#213261] font-bold"
                                        >
                                            [IELTS Fundamentals] Từ vựng và ngữ
                                            pháp cơ bản IELTS
                                        </a>
                                    </h3>

                                    <div className="course-rating mb-2">
                                        <span className="average text-xl font-bold text-[#ffad3b] ml-[2px]">
                                            5.0
                                        </span>

                                        <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                        <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                        <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                        <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                        <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />

                                        <span className="ml-2">
                                            (211 Đánh giá)
                                        </span>
                                        <span className="ml-2">
                                            16,335 Học viên
                                        </span>
                                    </div>

                                    <div className="series-syllabus-course-overview">
                                        <p>
                                            ✅ Dành cho các bạn chưa vững nền
                                            tảng tiếng Anh hoặc đang&nbsp;ở mức
                                            sơ cấp&nbsp;(~A1-A2) - hướng tới mục
                                            tiêu đầu ra band 4.0+
                                        </p>

                                        <p>
                                            ✅ Gồm 15 giờ học video giảng dạy kỹ
                                            29&nbsp;chủ điểm&nbsp;ngữ pháp tiếng
                                            Anh quan trọng trong kỳ thi IELTS
                                        </p>

                                        <p>
                                            ✅&nbsp;Nắm trọn hơn 1.800 từ
                                            vựng&nbsp;chia thành 20 chủ đề như
                                            nghệ thuật, khoa học, thiết kế, khảo
                                            cổ học, lịch sử, văn học ... Đây là
                                            20 chủ đề sẽ xuất hiện trong IELTS
                                            Reading và Listening
                                        </p>

                                        <p>
                                            ✅ Gần 200 bài tập ngữ pháp và từ
                                            vựng, kết hợp&nbsp;luyện kỹ năng
                                            đọc, nghe và viết
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    {/* đánh giá  */}
                    <div
                        id="part-4"
                        style={{
                            width: '100%',
                        }}
                    >
                        {' '}
                        <h2 className="mb-4 font-bold text-[1.25rem]">
                            Nhận xét của học viên
                        </h2>
                        <WapperItemCard>
                            <div className="course-reviews-stats">
                                <div className="flex justify-between flex-wrap items-center">
                                    <div className="">
                                        <div className="reviews-stats font-bold text-[1.5rem]">
                                            <UserOutlined />
                                            123,668
                                        </div>
                                        <div className="reviews-stats-text">
                                            Học viên
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="reviews-stats font-bold text-[1.5rem]">
                                            <CommentOutlined />
                                            891
                                        </div>
                                        <div className="reviews-stats-text">
                                            Nhận xét
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="review-stats course-rating">
                                            <span className="average text-[1.5rem] font-bold text-[#ffad3b] ml-[2px]">
                                                5.0
                                            </span>

                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                        </div>
                                        <div className="reviews-stats-text">
                                            Đánh giá trung bình
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </WapperItemCard>
                        <WapperItemCard>
                            <Evaluate />
                        </WapperItemCard>
                    </div>
                    {/* bình luận */}
                    <WapperItemCard>
                        <Comment />
                    </WapperItemCard>
                </div>
            </div>
        </>
    );
}

export default NavBar;
