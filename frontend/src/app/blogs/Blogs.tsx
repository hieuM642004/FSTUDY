'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Pagination from '../../components/shared/Pagination/Pagination';
import Categories from './Layouts/Categories';
import LearnAbout from './Layouts/LearnAbout';
import BannerBlog from './Layouts/BannerBlog';
import Blog from './Blog/Blog';
import ButtonPrimary from '@/components/shared/ButtonPrimary/ButtonPrimary';
import { nestApiInstance } from '../../constant/api';

function Blogs() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [trigger, setTrigger] = useState<boolean>(false);
    const [topics, setTopics] = useState<any[]>([]);
    const [childTopics, setChildTopics] = useState<any[]>([]);

    const fetchBlogs = async () => {
        try {
            const response = await nestApiInstance.get(`/blog`);

            setBlogs(response?.data?.data?.blogs);
            console.log(response?.data?.data?.blogs);
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

            setTopics(topicsResponse?.data?.data);
            setChildTopics(childTopicsResponse?.data?.data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchTopicsAndChildTopics();
    }, [trigger]);

    const handleBlogUpdate = () => {
        setTrigger((prev) => !prev); // Toggle to trigger useEffect
    };
    if (blogs.length === 0) return <div>Loading...</div>;
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
                            <Categories />

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

export default Blogs;
