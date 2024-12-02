import Test from './Test';

function PageTest({params}: {params: {slug: string}}) {
    return (
        <>
            <Test slug={params.slug} />
        </>
    );
}

export default PageTest;
