import { Injectable } from '@nestjs/common';
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

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name)
        private readonly blogModel: mongoose.Model<Blog>,
        @InjectModel(Topic.name)
        private readonly topicModel: mongoose.Model<Topic>,
        @InjectModel(ChildTopic.name)
        private readonly childTopicModel: mongoose.Model<ChildTopic>,
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
        const childTopics = await this.childTopicModel.find().exec();
        return childTopics;
    }
    // Find Child Topic By Id
    async findChildTopicById(id: string): Promise<ChildTopic> {
        try {
            const res = await this.childTopicModel.findById(id);
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
        const blogs = await this.blogModel.find();
        return blogs;
    }

    // Find Blog by Id
    async findById(id: string): Promise<Blog> {
        const blog = await this.blogModel.findById(id);
        return blog;
    }

    // Create Blog
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
        const blogs = await this.blogModel.find({ name: key });
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
