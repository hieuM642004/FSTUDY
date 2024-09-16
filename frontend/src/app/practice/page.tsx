'use client';
import TextSelectorWrapper from '../flashcard/TextSelectorWrapper/TextSelectorWrapper';
import TakeTheTest from './Practice';
import { useRef } from 'react';

function PagePractice() {
    const countDownRef = useRef<any>(null);

    const handleTimeup = () => {
        console.log('Time is up!');
    };

    return (
        <>
            <TextSelectorWrapper
                pauseTimer={() => countDownRef.current?.pauseTimer()}
                resumeTimer={() => countDownRef.current?.resumeTimer()}
            >
                <TakeTheTest />
            </TextSelectorWrapper>
        </>
    );
}

export default PagePractice;
