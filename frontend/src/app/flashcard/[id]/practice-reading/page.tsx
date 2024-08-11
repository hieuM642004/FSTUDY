import PracticeReading from './PracticeReading';

function PagePracticeReading({ params }: { params: { id: string } }) {
    return <PracticeReading id={params.id} />;
}

export default PagePracticeReading;
