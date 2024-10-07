import FormFlashCard from '../../FormFlashCard/FormFlashCard.';

function PageEditFlashCard({ params }: { params: { id: string } }) {
    return <FormFlashCard id={params.id || ''} />;
}

export default PageEditFlashCard;
