import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { Blog } from './BlogSchema/blog.schema';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { BlogService } from './blog.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllBlog(): Promise<ResponseData<Blog[]>> {
    try {
      const blogs = await this.blogService.findAll();
      return new ResponseData<Blog[]>(
        blogs,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Blog[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Get('/:id')
  async getBlogById(@Param('id') id: string): Promise<ResponseData<Blog>> {
    try {
      const blog = await this.blogService.findById(id);
      if (!blog) {
        return new ResponseData<Blog>([], HttpStatus.ERROR, HttpMessage.ERROR);
      } else {
        return new ResponseData<Blog>(
          blog,
          HttpStatus.SUCCESS,
          HttpMessage.SUCCESS,
        );
      }
    } catch (error) {
      return new ResponseData<Blog>([], HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  
  @Post('/createBlog')
  @UseInterceptors(FileInterceptor('avatar'))
  async createBlog(
    @Body() blog: Blog,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseData<Blog>> {
    try {
      const NewBlog = new Blog();
      Object.assign(NewBlog, blog);
      NewBlog.generateSlug();
      const saveBlog = await this.blogService.createBlog(NewBlog, file);
      return new ResponseData<Blog>(
        saveBlog,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Blog>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post('/updateBlog/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateBlog(
    @Body() blog: Blog,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseData<Blog>> {
    try {
      const updateBlogData = new Blog();
      Object.assign(updateBlogData, blog);
      updateBlogData.generateSlug();
      const BlogData = await this.blogService.updateBlog(
        updateBlogData,
        file,
        id,
      );
      return new ResponseData<Blog>(
        BlogData,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Blog>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
