'use client'
import Image from 'next/image';
import Link from 'next/link';
import { SearchOutlined, FacebookOutlined } from '@ant-design/icons';

import Pagination from '../../components/shared/Pagination/Pagination';

function Blog() {
    return (
        <>
            <div className="pb-4 pt-4">
                <div className="pt-4 px-3">
                    {/* Banner  */}
                    <div>
                        <div className="mb-2">
                            <Link
                                className="hover:text-black text-[#595d68]"
                                href="/"
                            >
                                Trang chủ
                            </Link>
                            &nbsp; / &nbsp;
                            <Link
                                className="hover:text-black text-[#35509a] font-bold"
                                href="/blog"
                            >
                                Bài viết
                            </Link>
                        </div>
                        <a href="" className="mb-8 block">
                            <Image
                                src="https://study4.com/static/img/testonline_banner.jpg"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                                alt="Picture of the author"
                                className=""
                            />
                        </a>
                    </div>
                    {/* content */}
                    <div>
                        <h2 className="font-extrabold text-3xl uppercase mb-4">
                            Bài viết
                        </h2>
                        <div>
                            <div className="flex flex-wrap md:flex-nowrap justify-center">
                                {/* category */}
                                <div className="flex-none w-[11rem]  md:block  px-3">
                                    {' '}
                                    <h4 className="text-xl font-bold mb-4">
                                        Chuyên mục
                                    </h4>
                                    {/* list cate */}
                                    <div>
                                        <p className="font-semibold text-base my-2">
                                            Tìm hiểu về FSTUDY
                                        </p>
                                        <div>
                                            <div className="ml-6 mb-3 text-sm">
                                                <Link href="">
                                                    Tính năng trên FSTUDY
                                                </Link>
                                            </div>
                                            <div className="ml-6 mb-3 text-sm">
                                                <Link href="">
                                                    Tính năng trên FSTUDY
                                                </Link>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-base my-2">
                                            Tìm hiểu về FSTUDY
                                        </p>
                                        <div>
                                            <div className="ml-6 mb-3 text-sm">
                                                <Link href="">
                                                    Tính năng trên FSTUDY
                                                </Link>
                                            </div>
                                            <div className="ml-6 mb-3 text-sm">
                                                <Link href="">
                                                    Tính năng trên FSTUDY
                                                </Link>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-base my-2">
                                            Tìm hiểu về FSTUDY
                                        </p>
                                        <div>
                                            <div className="ml-6 mb-3 text-sm">
                                                <Link href="">
                                                    Tính năng trên FSTUDY
                                                </Link>
                                            </div>
                                            <div className="ml-6 mb-3 text-sm">
                                                <Link href="">
                                                    Tính năng trên FSTUDY
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* content  */}
                                <div className="grow pl-6  pb-8  md:border-l-[1px]">
                                    <div className="flex flex-row justify-between items-center border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] flex-1">
                                            <Image
                                                src="https://study4.com/media/examprep/Post/files/2024/07/11/ielts_speaking_p2_sample_3.png"
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <span className="block font-bold text-gray-400">
                                                IELTS SPEAKING
                                            </span>
                                            <Link
                                                href=""
                                                className="mb-[6px] font-bold text-2xl"
                                            >
                                                Describe a place you visited
                                                that has beautiful views - Bài
                                                mẫu IELTS Speaking (Cambridge 19
                                                Test 4)
                                            </Link>
                                            <p className="mb-4 italic">
                                                Hãy tham khảo bài mẫu 8.0+ chủ
                                                đề “Describe a place you visited
                                                that has beautiful views” cho
                                                IELTS Speaking Part 2 và 3 nhé!
                                            </p>
                                            <div className="text-sm">
                                                11/07/2024 Kim Thành Lợi
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] flex-1">
                                            <Image
                                                src="https://study4.com/media/examprep/Post/files/2024/07/11/ielts_speaking_p2_sample_3.png"
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <span className="block font-bold text-gray-400">
                                                IELTS SPEAKING
                                            </span>
                                            <Link
                                                href=""
                                                className="mb-[6px] font-bold text-2xl"
                                            >
                                                Describe a place you visited
                                                that has beautiful views - Bài
                                                mẫu IELTS Speaking (Cambridge 19
                                                Test 4)
                                            </Link>
                                            <p className="mb-4 italic">
                                                Hãy tham khảo bài mẫu 8.0+ chủ
                                                đề “Describe a place you visited
                                                that has beautiful views” cho
                                                IELTS Speaking Part 2 và 3 nhé!
                                            </p>
                                            <div className="text-sm">
                                                11/07/2024 Kim Thành Lợi
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] flex-1">
                                            <Image
                                                src="https://study4.com/media/examprep/Post/files/2024/07/11/ielts_speaking_p2_sample_3.png"
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <span className="block font-bold text-gray-400">
                                                IELTS SPEAKING
                                            </span>
                                            <Link
                                                href=""
                                                className="mb-[6px] font-bold text-2xl"
                                            >
                                                Describe a place you visited
                                                that has beautiful views - Bài
                                                mẫu IELTS Speaking (Cambridge 19
                                                Test 4)
                                            </Link>
                                            <p className="mb-4 italic">
                                                Hãy tham khảo bài mẫu 8.0+ chủ
                                                đề “Describe a place you visited
                                                that has beautiful views” cho
                                                IELTS Speaking Part 2 và 3 nhé!
                                            </p>
                                            <div className="text-sm">
                                                11/07/2024 Kim Thành Lợi
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] flex-1">
                                            <Image
                                                src="https://study4.com/media/examprep/Post/files/2024/07/11/ielts_speaking_p2_sample_3.png"
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <span className="block font-bold text-gray-400">
                                                IELTS SPEAKING
                                            </span>
                                            <Link
                                                href=""
                                                className="mb-[6px] font-bold text-2xl"
                                            >
                                                Describe a place you visited
                                                that has beautiful views - Bài
                                                mẫu IELTS Speaking (Cambridge 19
                                                Test 4)
                                            </Link>
                                            <p className="mb-4 italic">
                                                Hãy tham khảo bài mẫu 8.0+ chủ
                                                đề “Describe a place you visited
                                                that has beautiful views” cho
                                                IELTS Speaking Part 2 và 3 nhé!
                                            </p>
                                            <div className="text-sm">
                                                11/07/2024 Kim Thành Lợi
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] flex-1">
                                            <Image
                                                src="https://study4.com/media/examprep/Post/files/2024/07/11/ielts_speaking_p2_sample_3.png"
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <span className="block font-bold text-gray-400">
                                                IELTS SPEAKING
                                            </span>
                                            <Link
                                                href=""
                                                className="mb-[6px] font-bold text-2xl"
                                            >
                                                Describe a place you visited
                                                that has beautiful views - Bài
                                                mẫu IELTS Speaking (Cambridge 19
                                                Test 4)
                                            </Link>
                                            <p className="mb-4 italic">
                                                Hãy tham khảo bài mẫu 8.0+ chủ
                                                đề “Describe a place you visited
                                                that has beautiful views” cho
                                                IELTS Speaking Part 2 và 3 nhé!
                                            </p>
                                            <div className="text-sm">
                                                11/07/2024 Kim Thành Lợi
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center border-b-[1px] mt-3">
                                        <div className="w-[11.25rem] h-[6.313rem] flex-1">
                                            <Image
                                                src="https://study4.com/media/examprep/Post/files/2024/07/11/ielts_speaking_p2_sample_3.png"
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                }}
                                            />
                                        </div>
                                        <div className="pb-5 mb-5 flex-[3] pl-2">
                                            <span className="block font-bold text-gray-400">
                                                IELTS SPEAKING
                                            </span>
                                            <Link
                                                href=""
                                                className="mb-[6px] font-bold text-2xl"
                                            >
                                                Describe a place you visited
                                                that has beautiful views - Bài
                                                mẫu IELTS Speaking (Cambridge 19
                                                Test 4)
                                            </Link>
                                            <p className="mb-4 italic">
                                                Hãy tham khảo bài mẫu 8.0+ chủ
                                                đề “Describe a place you visited
                                                that has beautiful views” cho
                                                IELTS Speaking Part 2 và 3 nhé!
                                            </p>
                                            <div className="text-sm">
                                                11/07/2024 Kim Thành Lợi
                                            </div>
                                        </div>
                                    </div>
                                    {/* pagination */}
                                    <Pagination />
                                </div>
                                {/* learn about  */}
                                <div className="flex-none w-[18.25rem]  md:block  px-3">
                                    {/* sreach blog */}
                                    <div className="mb-4">
                                        <h4 className="text-xl font-bold mb-4">
                                            Tìm kiếm bài viết
                                        </h4>
                                        <div className="relative">
                                            <span className="absolute right-4 top-2">
                                                <SearchOutlined className="text-2xl" />
                                            </span>
                                            <form action="" method="get">
                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                    className="py-[6px] pl-3 pr-12 w-full rounded-md border-2"
                                                    placeholder="Nhập từ khóa bạn muốn tìm kiếm"
                                                />
                                            </form>
                                        </div>
                                    </div>
                                    {/* learn about */}
                                    <div className="mb-4">
                                        <h4 className="text-xl font-bold mb-4">
                                            Tìm hiểu thêm
                                        </h4>
                                        {/* list learn about */}
                                        <div className="flex flex-col rounded-lg">
                                            <Link
                                                href=""
                                                className="border-[1px] px-2 text-sm font-bold text-gray-500 py-1 first:rounded-t-xl hover:bg-[#f7faff]"
                                            >
                                                🎧 KHÓA HỌC IELTS INTENSIVE
                                                LISTENING
                                            </Link>
                                            <Link
                                                href=""
                                                className="border-[1px] px-2 text-sm font-bold text-gray-500 py-1 hover:bg-[#f7faff]"
                                            >
                                                🎧 KHÓA HỌC IELTS INTENSIVE
                                                LISTENING
                                            </Link>
                                            <Link
                                                href=""
                                                className="border-[1px] px-2 text-sm font-bold text-gray-500 py-1 last:rounded-b-lg hover:bg-[#f7faff]"
                                            >
                                                🎧 KHÓA HỌC IELTS INTENSIVE
                                                LISTENING
                                            </Link>
                                        </div>
                                    </div>
                                    {/* advertisement */}
                                    <div>
                                        <Link href="" className="mb-3 block">
                                            <Image
                                                src="https://study4.com/media/home/HomeBanner/files/2022/07/06/Learning_English_with.jpg"
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
                                        </Link>
                                        <Link href="" className="mb-3 block">
                                            <Image
                                                src="https://study4.com/media/home/HomeBanner/files/2021/12/01/download_extension.png"
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
                                        </Link>
                                        {/* list group FB */}
                                        <div>
                                            <div className="text-center border mb-3">
                                                <Image
                                                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/225605814_137648018518630_1539189158239507292_n.png?stp=dst-png_s370x247&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeFszJH9ggzus_v2V_9j7D2ULTlQJT_4jnYtOVAlP_iOduYseFkcXbLtiCMMcbcS80tbS97zDf04juzM1WekhLSa&_nc_ohc=KfGV9WukLlgQ7kNvgFtSfF_&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYBUeSJ5ABI62H6dqx-_w5zIdm0YrPPb7LOwHvsD1LY55Q&oe=669536AA"
                                                    width={500}
                                                    height={500}
                                                    alt="Picture of the author"
                                                    className=""
                                                />
                                                <p className="mx-3 mt-2 mb-1 font-bold text-sm">
                                                    Chia sẻ kinh nghiệm và tài
                                                    liệu tự học IELTS 8.0+
                                                </p>
                                                <p className=" text-xs text-gray-500 mb-2">
                                                    Facebook group · 257,154
                                                    members
                                                </p>
                                                <div className="flex items-center justify-center">
                                                    <Link
                                                        target="_blank"
                                                        href="https://www.facebook.com/groups/study4.ielts/?ref=web_social_plugin"
                                                        className="bg-[#4267b2]  block w-[85%]  rounded text-white font-bold mb-2"
                                                    >
                                                        {' '}
                                                        <FacebookOutlined />{' '}
                                                        Visit group
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="text-center border mb-3">
                                                <Image
                                                    src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/225605814_137648018518630_1539189158239507292_n.png?stp=dst-png_s370x247&_nc_cat=107&ccb=1-7&_nc_sid=1760b9&_nc_eui2=AeFszJH9ggzus_v2V_9j7D2ULTlQJT_4jnYtOVAlP_iOduYseFkcXbLtiCMMcbcS80tbS97zDf04juzM1WekhLSa&_nc_ohc=KfGV9WukLlgQ7kNvgFtSfF_&_nc_ht=scontent.fsgn5-10.fna&oh=00_AYBUeSJ5ABI62H6dqx-_w5zIdm0YrPPb7LOwHvsD1LY55Q&oe=669536AA"
                                                    width={500}
                                                    height={500}
                                                    alt="Picture of the author"
                                                    className=""
                                                />
                                                <p className="mx-3 mt-2 mb-1 font-bold text-sm">
                                                    Chia sẻ kinh nghiệm tự học
                                                    tiếng Anh cho người đi làm
                                                </p>
                                                <p className=" text-xs text-gray-500 mb-2">
                                                    Facebook group · 30,424
                                                    members
                                                </p>
                                                <div className="flex items-center justify-center">
                                                    <Link
                                                        target="_blank"
                                                        href="https://www.facebook.com/groups/dilam.hoctienganh/?ref=web_social_plugin"
                                                        className="bg-[#4267b2]  block w-[85%]  rounded text-white font-bold mb-2"
                                                    >
                                                        {' '}
                                                        <FacebookOutlined />{' '}
                                                        Visit group
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
