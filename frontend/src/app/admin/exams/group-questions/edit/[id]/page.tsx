import FormExamSession from "../../FormExamSession/FormGroupQuestion";

function EditGroupQuestions({ params }: { params: { id: string } }) {
    return <FormExamSession id={params.id} />;
}

export default EditGroupQuestions;
