import Image from 'next/image';
import Link from 'next/link';
function Comment() {
    return (
        <>
            <h3 className="font-bold text-xl mb-3">Bình Luận</h3>
            <div className="flex mb-4">
                <textarea
                    name="content"
                    rows={1}
                    className="py-[6px] pl-6 pr-3 w-[100%] border rounded-l-xl"
                    placeholder="Chia sẻ cảm nghĩ của bạn ..."
                ></textarea>
                <div className="rounded-r-xl">
                    <button className="bg-[#35509a] rounded-r-xl text-white py-[6px] px-3 h-full">
                        Gửi
                    </button>
                </div>
            </div>
            {/*  comment post */}
            <div className="mt-2">
                {/* No comments yet */}
                <p className="italic text-[#355097]">
                    Chưa có bình luận nào. Hãy trở thành người đầu tiên bình
                    luận bài này.
                </p>
                {/* comment now */}
                <div>
                    <div>
                        <div className="flex mb-3">
                            <div>
                                <Image
                                    src="https://study4.com/static/img/user_icon.png"
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                                    className="mr-2"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-[#355097]">
                                    KimThanhLoi{' '}
                                    <span className="font-normal">
                                        Tháng bảy 12,2024
                                    </span>
                                </p>
                                <p>good post</p>
                                <span className="font-bold text-[#355097] cursor-pointer">
                                    Trả lời
                                </span>
                            </div>
                        </div>
                        {/* reply comment */}
                        <div className="flex mb-3 ml-10 mb-3">
                            <div>
                                <Image
                                    src="https://study4.com/static/img/user_icon.png"
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                                    className="mr-2"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-[#355097]">
                                    KimThanhLoi{' '}
                                    <span className="font-normal">
                                        Tháng bảy 12,2024
                                    </span>
                                </p>
                                <p>good post</p>
                                <span className="font-bold text-[#355097] cursor-pointer">
                                    Trả lời
                                </span>
                            </div>
                        </div>
                        {/* reply comment */}
                        <div className="flex mb-3 ml-20 mb-3">
                            <div>
                                <Image
                                    src="https://study4.com/static/img/user_icon.png"
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                                    className="mr-2"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-[#355097]">
                                    KimThanhLoi{' '}
                                    <span className="font-normal">
                                        Tháng bảy 12,2024
                                    </span>
                                </p>
                                <p>good post</p>
                                <span className="font-bold text-[#355097] cursor-pointer">
                                    Trả lời
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mb-3">
                            <div>
                                <Image
                                    src="https://study4.com/static/img/user_icon.png"
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                                    className="mr-2"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-[#355097]">
                                    KimThanhLoi{' '}
                                    <span className="font-normal">
                                        Tháng bảy 12,2024
                                    </span>
                                </p>
                                <p>good post</p>
                                <span className="font-bold text-[#355097] cursor-pointer">
                                    Trả lời
                                </span>
                            </div>
                        </div>
                        {/* reply comment */}
                        <div className="flex mb-3 ml-10 mb-3">
                            <div>
                                <Image
                                    src="https://study4.com/static/img/user_icon.png"
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                                    className="mr-2"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-[#355097]">
                                    KimThanhLoi{' '}
                                    <span className="font-normal">
                                        Tháng bảy 12,2024
                                    </span>
                                </p>
                                <p>good post</p>
                                <span className="font-bold text-[#355097] cursor-pointer">
                                    Trả lời
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;
