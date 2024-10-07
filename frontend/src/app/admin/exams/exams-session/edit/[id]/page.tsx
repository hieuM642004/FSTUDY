import FormExamSession from "../../FormExamSession/FormExamSession";

function EditExamSession({ params }: { params: { id: string } }) {
    return <FormExamSession id={params.id} />;
}

export default EditExamSession;
