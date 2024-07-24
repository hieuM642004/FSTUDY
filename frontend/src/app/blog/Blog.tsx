'use client';
import Pagination from '../../components/shared/Pagination/Pagination';
import Categories from './Layouts/Categories';
import LearnAbout from './Layouts/LearnAbout';
import BannerBlog from './Layouts/BannerBlog';
import ItemPost from './Items/ItemPost';

function Blog() {
    return (
        <>
            <div className="pb-4 pt-4">
                <div className="pt-4 px-3">
                    {/* Banner  */}
                    <BannerBlog />
                    {/* content */}
                    <div>
                        <h2 className="font-extrabold text-3xl uppercase mb-4">
                            Bài viết
                        </h2>
                        <div>
                            <div className="flex flex-wrap md:flex-nowrap justify-center">
                                {/* category */}
                                <Categories />
                                {/* content  */}
                                <div className="grow pl-6  pb-8  md:border-l-[1px]">
                                    <ItemPost />
                                    <ItemPost />
                                    <ItemPost />
                                    <ItemPost />
                                    <ItemPost />
                                    {/* pagination */}
                                    <Pagination />
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

export default Blog;
