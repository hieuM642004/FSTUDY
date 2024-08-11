import { Injectable } from '@nestjs/common';
import RegisterDto from './dto/user.dto';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TypeLogin, User, UserRole } from './userSchema/user.schema';
import { Readable } from 'stream';
import * as bcrypt from 'bcrypt';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: mongoose.Model<User>,
        private readonly googleDriveUploader: GoogleDriveUploader,
    ) {}
    // Create New use function
    async createUser(user: User, file: Express.Multer.File): Promise<User> {
        try {
            const checkExists = await this.userModel.findOne({
                email: user.email,
            });
    
            if (checkExists) {
                throw 'Email already exists';
            }
    
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const userWithHashedPassword = {
                ...user,
                typeLogin : TypeLogin.BASIC,
                password: hashedPassword,
            };
    
            const fileStream = Readable.from(file.buffer);
            const fileId = await this.googleDriveUploader.uploadImage(
                fileStream,
                file.originalname,
                '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
            );
    
            const avatarUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
            const userWithAvatar = {
                ...userWithHashedPassword,
                avatar: avatarUrl,
            };
    
            const createdUser = new this.userModel(userWithAvatar);
            const savedUser = await createdUser.save();
    
            const refreshToken = jwt.sign({ userWithAvatar}, process.env.JWT_SECRET);
            savedUser.refreshToken = refreshToken;
    
            await savedUser.save();
    
            return savedUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Update user function
    async updateUser(
        id: string,
        user: User,
        file: Express.Multer.File,
    ): Promise<User> {
        try {
            const checkExists = await this.userModel.findOne({
                email: user.email,
                _id: { $ne: id },
            });
            if (checkExists) {
                throw 'Email already exists';
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const userWithHashedPassword = {
                ...user,
                password: hashedPassword,
            };
            const fileStream = Readable.from(file.buffer);
            const fileId = await this.googleDriveUploader.uploadImage(
                fileStream,
                file.originalname,
                '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
            );
            const avatarUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
            const userWithAvatar = {
                ...userWithHashedPassword,
                avatar: avatarUrl,
            };
            const res = await this.userModel.findByIdAndUpdate(
                id,
                userWithAvatar,
            );
            const refreshToken = jwt.sign({ userWithAvatar}, process.env.JWT_SECRET);
            res.refreshToken = refreshToken;
            await res.save();
            return res;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    // Find all users panigations function
    async findAllPanigation(
        page: number,
        limit: number,
    ): Promise<{ users: User[]; total: number }> {
        const skip = (page - 1) * limit;
        const users = await this.userModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec();
        const total = await this.userModel.countDocuments().exec();
        return { users, total };
    }

    // Find User by ID function
    async findUserById(id: string): Promise<User> {
        const users = await this.userModel.findById(id);
        return users;
    }

    // Search User by email or name function
    async searchUserByEmail(key: string): Promise<User[]> {
        const users = await this.userModel.find({
            $or: [{ email: key }, { fullname: key }],
        });
        console.log(users);

        return users;
    }

}
