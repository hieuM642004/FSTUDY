import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Course, CourseType } from './courseSchema/course.schema';
import { CreateCourseTypeDto } from './dto/create-course-type.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  /**
   * Course Type
   *  */

  // Get all course type
  @Get('type')
  async getAllCourseType(): Promise<ResponseData<CourseType[]>> {
    try {
      const courses = await this.courseService.getAllCourseTypes();
      return new ResponseData<CourseType[]>(
        courses,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CourseType[]>(
        [],
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  // Create course type

  @Post('type/create-course-type')
  async createCourseType(
    @Body() CourseType: CreateCourseTypeDto,
  ): Promise<ResponseData<CourseType>> {
    try {
      const NewCourseType = new CreateCourseTypeDto();
      Object.assign(NewCourseType, CourseType);
      NewCourseType.generateSlug();
      const saveCourse =
        await this.courseService.createTypeCourse(NewCourseType);
      return new ResponseData<CourseType>(
        saveCourse,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CourseType>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
  // get course type by ID

  @Get('type/:id')
  async getCourseTypeById(
    @Param('id') id: string,
  ): Promise<ResponseData<CourseType>> {
    try {
      const course = await this.courseService.getCourseTypesById(id);
      return new ResponseData<CourseType>(
        course,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CourseType>(
        [],
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  //update Course Type
  @Put('type/update-course-type/:id')
  async updateCourseType(
    @Param('id') id: string,
    @Body() CourseType: CreateCourseTypeDto,
  ): Promise<ResponseData<CourseType>> {
    try {
      const NewCourseType = new CreateCourseTypeDto();
      Object.assign(NewCourseType, CourseType);
      NewCourseType.generateSlug();
      const saveCourse = await this.courseService.updateTypeCourse(
        id,
        NewCourseType,
      );
      return new ResponseData<CourseType>(
        saveCourse,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CourseType>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  //Delete a Course Type
  @Delete('type/:id')
  async deleteCourseType(@Param('id') id : string): Promise<ResponseData<CourseType>> {
    try {
      const courses = await this.courseService.deleteCourseTypesById(id);
      return new ResponseData<CourseType>(
        courses,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<CourseType>(
        [],
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  /**
   *   Course
   */



  // @Get('/:id')
  // async getCourseById(@Param('id') id: string): Promise<ResponseData<Course>> {
  //   try {
  //     const course = await this.courseService.findOne(id);
  //     if (!course) {
  //       return new ResponseData<Course>(
  //         [],
  //         HttpStatus.ERROR,
  //         HttpMessage.ERROR,
  //       );
  //     } else {
  //       return new ResponseData<Course>(
  //         course,
  //         HttpStatus.SUCCESS,
  //         HttpMessage.SUCCESS,
  //       );
  //     }
  //   } catch (error) {
  //     return new ResponseData<Course>([], HttpStatus.ERROR, HttpMessage.ERROR);
  //   }
  // }

}