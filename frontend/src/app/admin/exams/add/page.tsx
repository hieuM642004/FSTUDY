import FormExam from "../FormExams/FormExams";

function AddExam({ params }: { params: { id: string } }) {
    return <FormExam id={params.id} />;
}

export default AddExam;
