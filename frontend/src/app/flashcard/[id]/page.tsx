import FlashCard from './FlashCard';

function PageDetailFlashCard({ params }: { params: { id: string } }) {
    return <FlashCard id={params.id} />;
}

export default PageDetailFlashCard;
