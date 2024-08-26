'use client';
import { useState, useEffect, useRef, memo } from 'react';

const CountDown = ({ timeStart, onTimeup, isIncremental, onPause, setPauseTimer, setResumeTimer }: any) => {
    const [count, setCount] = useState(timeStart);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef(Date.now());

    const updateCount = () => {
        setCount((prevCount: any) => {
            const elapsedTime = Math.floor(
                (Date.now() - startTimeRef.current) / 1000
            );
            if (isIncremental) {
                return timeStart + elapsedTime;
            } else {
                const remainingTime = timeStart - elapsedTime;
                if (remainingTime <= 0) {
                    onTimeup();
                    return 0;
                }
                return remainingTime;
            }
        });

        requestRef.current = requestAnimationFrame(updateCount);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateCount);

        return () => cancelAnimationFrame(requestRef.current as number);
    }, [onTimeup, timeStart, isIncremental]);

    const pauseTimer = () => {
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = null;
            if (onPause) {
                onPause(count);
            }
        }
    };

    const resumeTimer = () => {
        startTimeRef.current = Date.now() - count * 1000;
        requestRef.current = requestAnimationFrame(updateCount);
    };

    useEffect(() => {
        if (setPauseTimer) {
            setPauseTimer(() => pauseTimer);  // Truyền hàm pauseTimer ra ngoài
        }
        if (setResumeTimer) {
            setResumeTimer(() => resumeTimer);  // Truyền hàm resumeTimer ra ngoài
        }
    }, [setPauseTimer, setResumeTimer]);

    const toMMSS = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return [minutes, seconds].map((v) => (v < 10 ? '0' + v : v)).join(':');
    };

    return (
        <div className={`font-bold ${count <= 5 ? 'text-red-600' : 'text-black'}`}>
            {toMMSS(count)}
        </div>
    );
};

export default memo(CountDown);
