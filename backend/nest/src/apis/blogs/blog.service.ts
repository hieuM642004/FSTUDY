import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Blog, ChildTopic, Topic } from './blogSchema/blog.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Readable } from 'stream';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { CreateBlogDto } from './dto/create.dto';
import { CreateTopicDto } from './dto/createTopic.dto';
import { UpdateTopicDto } from './dto/updateTopic.dto';
import { CreateChildTopicDto } from './dto/createChildTopic.dto';
import { UpdateChildTopicDto } from './dto/updateChildTopic.dto';
import { User } from '../users/userSchema/user.schema';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name)
        private readonly blogModel: mongoose.Model<Blog>,
        @InjectModel(Topic.name)
        private readonly topicModel: mongoose.Model<Topic>,
        @InjectModel(ChildTopic.name)
        private readonly childTopicModel: mongoose.Model<ChildTopic>,
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>,
        private readonly googleDriveUploader: GoogleDriveUploader,
    ) {}

    // Topic Service Methods
    // Create Topic
    async createTopic(Topic: CreateTopicDto): Promise<Topic> {
        try {
            const res = await this.topicModel.create(Topic);
            return res;
        } catch (error) {
            console.error('Error create child topic:', error);
            throw error;
        }
    }
    
    // Update Topic By Id
    async updateTopic(topic: UpdateTopicDto, id: string): Promise<Topic> {
        try {
            const res = await this.topicModel.findByIdAndUpdate(id, topic);
            return res;
        } catch (error) {
            console.error('Error create topic:', error);
            throw error;
        }
    }

    // Find All Topics
    async findAllTopics(): Promise<Topic[]> {
        const topics = await this.topicModel.find().exec();
        return topics;
    }

    // Find Topic By Id
    async findTopicById(id: string): Promise<Topic> {
        try {
            const res = await this.topicModel.findById(id);
            return res;
        } catch (error) {
            console.error('Error create topic:', error);
            throw error;
        }
    }

    // Delete Topic by id
    async deleteTopicById(id: string): Promise<Topic> {
        try {
            const res = await this.topicModel.findByIdAndDelete(id);
            return res;
        } catch (error) {
            console.error('Error deleting topic:', error);
            throw error;
        }
    }

    //ChildTopic Service
    // Create Child Topic
    async createChildTopic(childTopictopic: CreateChildTopicDto): Promise<ChildTopic> {
        try {
            const res = await this.childTopicModel.create(childTopictopic);
            return res;
        } catch (error) {
            console.error('Error create child topic:', error);
            throw error;
        }
    }

    // Update Child Topic By Id
    async updateChildTopic(childTopictopic: UpdateChildTopicDto, id: string): Promise<ChildTopic> {
        try {
            const res = await this.childTopicModel.findByIdAndUpdate(id, childTopictopic);
            return res;
        } catch (error) {
            console.error('Error update child topic :', error);
            throw error;
        }
    }

    // Find All Child Topics
    async findAllChildTopics(): Promise<ChildTopic[]> {
        const childTopics = await this.childTopicModel.find()
        .populate('topic')
        .exec();
        return childTopics;
    }
    // Find Child Topic By Id
    async findChildTopicById(id: string): Promise<ChildTopic> {
        try {
            const res = await this.childTopicModel.findById(id).populate('topic');
            return res;
        } catch (error) {
            console.error('Error create child topic:', error);
            throw error;
        }
    }

    // Delete Child Topic by id
    async deleteChildTopicById(id: string): Promise<ChildTopic> {
        try {
            const res = await this.childTopicModel.findByIdAndDelete(id);
            return res;
        } catch (error) {
            console.error('Error deleting child topic:', error);
            throw error;
        }
    }

    // Blog Service Methods
    // Search Blog By Name
   

    // Find all blogs
    async findAll(): Promise<Blog[]> {
        const blogs = await this.blogModel
            .find()
            .populate({
                path: 'user', 
                model: 'User' 
            })
            .populate({
                path: 'childTopics',
                populate: {
                    path: 'topic',
                    model: 'Topic' 
                }
            })
            .populate('likes')         
            .populate('comments')      
            .exec();
        return blogs;
    }

    // Find Blog by Id
    async findById(key: string): Promise<Blog | null> {
        let query: any;
        if (this.isValidObjectId(key)) {
            query = { _id: key };
        } else {
            query = { slug: key };
        }
    
        const blog = await this.blogModel.findOne(query)
        .populate({
            path: 'user', 
            model: 'User' 
        })
            .populate({
                path: 'childTopics',
                populate: {
                    path: 'topic',
                    model: 'Topic'
                }
            })
            .populate('likes')         
            .populate('comments')      
            .exec();
    
        return blog;
    }
    
    private isValidObjectId(id: string): boolean {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }

    // Create Blog
    async createBlog(
        blog: CreateBlogDto,
        file: Express.Multer.File,
      ): Promise<Blog> {
        try {
          const userExists = await this.userModel.findById(blog.user).exec();
          if (!userExists) {
            throw new NotFoundException('User does not exist');
          }
    
          const fileStream = Readable.from(file.buffer);
          const fileId = await this.googleDriveUploader.uploadImage(
            fileStream,
            file.originalname,
            '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
          );
          const ImageUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
          const blogData = { ...blog, avatar: ImageUrl };
          return await this.blogModel.create(blogData);
        } catch (error) {
          console.error('Error creating blog:', error);
          if (error instanceof NotFoundException) {
            throw error; // Rethrow NotFoundException to be caught by the controller
          }
          throw new InternalServerErrorException('Error creating blog');
        }
      }

    // Update blog by Id
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

    // delete Blog by Id
    async deleteBlogById(id: string): Promise<Blog> {
        try {
            const res = await this.blogModel.findByIdAndDelete(id);
            return res;
        } catch (error) {
            console.error('Error deleting blog:', error);
            throw error;
        }
    }

    async searchBlogByName(key: string): Promise<Blog[]> {
        const blogs = await this.blogModel.find({ title: key });
        return blogs;
    }

    // Filter Blog by Topic id
    async findByChildTopicId(topicId: string): Promise<Blog[]> {
        const blogs = await this.blogModel.find({ childTopics: topicId }).exec();
        if (!blogs || blogs.length === 0) {
            return;
        }
        return blogs;
    }

    async findByTopicId(topicId: string): Promise<Blog[]> {
        const childTopics = await this.childTopicModel.find({ topic: topicId }).exec();

        if (!childTopics || childTopics.length === 0) {
          return [];
        }
        const childTopicIds = childTopics.map(childTopic => childTopic._id);
        const blogs = await this.blogModel.find({ childTopics: { $in: childTopicIds } }).exec();
        
        return blogs;
      }
}
