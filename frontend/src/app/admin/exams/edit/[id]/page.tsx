import FormExam from '../../FormExams/FormExams';

function EditExam({ params }: { params: { id: string } }) {
    return <FormExam id={params.id} />;
}

export default EditExam;
