'use client';
import { useState, useEffect } from 'react';

const CountDown = ({ timeStart, onTimeup, isIncremental }: any) => {
    const [count, setCount] = useState(timeStart);
    const [startTime, setStartTime] = useState<number>(0);

    useEffect(() => {
        if (isIncremental) {
            setStartTime(Date.now());
        }

        const timer = setInterval(() => {
            setCount((prevCount: any) => {
                if (isIncremental) {
                    const elapsedTime = Math.floor(
                        (Date.now() - startTime) / 1000,
                    );
                    return timeStart + elapsedTime; 
                } else {
                    if (prevCount <= 0) {
                        clearInterval(timer);
                        onTimeup();
                        return 0;
                    }
                    return prevCount - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeup, timeStart, isIncremental, startTime]);

    const toMMSS = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;

        return [minutes, seconds].map((v) => (v < 10 ? '0' + v : v)).join(':');
    };

    return (
        <div
            className={`${
                count <= 5 ? 'text-red-600' : 'text-black'
            } font-bold`}
        >
            {toMMSS(count)}
        </div>
    );
};

export default CountDown;
