import { StarFilled } from '@ant-design/icons';
import Image from 'next/image';

function Courses({ title, listcoures }: string | any) {
    return (
        <>
            <div className="px-3 pt-5 pb-2">
                {title && (
                    <h2 className="font-bold text-2xl mb-4 pl-2">{title}:</h2>
                )}

                <div className="flex flex-wrap">
                    {/* list course online */}
                    <div className="px-3  w-[390px] h-[351px] hover:scale-105 transition ease-in-out delay-150 duration-300">
                        <div
                            style={{ boxShadow: '0 4px #e4e6eb' }}
                            className="mb-4 bg-white  w-full min-h-[12.5rem] rounded-lg border-2"
                        >
                            <a href="" className="">
                                <div>
                                    <Image
                                        src="https://study4.com/media/courses/CourseSeries/files/2023/10/11/combo_intensive.webp"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                        alt="Picture of the author"
                                        className=""
                                    />
                                </div>
                                <div className="px-4 pt-2 pb-1 font-medium text-lg font-semibold">
                                    Combo khoá học IELTS Intensive [Tặng khoá
                                    TED Talks]
                                </div>
                                <div className="px-4">
                                    <div className="text-base">
                                        {' '}
                                        <div className="inline-block">
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                            <StarFilled className="text-[20px] text-xl text-[#ffad3b] ml-[2px]" />
                                        </div>
                                        <span>(1,260)</span>
                                        <span className="ml-[.25rem]">
                                            97,61 Học viên
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <span className="py-[3px] text-xs px-[10px] bg-[#f0f8ff] rounded-full text-[#35509a]">
                                            #Khoá học online
                                        </span>
                                    </div>
                                    <div className="py-2 ">
                                        <span className="text-[#3cb46e] font-bold text-xl">
                                            1.525.000đ
                                        </span>

                                        <span className="line-through ml-1">
                                            3.596.000đ
                                        </span>
                                        <span className="ml-[.5rem] rounded-full text-[#fff] bg-[#e43a45] font-bold">
                                            -57%
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Courses;
