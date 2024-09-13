'use client';
import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { nestApiInstance } from '../../../../constant/api';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

type VideoData = {
    _id: string;
    videoUrl: string;
    title: string;
    description: string;
    content_type: string;
    completed: boolean;
    progress: number;
};

const VideoPage = ({ id }: { id: string }) => {
    const [lessonsCourse, setLessonsCourse] = useState<{ video: VideoData[]; } | null>(null);
    const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});
    const [userId, setUserId] = useState<string | null>(null);

    const fetchVideo = async () => {
        try {
            const response = await nestApiInstance.get(`/course/content/${id}`);
            const videoData = response.data;

            if (userId) {
                const progressResponse = await nestApiInstance.get(`/course/progress/${userId}`);
                const userProgress = progressResponse.data;
                const updatedVideos = videoData.video.map((video: VideoData) => ({
                    ...video,
                    progress: userProgress.find((p: any) => p.videoId === video._id)?.progress || 0,
                    completed: userProgress.find((p: any) => p.videoId === video._id)?.completed || false,
                }));

                setLessonsCourse({ video: updatedVideos });
                const progressMap = userProgress.reduce((acc: Record<string, number>, p: any) => {
                    acc[p.videoId] = p.progress;
                    return acc;
                }, {});
                setVideoProgress(progressMap);
            } else {
                setLessonsCourse(videoData);
            }
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    const updateVideoProgress = async (videoId: string, currentTime: number, totalTime: number) => {
        try {
            await nestApiInstance.post(`/course/update/progress`, {
                videoId,
                userId,
                currentTime,
                totalTime,
            });
        } catch (error) {
            console.error('Error updating video progress:', error);
        }
    };

    const handleTimeUpdate = (videoId: string, currentTime: number, totalTime: number) => {
        const progressPercentage = (currentTime / totalTime) * 100;
        if (videoProgress[videoId] === undefined || progressPercentage > videoProgress[videoId]) {
            setVideoProgress((prev) => ({
                ...prev,
                [videoId]: progressPercentage,
            }));
            updateVideoProgress(videoId, currentTime, totalTime);
        }
    };

    useEffect(() => {
        const token = getCookie('token'); 
        if (token) {
            const decoded: any = jwtDecode(token);
            const idUser: string = decoded.id;
            setUserId(idUser);
        } else {
            setUserId(null);
        }

        fetchVideo();
    }, [id, userId]);

    return (
        <div className="p-10">
            {lessonsCourse ? (
                lessonsCourse.video.map((video) => (
                    <Card key={video._id} title={video.title} className="mb-5">
                        <video
                            width="100%"
                            height="100px"
                            controls
                            onTimeUpdate={(e) =>
                                handleTimeUpdate(
                                    video._id,
                                    (e.target as HTMLVideoElement).currentTime,
                                    (e.target as HTMLVideoElement).duration
                                )
                            }
                        >
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <Typography.Paragraph>{video.description}</Typography.Paragraph>
                        <Typography.Paragraph>
                            {video.completed 
                                ? 'Completed'
                                : `Tiến độ hoàn thành: ${Math.round(videoProgress[video._id] || 0)}%`}
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
