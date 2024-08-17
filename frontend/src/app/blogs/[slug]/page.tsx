import BlogDetail from './BlogDetail';

function PageBlogDetail({ params }: { params: { slug: string } }) {
    return (
        <>
            <BlogDetail id={params.slug} />
        </>
    );
}

export default PageBlogDetail;
