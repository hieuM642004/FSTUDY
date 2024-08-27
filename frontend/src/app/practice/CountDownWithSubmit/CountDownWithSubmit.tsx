'use client';

import { useState, useEffect, useRef, memo } from 'react';
import ButtonPrimary from "@/components/shared/ButtonPrimary/ButtonPrimary";
import ConfirmModal from "@/components/shared/ModalComfirm/ModalComfirm";

const CountDownWithSubmit = ({ timeStart, onTimeup, isIncremental }: any) => {
    const [count, setCount] = useState(timeStart);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef(Date.now());
    const pausedTimeRef = useRef<number | null>(null); 

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
            pausedTimeRef.current = count;  
        }
    };
    
    const resumeTimer = () => {
        if (pausedTimeRef.current !== null) {
          
            startTimeRef.current = Date.now() - (timeStart - pausedTimeRef.current) * 1000;
        } else {
           
            startTimeRef.current = Date.now() - count * 1000;
        }
        requestRef.current = requestAnimationFrame(updateCount);
    };

    const handleShowModal = () => {
        pauseTimer(); 
        setIsModalVisible(true);
    };

    const handleConfirm = () => {
        console.log("Thời gian dừng lại:", pausedTimeRef.current);
        
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        resumeTimer();  
    };

    const toMMSS = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return [minutes, seconds].map((v) => (v < 10 ? '0' + v : v)).join(':');
    };

    return (
        <>
            <div className={`font-bold ${count <= 5 ? 'text-red-600' : 'text-black'}`}>
                {toMMSS(count)}
            </div>
            <ButtonPrimary
                label="Nộp bài"
                className="mt-2"
                size="large"
                onClick={handleShowModal}
            />
            <ConfirmModal
                message="Bạn có chắc chắn muốn nộp bài?"
                visible={isModalVisible}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                okText="Có"
                cancelText="Không"
            />
        </>
    );
};

export default memo(CountDownWithSubmit);
