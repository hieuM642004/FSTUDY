import HandleCoursesPage from '../../HandleCourses';
const EditCourse = ({ params }: { params: { id: string } }) => {
    return <HandleCoursesPage id={params.id || ''} />;
};

export default EditCourse;
