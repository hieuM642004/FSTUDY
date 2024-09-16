import React from 'react';

import WordMatchingPage from '../LessonsWordMatching';
const LessonsHandle = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <WordMatchingPage id={params?.id || ''} />
        </>
    );
};

export default LessonsHandle;
