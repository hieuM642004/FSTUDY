import Result from './Result';

function PageResult({ params }: { params: { id: string } }) {
    return <Result id={params.id} />;
}

export default PageResult;
