import {
    StarFilled,
} from '@ant-design/icons';
import Image from 'next/image';

function ItemComment() {
    return (
        <>
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
                            <strong>Trịnh Minh Hằng</strong>, Tháng năm 16, 2024
                        </div>
                        <div className="">
                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                        </div>

                        <div className="">
                            <span className="font-bold">Khoá học: </span>
                            <span>
                                <a
                                    className=""
                                    href="/courses/15/ielts-intensive-listening/"
                                >
                                    [IELTS Intensive Listening] Chiến lược làm
                                    bài - Chữa đề - Luyện nghe IELTS Listening
                                    theo phương pháp Dictation
                                </a>
                            </span>
                        </div>

                        <div className="">
                            rất tốt cho việc cải thiện kỹ năng nghe
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemComment;
