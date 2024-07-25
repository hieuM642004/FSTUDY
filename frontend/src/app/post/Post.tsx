'use client';
import Image from 'next/image';
import { Form, Input } from 'antd';
import { useState } from 'react';

import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import Edittor from './Edittor/Edittor';
import IconUser from '/public/images/user_icon.webp';

function Post() {
    const [editorContent, setEditorContent] = useState('');

    const handleEditorContent = (content: any) => {
        setEditorContent(content);
    };
    const onFinish = (values: any) => {
        console.log(editorContent, ' check editorContent');
        console.log(values);
    };
    return (
        <div>
            <div className="max-w-[768px] pt-8 pb-12 m-auto">
                {/* post */}
                <WapperItemCard>
                    <h3 className="font-bold text-xl">Đăng bài viết</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item name="Title" label="Chủ đề">
                            <Input placeholder="" />
                        </Form.Item>
                        <Edittor onContentChange={handleEditorContent} />

                        <div className="flex justify-end mt-2">
                            <ButtonPrimary
                                htmlType="submit"
                                size="middle"
                                label="Đăng bài"
                                className="flex justify-center mb-3"
                            />
                        </div>
                    </Form>
                </WapperItemCard>
                    {/* info user */}
                <WapperItemCard>
                    <div className="flex items-center">
                        <div>
                            <Image
                                src={IconUser}
                                width={30}
                                height={30}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className="ml-3">
                            <h4 className="font-bold text-xl">Kim Thanh Loi</h4>
                            <p className="text-xs">Ngày đăng: 11/07/2024</p>
                        </div>
                    </div>
                    {/* main content */}
                    <div className="mt-3">
                        <div>
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
                                Vocabulary for IELTS hướng đến đối tượng các bạn
                                đang ở trình độ sơ cấp (tương đương A1-A2) và có
                                mong muốn thi IELTS trong tương lai. Mục tiêu
                                khóa học là xây dựng cho các bạn nền móng từ
                                vựng và ngữ pháp để đạt điểm tối thiểu 4.0 sau
                                3-4 tháng học đúng lộ trình.
                            </p>

                            <p>
                                Phần Từ vựng gồm hơn 1.800 từ&nbsp;được chia
                                thành 20 chủ đề khác nhau như nghệ thuật, văn
                                học, lịch sử, khảo cổ, khoa học, đời sống ... là
                                những chủ điểm chắc chắn sẽ xuất hiện khi đi
                                thi. Mỗi chủ đề bao gồm bô flashcards gồm đầy đủ
                                nghĩa Anh-Việt/ Anh-Anh&nbsp;hình ảnh, phiên âm,
                                phát âm, câu ví dụ. Phần ôn tập flashcards của
                                STUDY4 được thiết kế theo phương pháp Spaced
                                repetition (học lặp lại ngắt quãng) giúp bạn tối
                                ưu hóa thời gian và hiệu quả ôn tập: chỉ ôn
                                những từ sắp quên và bỏ qua những từ đã nhớ.
                                Giúp bạn hoàn toàn có thể học trọn 1.800 từ này
                                trong 2.5-3 tháng (~75 ngày). Ngoài ra, khóa học
                                cung cấp rất nhiều các dạng bài tập
                                mini-game&nbsp;khác nhau để bạn luyện tập từ
                                vựng như tìm cặp, nghe điền từ, nghe chọn từ
                                đúng, chính tả, trắc nghiệm.
                            </p>

                            <p>
                                Phần Ngữ pháp gồm 29 chủ điểm ngữ pháp quan
                                trọng nhất trong kỳ thi IELTS.&nbsp;Mỗi chủ điểm
                                bao gồm 1 video dài 10-15 phút giảng dạy chi
                                tiết từ giáo viên có chuyên môn cao của STUDY4,
                                slide để bạn take note khi học và phần nội dung
                                dạng text&nbsp;để đọc kỹ hơn. Bên cạnh đó, khóa
                                học cung câp thêm các dạng bài tập luyện chuyên
                                sâu ngữ pháp kết hợp các kỹ năng như nghe, đọc,
                                viết giúp bạn thực hành hàng ngày ngữ pháp hiệu
                                quả.
                            </p>

                            <p>
                                <strong>
                                    2. Chiến lược làm tất cả các dạng câu hỏi
                                    IELTS Reading và Listening
                                </strong>
                            </p>

                            <p>
                                Khóa học IELTS Intensive Listening và Intensive
                                Reading cung cấp video bài giảng hướng dẫn chi
                                tiết cách làm tất cả các dạng câu hỏi, tips làm
                                nhanh &amp; chính xác&nbsp;và chiến lược kiểm
                                soát thời gian hiệu quả.
                            </p>

                            <p>
                                <strong>3. Video chữa đề chi tiết</strong>
                            </p>

                            <p>
                                Khóa học IELTS Intensive cung cấp hơn 400h clip
                                chữa chi tiết rất nhiều bộ đề quan trọng. Mỗi
                                bài chữa đều bao gồm phương pháp đọc câu hỏi,
                                tìm keywords, cách tìm đáp án đúng hay lựa chọn
                                câu trả lời phù hợp.
                            </p>

                            <p>
                                <strong>
                                    4. Phương pháp luyện nghe và chép chính tả
                                    cực hiệu quả:
                                </strong>
                            </p>

                            <p>
                                Khoá học IELTS Intensive Listening - luyện nghe
                                bằng phương pháp Dictation gồm hơn 200 bài nghe
                                từ đề thi thật. Phương pháp dictation là
                                một&nbsp;phương pháp học ngôn ngữ bằng cách nghe
                                hội thoại hoặc văn bản,&nbsp;và sau đó&nbsp;viết
                                ra những gì bạn nghe được.&nbsp;STUDY4 có 3 chế
                                độ luyện tập: dễ, trung bình và nâng cao; tăng
                                dần&nbsp;tương ứng với số lượng ô trống bạn cần
                                điền trong 1 câu.
                            </p>

                            <ul>
                                <li>
                                    <strong>Nghe âm thanh</strong>

                                    <ul>
                                        <li>
                                            <em>
                                                Thông qua các bài tập, bạn sẽ
                                                phải nghe rất nhiều, đó là chìa
                                                khóa để cải thiện kỹ năng nghe
                                                IELTS của bạn
                                            </em>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Nhập những gì bạn nghe thấy</strong>
                                    <ul>
                                        <li>
                                            <em>
                                                Việc gõ những gì bạn nghe được
                                                buộc bạn phải tập trung vào từng
                                                chi tiết giúp bạn trở nên tốt
                                                hơn trong việc phát âm, đánh vần
                                                và viết.
                                            </em>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Kiểm tra và sửa chữa</strong>
                                    <ul>
                                        <li>
                                            <em>
                                                Việc sửa lỗi rất quan trọng đối
                                                với độ chính xác khi nghe và khả
                                                năng đọc hiểu của bạn, tốt nhất
                                                là bạn nên highlight và lưu lại
                                                những lỗi sai mình mắc phải
                                            </em>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <p>
                                <strong>
                                    5. Bộ từ vựng có xác&nbsp;suất&nbsp;99% sẽ
                                    xuất hiện trong phần thi&nbsp;IELTS Reading
                                    và Listening
                                </strong>
                            </p>

                            <p>
                                Theo thống kê của trung tâm luyện thi New
                                Oriental, bộ đề Cam&nbsp;có đủ lượng từ
                                vựng&nbsp;bạn cần để có thể i.e đạt được band
                                9&nbsp;trong&nbsp;phần thi IELTS Reading và
                                Listening. Vì vậy, bên cạnh việc luyện đề, học
                                từ mới trong bộ đề này là một việc cực kỳ quan
                                trọng nếu bạn muốn đạt điểm cao trong 2 phần thi
                                trên. Với mục đích giúp các bạn học viên tiết
                                kiệm thời gian tra từ, đánh dấu cũng như có
                                phương tiện ôn từ hiệu quả nhất,&nbsp;STUDY4 đã
                                tổng hợp từ vựng&nbsp;trong bộ đề này thành khoá
                                học duy nhất gồm flashcards, highlights từ vựng
                                trong bài, và các bài tập thực hành dễ dùng dễ
                                học.
                            </p>

                            <p>
                                <strong>
                                    6. Hệ thống bài luyện tập dưới dạng game lý
                                    thú
                                </strong>
                            </p>

                            <p>
                                Với mỗi list từ vựng, thay vì phải làm những bài
                                tập khô khan, bạn sẽ “phải” chơi hàng loạt trò
                                chơi. Việc này vừa giúp việc học không hề nhàm
                                chán, căng thẳng mà việc tiếp xúc cả hình ảnh,
                                màu sắc, âm thanh liên quan đền từ vựng sẽ kích
                                thích não bộ ghi nhớ nhanh hơn và lâu hơn.&nbsp;
                            </p>

                            <p>
                                4000 từ vựng tưởng như nhiều nhưng với phương
                                pháp học mà chơi, chơi mà học, việc phá đảo khối
                                lượng từ khủng như vậy hoàn toàn nằm trong lòng
                                bàn tay bạn.&nbsp;
                            </p>

                            <p>
                                <strong>
                                    7. Nắm trọn cách trả lời các dạng câu hỏi
                                    Task 1 và chủ đề thông dụng Task 2 phần thi
                                    IELTS Writing
                                </strong>
                            </p>

                            <p>
                                Trong khóa học IELTS Intensive Writing,&nbsp;bạn
                                sẽ:
                            </p>

                            <ul>
                                <li>
                                    Hiểu cấu trúc của phần thi IELTS Writing
                                </li>
                                <li>
                                    Học cách viết câu trả lời cho&nbsp;bất
                                    kỳ&nbsp;câu hỏi Writing Task 1 và Task 2 nào
                                    sau khi học cách nhận dạng các loại câu hỏi
                                    khác nhau
                                </li>
                                <li>
                                    Học cách tạo trong bài luận của bạn để bạn
                                    có thể bắt đầu viết như người bản xứ bằng
                                    từ/cụm từ liên kết (cohesive devices)
                                </li>
                                <li>
                                    Tăng lượng từ vựng của bạn một cách nhanh
                                    chóng và hiệu quả
                                </li>
                                <li>
                                    Thực hành nhận dạng và sửa những lỗi ngữ
                                    pháp, chính tả thường gặp khi viết (mạo từ,
                                    dấu câu, mệnh đề quan hệ ...)
                                </li>
                                <li>
                                    bắt đầu cảm thấy tự tin, yên tâm và ngày
                                    càng chuẩn bị tốt hơn cho phần thi viết
                                    trong kỳ thi IELTS tiếp theo
                                </li>
                            </ul>

                            <p>
                                Mỗi bài học là 1 bài luận được viết bởi một cựu
                                giám khảo IELTS. STUDY4 đã tạo ra các bài tập
                                tương ứng giúp bạn học được tối đa mỗi bài luận,
                                bao gồm:
                            </p>

                            <ul>
                                <li>Học từ mới trong bài</li>
                                <li>
                                    Học từ, cụm từ liên kết các câu, ý nổi bật
                                    được sử dụng trong bài
                                </li>
                                <li>Luyện tập tìm và sửa lỗi ngữ pháp</li>
                                <li>
                                    Học vai trò từng câu trong bài văn và luyện
                                    tập viết lại câu
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
                                    Nắm lòng cách phát âm IPA và những yếu tố
                                    quan trọng khi nói tiếng Anh như intonation,
                                    stress, thought groups, cách trả lời các
                                    dạng câu hỏi (Wh- hay yes/no)
                                </li>
                                <li>
                                    Hiểu cấu trúc của phần thi IELTS Speaking
                                </li>
                                <li>
                                    Học cách&nbsp;trả lời cho các chủ đề part 1,
                                    2, và 3&nbsp;thường gặp và các chủ đề mới
                                    nhất được update theo các quý
                                </li>
                                <li>
                                    Tăng lượng từ vựng của bạn một cách nhanh
                                    chóng và hiệu quả
                                </li>
                                <li>
                                    Thực hành nhận dạng và sửa những lỗi ngữ
                                    pháp, chính tả thường gặp khi nói
                                </li>
                                <li>
                                    bắt đầu cảm thấy tự tin, yên tâm và ngày
                                    càng chuẩn bị tốt hơn cho phần thi nói trong
                                    kỳ thi IELTS tiếp theo
                                </li>
                            </ul>

                            <p>
                                Mỗi bài speaking sample được viết bởi một cựu
                                giám khảo IELTS. STUDY4 đã tạo ra các bài tập
                                tương ứng giúp bạn học được tối đa mỗi bài, bao
                                gồm:
                            </p>

                            <ul>
                                <li>Học từ mới trong bài</li>
                                <li>Luyện tập tìm và sửa lỗi ngữ pháp</li>
                                <li>
                                    Thực hành luyện nói theo phương pháp
                                    shadowing
                                </li>
                                <li>
                                    Lưu lại bài nói trên cộng đồng học tập để
                                    học hỏi từ các bạn học viên khác
                                </li>
                            </ul>

                            <p>
                                <strong>
                                    9. Chấm chữa chi tiết bài làm IELTS Speaking
                                    và Writing bởi giáo viên bản ngữ
                                </strong>
                            </p>

                            <p>
                                Để đạt được điểm số cao trong hai phần
                                thi&nbsp;IELTS Speaking và Writing là&nbsp;rất
                                khó.&nbsp;Bất chấp mọi nỗ lực của bạn, bạn vẫn
                                đạt được không thể vượt qua band 6.5!&nbsp;😩
                                Bạn cố gắng học thật chăm chỉ, tập viết và nói
                                thật nhiều&nbsp;nhưng điểm số của bạn vẫn
                                vậy.&nbsp;Dường như không có gì có thể đẩy bạn
                                lên đến band 7 và 8. Tại sao?
                            </p>

                            <p>
                                Sau khi làm bài, bạn cần phải được chấm chữa và
                                nhận xét để&nbsp;biết lỗi sai của mình ở đâu và
                                cách khắc phục chuẩn xác. Có như vậy bạn mới có
                                thể cải thiện được trình độ.
                            </p>

                            <p>
                                Khóa học chấm chữa&nbsp;IELTS Writing &amp;
                                Speaking được xây dựng nhằm giúp các bạn hiểu rõ
                                cách làm, khắc phục điểm yếu, học cách hành văn
                                và cải thiện nhanh chóng hai kỹ năng khó nhằn
                                nhất trong kỳ thi IELTS. Tất cả các bài làm (gồm
                                bài luận&nbsp;và thu âm bài nói) đều
                                được&nbsp;chấm chữa và cho điểm chi tiết bởi đội
                                ngũ giáo viên giàu kinh nghiệm và trình độ
                                chuyên môn cao của STUDY4. Khi đăng ký khóa học,
                                bạn sẽ được:
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
                                    Nhận điểm từ 1-3 ngày&nbsp;sau khi nộp (trừ
                                    cuối tuần và ngày nghỉ lễ)
                                </li>
                            </ul>
                        </div>
                    </div>
                </WapperItemCard>
            </div>
        </div>
    );
}

export default Post;
