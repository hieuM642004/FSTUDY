'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Pagination from '../../../../components/shared/Pagination/Pagination';
import LearnAbout from '../../Layouts/LearnAbout';
import BannerBlog from '../../Layouts/BannerBlog';
import Blog from '../../Blog/Blog';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../../../constant/api';

function PageBlogByCategories({ id }: string | any) {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [trigger, setTrigger] = useState<boolean>(false);
    const [topics, setTopics] = useState<any[]>([]);
    const [childTopics, setChildTopics] = useState<any[]>([]);

    const hanldCategoriesBlog = async () => {
        try {
            const response = await nestApiInstance.get(
                `/blog/childTopic/filter/${id}`,
            );
            console.log(response.data);

            setBlogs(response.data.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const fetchTopicsAndChildTopics = async () => {
        try {
            const topicsResponse = await nestApiInstance.get('/blog/topic');
            const childTopicsResponse = await nestApiInstance.get(
                '/blog/child-topic',
            );

            setTopics(topicsResponse.data.data);
            setChildTopics(childTopicsResponse.data.data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    useEffect(() => {
        hanldCategoriesBlog();
        fetchTopicsAndChildTopics();
    }, [trigger]);

    const handleBlogUpdate = () => {
        setTrigger((prev) => !prev);
    };

    return (
        <div className="pb-4 pt-4">
            <div className="pt-4 px-3">
                {/* Banner */}
                <BannerBlog />
                {/* content */}
                <div>
                    <h2 className="font-extrabold text-3xl uppercase mb-4">
                        Bài viết
                    </h2>
                    <div>
                        <div className="flex flex-wrap md:flex-nowrap justify-center">
                            {/* category */}
                            {/* <Categories /> */}
                            <div className="flex-none w-[11rem] md:block px-3">
                                <h4 className="text-xl font-bold mb-4">
                                    Chuyên mục
                                </h4>

                                {/* Hiển thị tất cả các topics */}
                                {topics.map((topic) => (
                                    <div key={topic._id}>
                                        <p className="font-semibold text-base my-2">
                                            {topic.name}
                                        </p>

                                        {/* Hiển thị childTopics thuộc topic này */}
                                        {childTopics
                                            .filter((childTopic) =>
                                                childTopic.topic.some(
                                                    (t: any) =>
                                                        t._id === topic._id,
                                                ),
                                            )
                                            .map((filteredChildTopic) => (
                                                <div
                                                    key={filteredChildTopic._id}
                                                    className="ml-6 mb-3 text-sm"
                                                >
                                                    <Link
                                                        href={`/blogs/blog-by-categories/${filteredChildTopic._id}`}
                                                    >
                                                        {
                                                            filteredChildTopic.name
                                                        }
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </div>
                            {/* content */}
                            <div className="grow pl-6 pb-8 md:border-l-[1px]">
                                <Blog
                                    data={blogs}
                                    onChange={handleBlogUpdate}
                                />
                                {/* pagination */}
                                <Pagination
                                // currentPage={currentPage}
                                // totalPages={totalPages}
                                // onPageChange={setCurrentPage}
                                />
                            </div>
                            {/* learn about */}
                            <LearnAbout />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageBlogByCategories;
