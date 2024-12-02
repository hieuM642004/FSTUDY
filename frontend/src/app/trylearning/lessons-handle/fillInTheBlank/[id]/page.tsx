import React from 'react';

import FillInTheBlankPage from '../LessonsFillInTheBlank';

const LessonsHandle = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <FillInTheBlankPage id={params?.id || ''} />
        </>
    );
};

export default LessonsHandle;
