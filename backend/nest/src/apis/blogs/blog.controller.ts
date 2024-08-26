import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    NotFoundException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { Blog, ChildTopic, Topic } from './blogSchema/blog.schema';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { BlogService } from './blog.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { title } from 'process';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    // Topic Controller
    // Create Topic route
    @Post('/create-topic')
    async createTopic(@Body() topic: Topic): Promise<ResponseData<Topic>> {
        try {
            const saveTopic = await this.blogService.createTopic(topic);
            return new ResponseData<Topic>(
                saveTopic,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Topic>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Update Topic route
    @Put('/update-topic/:id')
    async updateTopic(
        @Body() topic: Topic,
        @Param('id') id: string,
    ): Promise<ResponseData<Topic>> {
        try {
            const saveTopic = await this.blogService.updateTopic(topic, id);
            return new ResponseData<Topic>(
                saveTopic,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Topic>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // get Topic by id route
    @Get('topic/:id')
    async findTopicById(@Param('id') id: string): Promise<ResponseData<Topic>> {
        try {
            const saveTopic = await this.blogService.findTopicById(id);
            return new ResponseData<Topic>(
                saveTopic,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Topic>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Get alll Topic route
    @Get('topic')
    async findAllTopic(): Promise<ResponseData<Topic[]>> {
        try {
            const saveTopics = await this.blogService.findAllTopics();
            return new ResponseData<Topic[]>(
                saveTopics,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            console.error('Error fetching topics:', error);
            return new ResponseData<Topic[]>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Delete Topic route
    @Delete('topic/:id')
    async deleteTopicById(
        @Param('id') id: string,
    ): Promise<ResponseData<Topic>> {
        try {
            const topic = await this.blogService.deleteTopicById(id);
            if (!topic) {
                return new ResponseData<Topic>(
                    [],
                    HttpStatus.ERROR,
                    HttpMessage.ERROR,
                );
            } else {
                return new ResponseData<Topic>(
                    topic,
                    HttpStatus.SUCCESS,
                    HttpMessage.SUCCESS,
                );
            }
        } catch (error) {
            return new ResponseData<Topic>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    //   Child Topic Controller
    //     Create Child Topic route
    @Post('/create-child-topic')
    async createChildTopic(
        @Body() topic: ChildTopic,
    ): Promise<ResponseData<ChildTopic>> {
        try {
            const saveTopic = await this.blogService.createChildTopic(topic);
            return new ResponseData<ChildTopic>(
                saveTopic,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ChildTopic>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Update Child Topic route
    @Put('/update-child-topic/:id')
    async updateChildTopic(
        @Body() childTopic: ChildTopic,
        @Param('id') id: string,
    ): Promise<ResponseData<ChildTopic>> {
        try {
            const saveTopic = await this.blogService.updateChildTopic(
                childTopic,
                id,
            );
            return new ResponseData<ChildTopic>(
                saveTopic,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ChildTopic>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // get Topic by id route
    @Get('child-topic/:id')
    async findChildTopicById(
        @Param('id') id: string,
    ): Promise<ResponseData<ChildTopic>> {
        try {
            const saveTopic = await this.blogService.findChildTopicById(id);
            return new ResponseData<ChildTopic>(
                saveTopic,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ChildTopic>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Get alll Topic route
    @Get('child-topic')
    async findAllChildTopic(): Promise<ResponseData<ChildTopic[]>> {
        try {
            const saveChildTopics = await this.blogService.findAllChildTopics();
            return new ResponseData<ChildTopic[]>(
                saveChildTopics,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<ChildTopic[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Delete Topic route
    @Delete('child-topic/:id')
    async deleteChildTopicById(
        @Param('id') id: string,
    ): Promise<ResponseData<ChildTopic>> {
        try {
            const topic = await this.blogService.deleteChildTopicById(id);
            if (!topic) {
                return new ResponseData<ChildTopic>(
                    [],
                    HttpStatus.ERROR,
                    HttpMessage.ERROR,
                );
            } else {
                return new ResponseData<ChildTopic>(
                    topic,
                    HttpStatus.SUCCESS,
                    HttpMessage.SUCCESS,
                );
            }
        } catch (error) {
            return new ResponseData<ChildTopic>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
    // Blog Controller
    // Get all blog routes
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
            return new ResponseData<Blog[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Get blog by id routes
    @Get('/:id')
    async getBlogById(@Param('id') id: string): Promise<ResponseData<Blog>> {
        try {
            const blog = await this.blogService.findById(id);
            if (!blog) {
                return new ResponseData<Blog>(
                    [],
                    HttpStatus.ERROR,
                    HttpMessage.ERROR,
                );
            } else {
                return new ResponseData<Blog>(
                    blog,
                    HttpStatus.SUCCESS,
                    HttpMessage.SUCCESS,
                );
            }
        } catch (error) {
            return new ResponseData<Blog>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Create blog routes
    @Post('/create-blog')
  @UseInterceptors(FileInterceptor('avatar'))
  async createBlog(
    @Body() blogDto: Blog,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseData<Blog>> {
    try {
      const NewBlog = new Blog();
      Object.assign(NewBlog, blogDto);
      await NewBlog.generateSlug(); // Ensure generateSlug is awaited if it's asynchronous

      const savedBlog = await this.blogService.createBlog(NewBlog, file);
      return new ResponseData<Blog>(
        savedBlog,
        HttpStatus.SUCCESS,
        'Blog created successfully',
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Return specific error response for NotFoundException
        return new ResponseData<Blog>(
          null,
          HttpStatus.NOT_FOUND,
          error.message,
        );
      }
      if (error instanceof HttpException) {
        // Handle other known HttpExceptions
        throw error;
      }
      // Handle unexpected errors
      return new ResponseData<Blog>(
        null,
        HttpStatus.ERROR,
        'An unexpected error occurred while creating the blog',
      );
    }
  }

    // Update blog routes
    @Put('/update-blog/:id')
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
            return new ResponseData<Blog>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Delete blog routes
    @Delete('/:id')
    async deleteBlogById(@Param('id') id: string): Promise<ResponseData<Blog>> {
        try {
            const blog = await this.blogService.deleteBlogById(id);
            if (!blog) {
                return new ResponseData<Blog>(
                    [],
                    HttpStatus.ERROR,
                    HttpMessage.ERROR,
                );
            } else {
                return new ResponseData<Blog>(
                    blog,
                    HttpStatus.SUCCESS,
                    HttpMessage.SUCCESS,
                );
            }
        } catch (error) {
            return new ResponseData<Blog>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
    // Search Blog by name route
    @Post('search')
    async searchUserByName(
        @Body('key') title: string,
    ): Promise<ResponseData<Blog[]>> {
        try {
            const blogs = await this.blogService.searchBlogByName(title);
            return new ResponseData<Blog[]>(
                blogs,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Blog[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // filter blog by child topic id
    @Get('childTopic/filter/:topicId')
    async findByChildTopicId(
        @Param('topicId') topicId: string,
    ): Promise<ResponseData<Blog[]>> {
        try {
            const blogs = await this.blogService.findByChildTopicId(topicId);
            return new ResponseData<Blog[]>(
                blogs,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Blog[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // filter blog by topic id
    @Get('topic/filter/:topicId')
    async findByTopicId(
        @Param('topicId') topicId: string,
    ): Promise<ResponseData<Blog[]>> {
        try {
            const blogs = await this.blogService.findByTopicId(topicId);
            return new ResponseData<Blog[]>(
                blogs,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Blog[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
}
