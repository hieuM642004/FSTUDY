'use client';
import Image from 'next/image';
import Link from 'next/link';

import LearnAbout from '../Layouts/LearnAbout';
import Categories from '../Layouts/Categories';
import BannerBlog from '../Layouts/BannerBlog';
import WapperItemCard from '@/components/client/WapperItemCard/WapperItemCard';
import Comment from '../../../components/client/Comment/Comment';
import Blog from '../Blog/Blog';


function BlogDetail({ id }: string | any) {
    console.log('check id' , id);
    
    return (
        <>
            <div className=" pt-4">
                <div className="pt-4 px-3">
                    {/* Banner  */}
                    <BannerBlog
                        breadcrumb={[
                            'trang chủ',
                            'bài viết',
                            'IELTS Writing',
                            'Location and Types of Dance Classes Young People Are Attending - Bài mẫu IELTS Writing Task 1 (Multiple Charts)',
                        ]}
                    />
                    {/* title blogdetail */}
                    <div className="text-center">
                        <h2 className=" xl:text-4xl md:text-2xl  text-xl font-bold mb-4">
                            Location and Types of Dance Classes Young People Are
                            Attending - Bài mẫu IELTS Writing Task 1 (Multiple
                            Charts)
                        </h2>
                        <p className="mb-4 font-semibold text-lg">
                            Tham khảo đề thi IELTS Writing Task 1 “Location and
                            Types of Dance Classes Young People Are Attending”
                            thuộc Cambridge 19 Test 4. Hãy cùng xem bài mẫu đạt
                            band 8.0+ này cùng STUDY4 nhé!
                        </p>
                    </div>
                    {/* content */}
                    <div className="py-3">
                        <div>
                            <div className="flex flex-wrap md:flex-nowrap justify-center">
                                {/* category */}
                                <Categories />
                                {/* content  */}
                                <div className="grow pl-6   pb-8   md:border-l-[1px]">
                                    <div>
                                        {/* user information */}
                                        <div className="flex items-center border-b-[1px] py-2 mb-4">
                                            <div>
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    src="https://study4.com/static/img/user_icon.png"
                                                    alt="Picture of the author"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p>Kim Thanh Loi</p>
                                                <span>11/07/2024</span>
                                            </div>
                                        </div>
                                        {/*  Related articles */}
                                        <WapperItemCard>
                                            <p className="italic font-bold mb-2">
                                                Các bài viết liên quan
                                            </p>
                                            <ul className="pl-10 mb-4 text-[#35509a]">
                                                <li>
                                                    <Link href="">
                                                        How a hot air balloon
                                                        works - Bài mẫu IELTS
                                                        Writing Task 1 (Process)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="">
                                                        Numbers of Participants
                                                        for Different Activities
                                                        in Melbourne - Bài mẫu
                                                        IELTS
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="">
                                                        Writing Task 1 (Line
                                                        Graph)
                                                    </Link>
                                                </li>
                                            </ul>
                                        </WapperItemCard>
                                        {/* main content  */}
                                        <div>
                                            <h2>Render Nội dung </h2>
                                        </div>
                                        {/* comment  */}
                                        <div className="my-7">
                                            <Comment />
                                        </div>
                                        {/* Maybe you will be interested */}
                                        <div>
                                            <h3 className="font-bold text-2xl mb-2">
                                                Có thể bạn sẽ quan tâm
                                            </h3>
                                            <ul className="pl-10 mb-4 text-[#35509a]">
                                                <li>
                                                    <Link href="">
                                                        Cách tự học IELTS
                                                        Writing online tại nhà
                                                        hiệu quả
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="">
                                                        Cách brainstorm ý tưởng
                                                        IELTS Writing Task 2
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Related topics */}
                                        <div className="my-7">
                                            <h3 className="font-bold text-2xl mb-2">
                                                Các bài viết cùng chủ đề
                                            </h3>
                                            <Blog />
                                            <Blog />
                                            <Blog />
                                            <Blog />
                                        </div>
                                    </div>
                                </div>
                                {/* learn about  */}
                                <LearnAbout />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogDetail;
