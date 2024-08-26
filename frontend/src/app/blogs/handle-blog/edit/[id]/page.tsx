import HandleBlogPage from '../../handleBlog';
function PageEditBlog({ params }: { params: { id: string } }) {
    return <HandleBlogPage id={params.id || ''} />;
}

export default PageEditBlog;
