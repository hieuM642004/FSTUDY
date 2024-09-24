import HandleBlogPage from '../../hanldeBlog';
function PageEditBlog({ params }: { params: { id: string } }) {
    return <HandleBlogPage id={params.id || ''} />;
}

export default PageEditBlog;
