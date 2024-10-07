
import FormExamSession from "../FormExamSession/FormExamSession";

function AddExamSession({ params }: { params: { id: string } }) {
    return <FormExamSession id={params.id} />;
}

export default AddExamSession;
