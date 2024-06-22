import { Readable } from 'stream';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
// import { CourseLessonService } from './course-lesson.service';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseType } from './CourseSchema/course.schema';
import { CreateCourseTypeDto } from './dto/create-course-type.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(CourseType.name)
    private readonly courseTypeModel: mongoose.Model<CourseType>,
    @InjectModel(Course.name)
    private readonly courseModel: mongoose.Model<Course>,
    // private readonly googleDriveUploader: GoogleDriveUploader,
  ) {}
  /**
   * Service of Course Type form here 
   *  */ 

  // Create Course Type
  async CreateTypeCourse(course : CreateCourseTypeDto) : Promise<CourseType> {
    try {
      const courseType = { ...course };
      const res = await this.courseTypeModel.create(courseType);
      return res;
    } catch (error) {
      console.error('Error create blog:', error);
      throw error;
    }
  }
   // update Course Type
   async updateTypeCourse(id:string ,course : UpdateCourseDto) : Promise<CourseType> {
    try {
      const courseType = { ...course };
      const res = await this.courseTypeModel.findByIdAndUpdate(id,courseType);
      return res;
    } catch (error) {
      console.error('Error create blog:', error);
      throw error;
    }
  }
  // get All Course Type
  async getAllCourseTypes(): Promise<CourseType[]> {
    try {
      const res = await this.courseTypeModel.find();
      return res
    } catch (error) {
      throw error;
    }
  }
  // get Course Type by Id
  async getCourseTypesById(id:string): Promise<CourseType> {
    try {
      const res = await this.courseTypeModel.findById(id);
      return res
    } catch (error) {
      throw error;
    }
  }
  // Delete course type
  async DeleteCourseTypesById(id:string): Promise<CourseType> {
    try {
      const res = await this.courseTypeModel.findByIdAndDelete(id);
      return res
    } catch (error) {
      throw error;
    }
  }


  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  async findAll() {
    const blogs = await this.courseModel.find();
    return blogs;
  }

  findOne(id: string) {
    return `This action returns a #${id} course`;
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: string) {
    return `This action removes a #${id} course`;
  }
}