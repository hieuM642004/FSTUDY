import React from 'react';
import { Progress } from 'antd';

interface VideoProgressBarProps {
    progress: number;  
    completed: boolean;
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ progress, completed }) => {
    const progressPercent = Math.min(Math.max(progress, 0), 100);

    return (
        <div style={{ marginTop: 10 }}>
            {!completed ? (
                <Progress
                    percent={progressPercent}
                    strokeColor='blue'
                    trailColor="#e9e9e9"
                    showInfo={false}
                    strokeWidth={5}
                />
            ) : (
                <div>Completed</div>
            )}
            {!completed && (
                <div style={{ marginTop: 5 }}>
                    {`${Math.round(progressPercent)}% Completed`}
                </div>
            )}
        </div>
    );
};

export default VideoProgressBar;
