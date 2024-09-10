'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { nestApiInstance } from '../../../../constant/api';

type VideoData = {
    _id: string;
    videoUrl: string;
    title: string;
    description: string;
    content_type: string;
};

const VideoPage = ({ id }: { id: string }) => {
    const [lessonsCourse, setLessonsCourse] = useState<{
        video: VideoData[];
    } | null>(null);

    const fetchVideo = async () => {
        try {
            const response = await nestApiInstance.get(`/course/content/${id}`);
            const videoData = response.data;
            setLessonsCourse(videoData);
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, [id]);

    return (
        <div className="p-10">
            {lessonsCourse ? (
                lessonsCourse.video?.map((video) => (
                    <Card key={video._id} title={video.title} className="mb-5">
                        <iframe
                            width="100%"
                            height="400px"
                            src={video.videoUrl}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        <Typography.Paragraph>
                            {video.description}
                        </Typography.Paragraph>
                    </Card>
                ))
            ) : (
                <Typography.Text>Loading videos...</Typography.Text>
            )}
        </div>
    );
};

export default VideoPage;
