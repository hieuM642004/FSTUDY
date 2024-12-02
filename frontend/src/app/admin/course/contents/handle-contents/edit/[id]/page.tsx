import AddContentPage from './EditContent';

const EditContents = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <AddContentPage id={params.id || ''} />
        </>
    );
};

export default EditContents;
