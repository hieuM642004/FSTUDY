import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Content,
    Course,
    CourseType,
    Lesson,
    Quiz,
    Video,
    WordMatching,
} from './courseSchema/course.schema';
import { CreateCourseTypeDto } from './dto/CourseType/create-course-type.dto';
import { CreateQuizDto } from './dto/quiz/createQuiz.dto';
import { UpdateQuizDto } from './dto/quiz/updateQuiz.dto';
import { CreateWordMatchingDto } from './dto/wordMatching/createWordMatching.dto';
import { UpdateWordMatchingDto } from './dto/wordMatching/updateWordMatching.dto';
import { CreateVideoDto } from './dto/video/createVideo.dto';
import { updateVideoDto } from './dto/video/updateVideo.dto';
import { createContentDto } from './dto/content/createContent.dto';
import { updateContentDto } from './dto/content/updateContent.dto';
import { createLessonDto } from './dto/lesson/createLesson.dto';
import { updateLessonDto } from './dto/lesson/updateLesson.dto';
import { ContentType } from 'src/utils/constants';
import { error } from 'console';
import { CreateCourseDto } from './dto/course/create-course.dto';
import { UpdateCourseDto } from './dto/course/update-course.dto';
import { generateSlug } from 'src/utils/generateSlug';
import { Types } from 'mongoose';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    /**
     * Quizzes
     */

    @Post('quiz/create')
    create(@Body() createQuizDto: CreateQuizDto): Promise<Quiz> {
        return this.courseService.createQuizz(createQuizDto);
    }

    @Get('quiz')
    findAll(): Promise<Quiz[]> {
        return this.courseService.findAllQuizz();
    }

    @Get('quiz/:id')
    findOne(@Param('id') id: string): Promise<Quiz> {
        return this.courseService.findOneQuizz(id);
    }

    @Put('quiz/update/:id')
    update(
        @Param('id') id: string,
        @Body() updateQuizDto: UpdateQuizDto,
    ): Promise<Quiz> {
        return this.courseService.updateQuizz(id, updateQuizDto);
    }

    @Delete('quiz/:id')
    remove(@Param('id') id: string) {
        return this.courseService.removeQuizz(id);
    }

    /**
     * Fill The Blanks Controllers
     */

    @Post('fill/create')
    async createFill(@Body() createFillInTheBlankDto: any) {
        return this.courseService.createFill(createFillInTheBlankDto);
    }

    @Get('fill/')
    async findAllFill() {
        return this.courseService.findAllFill();
    }

    @Get('fill/:id')
    async findOneFill(@Param('id') id: string) {
        return this.courseService.findOneFill(id);
    }

    @Put('fill/:id')
    async updateFill(
        @Param('id') id: string,
        @Body() updateFillInTheBlankDto: any,
    ) {
        return this.courseService.updateFill(id, updateFillInTheBlankDto);
    }

    @Delete('fill/:id')
    async removeFill(@Param('id') id: string) {
        return this.courseService.removeFill(id);
    }

    /**
     * Word Matching Controllers
     */
    @Post('word-matching/create')
    createWordMatching(
        @Body() createWordMatchingDto: CreateWordMatchingDto,
    ): Promise<WordMatching> {
        return this.courseService.createWordMatching(createWordMatchingDto);
    }

    @Get('word-matching')
    findAllWordMatching(): Promise<WordMatching[]> {
        return this.courseService.findAllWordMatching();
    }

    @Get('word-matching/:id')
    findOneWordMatching(@Param('id') id: string): Promise<WordMatching> {
        return this.courseService.findOneWordMatching(id);
    }

    @Put('word-matching/:id')
    updateWordMatching(
        @Param('id') id: string,
        @Body() updateWordMatchingDto: UpdateWordMatchingDto,
    ): Promise<WordMatching> {
        return this.courseService.updateWordMatching(id, updateWordMatchingDto);
    }

    @Delete('word-matching/:id')
    removeWordMatching(@Param('id') id: string){
        return this.courseService.removeWordMatching(id);
    }

    /**
     * Video Controllers
     *
     */
    @Post('video/create')
    @UseInterceptors(FileInterceptor('videoUrl'))
    createVideo(
        @Body() createVideoDto: CreateVideoDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Video> {
        return this.courseService.createVideo(createVideoDto, file);
    }

    @Get('video/')
    findAllVideo(): Promise<Video[]> {
        return this.courseService.findAllVideo();
    }

    @Get('video/:id')
    findOneVideo(@Param('id') id: string): Promise<Video> {
        return this.courseService.findOneVideo(id);
    }

    @Put('video/:id')
    @UseInterceptors(FileInterceptor('videoUrl'))
    updateVideo(
        @Param('id') id: string,
        @Body() updateVideoDto: updateVideoDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<Video> {
        return this.courseService.updateVideo(id, updateVideoDto, file);
    }

    @Delete('video/:id')
    removeVideo(@Param('id') id: string) {
        return this.courseService.removeVideo(id);
    }

    /**
     * Content Controllers
     */

    @Post('content/create')
    createContent(@Body() createContentDto: createContentDto): Promise<Content> {
      return this.courseService.createContent(createContentDto);
    }
  
    @Get('content')
    findAllContent(): Promise<Content[]> {
      return this.courseService.findAllContent();
    }
  
    @Get('content/:id')
    findOneContent(@Param('id') id: string): Promise<Content> {
      return this.courseService.findOneContent(id);
    }
  
    @Put('content/:id')
    updateContent(@Param('id') id: string, @Body() updateContentDto: updateContentDto): Promise<Content> {
      return this.courseService.updateContent(id, updateContentDto);
    }
  
    @Delete('content/:id')
    removeContent(@Param('id') id: string) {
      return this.courseService.removeContent(id);
    }
    
    /**
     * Lesson Controller
     */

    @Post('lesson/create')
    createLesson(@Body() createLessonDto: createLessonDto): Promise<Lesson> {
      return this.courseService.createLesson(createLessonDto);
    }
  
    @Get('lesson')
    findAllLesson(): Promise<Lesson[]> {
      return this.courseService.findAllLesson();
    }
  
    @Get('lesson/:id')
    findOneLesson(@Param('id') id: string): Promise<Lesson> {
      return this.courseService.findOneLesson(id);
    }
  
    @Put('lesson/:id')
    updateLesson(@Param('id') id: string, @Body() updateLessonDto: updateLessonDto): Promise<Lesson> {
      return this.courseService.updateLesson(id, updateLessonDto);
    }
  
    @Delete('lesson/:id')
    removeLesson(@Param('id') id: string) {
      return this.courseService.removeLesson(id);
    }
    @Patch('lesson/add/:id')
    async addContent(@Param('id') lessonId: string, @Body('content') contentId: string) {
      return this.courseService.addContentToLesson(lessonId, contentId);
    }

    @Patch('content/add/:id')
    async addData(
      @Param('id') contentId: string,
      @Body() body: { contentType: ContentType; dataId: string }
    ): Promise<Content> {
      const { contentType, dataId } = body;
  
      if (!Object.values(ContentType).includes(contentType)) {
        throw new error('Invalid content type');
      }
  
      return this.courseService.addDataToContent(contentId, contentType, dataId);
    }
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
    async deleteCourseType(
        @Param('id') id: string,
    ){
      return this.courseService.deleteCourseTypesById(id);
    }

    /**
     *   Course
     */

    @Post('create')
    @UseInterceptors(FileInterceptor('thumbnail'))
  createCourse(
    @Body() createCourseDto: CreateCourseDto ,
    @UploadedFile() file: Express.Multer.File,
): Promise<Course> {
    return this.courseService.createCourse(createCourseDto,file);
  }

  @Get()
  findAllCourse(): Promise<Course[]> {
    return this.courseService.findAllCourse();
  }

  @Get(':id')
  findOneCourse(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOneCourse(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  updateCourse(
    @Param('id') id: string, 
    @Body() updateCourseDto: UpdateCourseDto ,
    @UploadedFile() file: Express.Multer.File,
): Promise<Course> {
    return this.courseService.updateCourse(id,updateCourseDto,file);
  }

  @Delete(':id')
  removeCourse(@Param('id') id: string) {
    return this.courseService.removeCourse(id);
  }

  @Patch('course/add/:id')
  async addLesson(@Param('id') lessonId: string, @Body('lesson') contentId: string) {
    return this.courseService.addLessontoCourse(lessonId, contentId);
  }

  @Post('purchase/:courseId')
  async createPurchase(
      @Param('courseId') courseId: string,
      @Body('userId') userId: string
  ) {
      const purchase = await this.courseService.createPurchase(
          new Types.ObjectId(userId),
          new Types.ObjectId(courseId)
      );
      return purchase;
  }

  @Post('complete/:purchaseKey')
  async completePayment(
      @Param('purchaseKey') purchaseKey: string
  ) {
      const purchase = await this.courseService.completePayment(purchaseKey);
      return purchase;
  }
}
