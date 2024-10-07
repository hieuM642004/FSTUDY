import FormExamSession from '../FormExamSession/FormGroupQuestion';

function AddGroupQuestions({ params }: { params: { id: string } }) {
    return <FormExamSession id={params.id} />;
}

export default AddGroupQuestions;
