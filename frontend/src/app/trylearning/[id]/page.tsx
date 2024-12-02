import React from 'react';
import TryLearningPages from '../tryLearning';
import '../TryLearning.scss';

const TryLearning = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <TryLearningPages id={params?.id} />
        </>
    );
};

export default TryLearning;
