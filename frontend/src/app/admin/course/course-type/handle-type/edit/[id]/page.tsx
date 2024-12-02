import HandleTypePage from '../../handleType';

const EditType = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <HandleTypePage id={params.id || ''} />
        </>
    );
};

export default EditType;
