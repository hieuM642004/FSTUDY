'use client';
import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
import { nestApiInstance } from '../../../constant/api';

function Blog() {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await nestApiInstance.get('/blog');
                setBlog(res.data.data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="flex flex-col-reverse border-b-[1px] mt-3 w-full">
            {blog.map((item: any) => (
                <div key={item._id} className="flex border-b mb-4">
                    <div className="w-[11.25rem] h-[6.313rem] flex">
                        <img
                            src={item.avatar}
                            alt={item.title}
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
                            {item.name}
                        </span>
                        <Link
                            href={`/blogs/${item._id}`}
                            className="mb-[6px] font-bold text-2xl"
                        >
                            {item.title}
                        </Link>
                        <p className="mb-4 italic">{item.content}</p>
                        <div className="text-sm">
                            {item.date} | {item.slug}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Blog;
