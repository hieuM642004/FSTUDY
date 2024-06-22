import { StarFilled} from '@ant-design/icons';

function ContentHeader() {
    return ( <>
       <div className="contentHeader bg-cover ">
                <div className="banner md:text">
                    <div className="overlay"> </div>{' '}
                    <div className="ContainerHeader lg:px-3 lg:pt-10 text-white">
                        <div className="flex">
                            <div className="flex-[1.5]  lg:w-64 ...">
                                {' '}
                                <h2 className="lg:text-xl font-bold ">
                                    Combo khóa học IELTS lộ trình 0-7+ kèm chấm
                                    chữa giáo viên bản ngữ [Tặng khóa TED Talks]
                                </h2>
                                <div className="course-tags mt-3">
                                    <span className="bg-[#f0f8ff]  py-1 px-[0.625rem] rounded rounded-xl text-[#35509a]">
                                        #Khóa học online
                                    </span>
                                </div>
                                <div className="course-rating mt-2">
                                    <span className="average text-xl font-bold text-[#ffad3b] ml-[2px]">
                                        4.9
                                    </span>
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <StarFilled className="text-[1.25rem]  text-[#ffad3b] ml-[2px]" />
                                    <span className="ml-1">(892 Đánh giá)</span>
                                    <span className="ml-1">
                                        123,668 Học viên
                                    </span>
                                </div>
                                <div className="course-overview  lg:mt-2 text-[1rem]">
                                    <div>
                                        ✅ Dành cho các bạn từ mất
                                        gốc,&nbsp;target band 7+
                                    </div>

                                    <div>
                                        ✅ Sở hữu trọn bộ 5&nbsp;khoá
                                        học&nbsp;IELTS: Grammar/Vocabulary
                                        Fundamentals - Listening -
                                        Reading&nbsp;- Writing - Speaking
                                    </div>

                                    <div>
                                        ✅ Gói 5 bài chấm chữa chi tiết bởi giáo
                                        viên bản ngữ Anh, Úc, Mỹ có bằng masters
                                        các ngành ngôn ngữ và văn học và&nbsp;có
                                        chứng chỉ dạy CELTA/DELTA/TESOL
                                    </div>

                                    <div>
                                        ✅ Tặng kèm khoá
                                        <strong>
                                            &nbsp;
                                            <u>
                                                Luyện nghe nói tiếng
                                                Anh&nbsp;cùng Ted Talks
                                            </u>
                                        </strong>
                                        &nbsp;trị giá 599k
                                    </div>

                                    <div>
                                        ✅ Combo&nbsp;khoá học có giá trị 12
                                        tháng
                                    </div>
                                </div>
                            </div>
                           
                            <div className="lg:flex-1 lg:w-7 ... ">
                               
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
    </> );
}

export default ContentHeader;