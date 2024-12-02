import PageBlogByCategories from './BlogByCategories';

const BlogByCategories = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <PageBlogByCategories id={params.id} />
        </>
    );
};

export default BlogByCategories;
