'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { nestApiInstance } from '../../constant/api';
import Courses from '../../components/client/Course/Courses';

function CoureseOnlinePage() {
    const [courses, setCourses] = useState<any[]>([]);
    const fetchCourses = async () => {
        try {
            const response = await nestApiInstance.get(`/course`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <>
            {/* banner */}
            <div className="pb-4 pt-4 ">
                <div className="relative ">
                    <div className="absolute inset-0 bg-gray-800 opacity-30 rounded-md"></div>
                    <img
                        src="/images/2024.png"
                        alt="Picture of the author"
                        className="w-full h-96 rounded-md shadow-md"
                    />
                </div>
            </div>
            <div>
                {/* list course online */}
                <Courses data={courses} />
            </div>
        </>
    );
}

export default CoureseOnlinePage;
