import { Injectable, NotFoundException } from '@nestjs/common';
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
    //Statics
    async staticUsers(): Promise<number> {
        return await this.userModel.countDocuments().exec();
    }

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
                typeLogin: TypeLogin.BASIC,
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

            const refreshToken = jwt.sign(
                { userWithAvatar },
                process.env.JWT_SECRET,
            );
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
            const checkuser = await this.userModel.findById(id);

            if (!checkuser) {
                throw new NotFoundException('User not found.');
            }
            let newDataUser: object = {
                ...user,
            };
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                newDataUser = {
                    ...user,
                    password: hashedPassword,
                };
            }
            if (file) {
                const fileStream = Readable.from(file.buffer);
                const fileId = await this.googleDriveUploader.uploadImage(
                    fileStream,
                    file.originalname,
                    '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
                );
                const avatarUrl =
                    this.googleDriveUploader.getThumbnailUrl(fileId);
                newDataUser = {
                    ...user,
                    avatar: avatarUrl,
                };
            }
            const res = await this.userModel.findByIdAndUpdate(id, newDataUser);
            const refreshToken = jwt.sign(
                { newDataUser },
                process.env.JWT_SECRET,
            );
            res.refreshToken = refreshToken;
            return await res.save();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    // Find all users panigations function
    async findAllPanigation(
        page: number,
        limit: number,
        email?: string,
        userType?: string,
    ): Promise<{ users: User[]; total: number }> {
        const skip = (page - 1) * limit;
        
        const filter: Record<string, any> = {};
        if (email) {
            filter.email = { $regex: email, $options: 'i' }; // Sreach email không phân biệt hoa thường
        }
        if (userType) {
            filter.role = userType; 
        }
        const total = await this.userModel.countDocuments(filter).exec();

        const users = await this.userModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .exec();
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

    // delete user By Id

    async deleteUserById(id: string): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndUpdate(id, {
            active: false,
        });
    }
    async restoreUserById(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndUpdate(
            id,
            { active: true },
            { new: true },
        );
        return deletedUser;
    }
}
