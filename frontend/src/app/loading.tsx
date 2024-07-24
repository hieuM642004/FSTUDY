'use client';
import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';

export default function Loading() {
    const [spinning, setSpinning] = useState(false);
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        setSpinning(true);
        let ptg = -10;

        const interval = setInterval(() => {
            ptg += 5;
            setPercent(ptg);

            if (ptg > 120) {
                clearInterval(interval);
                setSpinning(false);
                setPercent(0);
            }
        }, 100);
    },[]);

   
    return <Spin spinning={spinning} percent={percent} fullscreen />;
}
