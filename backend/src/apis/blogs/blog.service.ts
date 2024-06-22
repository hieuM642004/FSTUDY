import { Injectable } from '@nestjs/common';
import { Blog } from './BlogSchema/blog.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Readable } from 'stream';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { CreateBlogDto } from './dto/create.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: mongoose.Model<Blog>,
    private readonly googleDriveUploader: GoogleDriveUploader,
  ) {}

  async findAll(): Promise<Blog[]> {
    const blogs = await this.blogModel.find();
    return blogs;
  }

  async findById(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    return blog;
  }

  async createBlog(
    blog: CreateBlogDto,
    file: Express.Multer.File,
  ): Promise<Blog> {
    try {
      const blogcreate = { ...blog };
      const fileStream = Readable.from(file.buffer);
      const fileId = await this.googleDriveUploader.uploadImage(
        fileStream,
        file.originalname,
        '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
      );
      const ImageUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
      const blogData = { ...blogcreate, avatar: ImageUrl };
      const res = await this.blogModel.create(blogData);
      return res;
    } catch (error) {
      console.error('Error create blog:', error);
      throw error;
    }
  }

  async updateBlog(
    blog: CreateBlogDto,
    file: Express.Multer.File,
    id: string,
  ): Promise<Blog> {
    try {
      const blogUpdate = { ...blog };
      const fileStream = Readable.from(file.buffer);
      const fileId = await this.googleDriveUploader.uploadImage(
        fileStream,
        file.originalname,
        '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
      );
      const ImageUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
      const blogData = { ...blogUpdate, avatar: ImageUrl };

      const res = await this.blogModel.findByIdAndUpdate(id, blogData);
      return res;
    } catch (error) {
      console.error('Error create blog:', error);
      throw error;
    }
  }

  // async CreateBlog (blog : Blog , file : Express.Multer.File) : Promise<Blog>{
  //     try {
  //         const fileStream = Readable.from(file.buffer);
  //         const fileId = await this.googleDriveUploader.uploadFile(
  //             fileStream,
  //             file.originalname,

  //         )
  //     } catch (error) {

  //     }
  // }
}
