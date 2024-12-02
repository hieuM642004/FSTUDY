import React from 'react';
import TryLearningPages from '@/app/trylearning/tryLearning';

const TryLearning = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <TryLearningPages id={params?.id} />
        </>
    );
};

export default TryLearning;
