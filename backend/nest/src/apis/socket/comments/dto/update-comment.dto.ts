
import { Blog } from 'src/apis/blogs/blogSchema/blog.schema';
import { Course } from 'src/apis/Course/courseSchema/course.schema';
import { User } from 'src/apis/users/userSchema/user.schema';


export class UpdateCommentDto {
  readonly _id?: string;
  readonly idUser: User;
  readonly idBlog: Blog;
  readonly idCourse: Course;
  readonly parentId: Comment;
  readonly content: string;
  readonly replies: Comment[];
}
