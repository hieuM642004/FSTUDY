import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
    HttpException
} from '@nestjs/common';
import RegisterDto from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.respository';
import { ResponseData } from 'src/global/globalClass';
import { User } from './userSchema/user.schema';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AdminGuard } from 'src/auth/guards/authorization.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    //Static
    @Get('/static-users')
    async staticUsers(): Promise<number> {
        return await this.userService.staticUsers();
    }

    // Router get all user panigation
    @UsePipes(new ValidationPipe())
    @Get()
    // @UseGuards(AdminGuard)
    async getAllUsers(
        @Query('page') page: number = 1,
        @Query('limit')
        limit: number = process.env.PAGE_LIMIT
            ? parseInt(process.env.PAGE_LIMIT)
            : 10,
        @Query('email') email?: string,
        @Query('userType') userType?: string, 
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
                email, 
                userType,
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

    @Post('/create-user')
    @UseInterceptors(FileInterceptor('avatar'))
    // @UseGuards(AdminGuard)
    async registerAdmin(
        @Body() user: User,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ResponseData<User>> {
        try {
            const newUser = new User();
            Object.assign(newUser, user);
            newUser.generateSlug();
    
            // Call the service method that handles the creation and duplicate check
            const saveUser = await this.userService.createUser(newUser, file);
            
            return new ResponseData<User>(
                saveUser,
                HttpStatus.CREATED,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            // Determine status and message
            const status = error instanceof HttpException ? error.getStatus() : HttpStatus.ERROR;
            const message = error instanceof HttpException ? error.message : 'An unexpected error occurred';
    
            // Instead of returning a response directly, throw an HttpException with the desired status
            throw new HttpException(
                new ResponseData<User>(null, status, message),
                status,
            );
        }
    }

    // Router update user by id

    @Put('/update-user/:id')
    @UseInterceptors(FileInterceptor('avatar'))
    // @UseGuards(AuthGuard('jwt'))
    async updateAdmin(
        @Param('id') id: string,
        @Body() user: User,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ResponseData<User>> {
        try {
            const newUser = new User();
            Object.assign(newUser, user);
            newUser.generateSlug();
            const saveUser = await this.userService.updateUser(
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

    // @UsePipes(new ValidationPipe())
    @Get(':id')
    // @UseGuards(AdminGuard)
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
    async searchUserByEmail(
        @Body('key') email: string,
    ): Promise<ResponseData<User>> {
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

    @Delete(':id')
    async deleteUserById(@Param('id') id: string): Promise<ResponseData<User>> {
        try {
            const deletedUser = await this.userService.deleteUserById(id);
            if (!deletedUser) {
                return new ResponseData<User>(
                    null,
                    HttpStatus.NOT_FOUND,
                    'User not found',
                );
            }
            return new ResponseData<User>(
                deletedUser,
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

    @Put('/restore-user/:id')
    async restoreUserById(
        @Param('id') id: string,
    ): Promise<ResponseData<User>> {
        try {
            const deletedUser = await this.userService.restoreUserById(id);
            if (!deletedUser) {
                return new ResponseData<User>(
                    null,
                    HttpStatus.NOT_FOUND,
                    'User not found',
                );
            }
            return new ResponseData<User>(
                deletedUser,
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
}
