import React from 'react';
import LessonsHandlePage from '../LessonsQuiz';

const LessonsHandle = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <LessonsHandlePage id={params?.id || ''} />
        </>
    );
};

export default LessonsHandle;
