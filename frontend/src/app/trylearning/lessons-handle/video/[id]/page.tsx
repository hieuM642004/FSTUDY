import React from 'react';

import VideoPage from '../LessonsVideo';

const LessonsHandle = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <VideoPage id={params?.id || ''} />
        </>
    );
};

export default LessonsHandle;
