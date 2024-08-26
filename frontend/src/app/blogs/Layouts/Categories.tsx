import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { nestApiInstance } from '../../../constant/api';

function Categories() {
    const [topics, setTopics] = useState<any[]>([]);
    const [childTopics, setChildTopics] = useState<any[]>([]);

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
        fetchTopicsAndChildTopics();
    }, []);

    return (
        <div className="flex-none w-[11rem] md:block px-3">
            <h4 className="text-xl font-bold mb-4">Chuyên mục</h4>

            {/* Hiển thị tất cả các topics */}
            {topics.map((topic) => (
                <div key={topic._id}>
                    <p className="font-semibold text-base my-2">{topic.name}</p>

                    {/* Hiển thị childTopics thuộc topic này */}
                    {childTopics
                        .filter((childTopic) =>
                            childTopic.topic.some(
                                (t: any) => t._id === topic._id,
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
                                    {filteredChildTopic.name}
                                </Link>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default Categories;
