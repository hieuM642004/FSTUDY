
import { Blog } from 'src/apis/blogs/blogSchema/blog.schema';
import { Course } from 'src/apis/Course/courseSchema/course.schema';
import { User } from 'src/apis/users/userSchema/user.schema';


export class UpdateCommentDto {
  readonly _id?: string;
  readonly idUser: string;
  readonly idBlog: string;
  readonly idCourse: string;
  readonly parentId: string;
  readonly content: string;
  readonly replies: string[];
}
