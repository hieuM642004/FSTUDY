import HandleLessonsPage from '../../HandleLessons';

const EditLessons = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <HandleLessonsPage id={params.id || ''} />
        </>
    );
};

export default EditLessons;
