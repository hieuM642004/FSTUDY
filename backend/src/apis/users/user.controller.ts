import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import RegisterDto from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.respository';
import { ResponseData } from 'src/global/globalClass';
import { User } from './UserSchema/user.schema';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AdminGuard } from 'src/auth/guards/authorization.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Router get all user panigation
    @UsePipes(new ValidationPipe())
    @Get()
    @UseGuards(AdminGuard)
    async getAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = process.env.PAGE_LIMIT ? parseInt(process.env.PAGE_LIMIT) : 10,
    ): Promise<
        ResponseData<{
            users: User[];
            total: number;
            page: number;
            limit: number;
        }>
    > {
        try {
            const { users, total } = await this.userService.findAllPanigation(
                page,
                limit,
            );
            return new ResponseData<{
                users: User[];
                total: number;
                page: number;
                limit: number;
            }>(
                { users, total, page, limit },
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<{
                users: User[];
                total: number;
                page: number;
                limit: number;
            }>(
                { users: [], total: 0, page, limit },
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    // Router Create new user

    @Post('/createUser')
    @UseInterceptors(FileInterceptor('avatar'))
    @UseGuards(AdminGuard)
    async registerAdmin(
        @Body() user: User,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ResponseData<User>> {
        try {
            const newUser = new User();
            Object.assign(newUser, user);
            newUser.generateSlug();
            const saveUser = await this.userService.CreateUser(newUser, file);
            return new ResponseData<User>(
                saveUser,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<User>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

      // Router update user by id

    @Post('/updateUser/:id')
    @UseInterceptors(FileInterceptor('avatar'))
    @UseGuards(AdminGuard)
    async updateAdmin(
        @Param('id') id: string,
        @Body() user: User,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ResponseData<User>> {
        try {
            const newUser = new User();
            Object.assign(newUser, user);
            newUser.generateSlug();
            const saveUser = await this.userService.UpdateUser(
                id,
                newUser,
                file,
            );
            return new ResponseData<User>(
                saveUser,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<User>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

      // Router get user by id

    @UsePipes(new ValidationPipe())
    @Get(':id')
    @UseGuards(AdminGuard)
    async getUserById(@Param('id') id: string): Promise<ResponseData<User>> {
        try {
            const users = await this.userService.findUserById(id);
            return new ResponseData<User>(
                users,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<User>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
      // Router search by name or email

    @UsePipes(new ValidationPipe())
    @Post('search')
    @UseGuards(AdminGuard)
    async searchUserByEmail(@Body('key') email:string): Promise<ResponseData<User>> {
        try {
            const users = await this.userService.searchUserByEmail(email);
            return new ResponseData<User>(
                users,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<User>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
}
