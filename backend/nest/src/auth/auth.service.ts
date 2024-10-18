import {
    Injectable,
    UnauthorizedException,
    UploadedFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Readable } from 'stream';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { RegisterDto } from './dto/register.tdo';
import { LoginDto } from './dto/login.dto';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { transporter } from '../providers/mail/mailler';
import { TypeLogin, User, UserRole } from 'src/apis/users/userSchema/user.schema';
import slugify from 'slugify';
import * as jwt from 'jsonwebtoken';
import * as mjml from 'mjml';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class AuthService {
    private readonly transporter;
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly googleDriveUploader: GoogleDriveUploader,
    ) {}

    async register(user: User, file: Express.Multer.File): Promise<User> {
        try {
            // Check if the email already exists
            const existingUser = await this.userModel.findOne({ email: user.email });
            if (existingUser) {
                throw new Error('Email already exists');
            }
    
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const userWithHashedPassword = {
                ...user,
                password: hashedPassword,
            };
            const userWithAvatar = {
                ...userWithHashedPassword,
                typeLogin: TypeLogin.BASIC,
                role: UserRole.USER
            };
    
            const createdUser = new this.userModel(userWithAvatar);
            const savedUser = await createdUser.save();
    
            const refreshToken = jwt.sign({ user: savedUser }, process.env.JWT_SECRET); // Adjust payload if needed
            savedUser.refreshToken = refreshToken;
    
            await savedUser.save();
    
            return savedUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    //Login Google
    async loginGoogle(user: any): Promise<{ accessToken: string; refreshToken: string }> {
        if (!user) {
            return {
                accessToken: '',
                refreshToken: '',
            };
        }
    
        const email = user.emails[0].value;
        const displayName = user.displayName;
        const userId = user.id; 
        const avatar = user.photos[0].value;
        const slug = await this.generateSlug(displayName);
    
        let existingUser = await this.userModel.findOne({ email });
    
        if (existingUser) {
            const accessToken = this.jwtService.sign({
                id: existingUser._id, 
                name: displayName,
                email,
                avatar,
                typeLogin: TypeLogin.GOOGLE,
                slug,
                role: UserRole.USER,
                sub: 'access',
            });
    
            const refreshToken = this.jwtService.sign(
                {
                    id: existingUser._id, 
                    name: displayName,
                    email,
                    avatar,
                    typeLogin: TypeLogin.GOOGLE,
                    slug,
                    role: UserRole.USER,
                    sub: 'refresh',
                },
                { expiresIn: '7d' },
            );
    
            existingUser.refreshToken = refreshToken;
            await existingUser.save();
    
            return { accessToken, refreshToken };
        } else {
            // Create a new user in the database
            const newUser = await this.userModel.create({
                id: userId, 
                username: user.fullname,
                fullname: displayName,
                email,
                avatar,
                typeLogin: TypeLogin.GOOGLE,
                slug,
                role: UserRole.USER,
            });
    
            const accessToken = this.jwtService.sign({
                id: newUser._id, 
                username: user.fullname,
                fullname: displayName,
                email,
                avatar,
                typeLogin: TypeLogin.GOOGLE,
                slug,
                role: UserRole.USER,
                sub: 'access',
            });
    
            const refreshToken = this.jwtService.sign(
                {
                    id: newUser._id, 
                    name: displayName,
                    email,
                    avatar,
                    typeLogin: TypeLogin.GOOGLE,
                    slug,
                    role: UserRole.USER,
                    sub: 'refresh',
                },
                { expiresIn: '7d' },
            );
    
            newUser.refreshToken = refreshToken;
            await newUser.save();
    
            return { accessToken, refreshToken };
        }
    }
    async loginFacebook(
        user: any,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        console.log(user);

        if (!user) {
            return {
                accessToken: '',
                refreshToken: '',
            };
        }

        const existingUser = await this.userModel.findOne({
            _id: user.id,
        });

        if (existingUser) {
            // User exists in the database
            const accessToken = this.jwtService.sign({
                user: user.id,
                name: user.displayName,
                email: user.emails[0].value,
                avatar: user.photos[0].value,
                role: UserRole.USER,
                sub: 'access', // Sử dụng 'access' làm subject của accessToken
            });

            user.refreshToken = this.jwtService.sign(
                {
                    user: user.id,
                    name: user.displayName,
                    email: user.emails[0].value,
                    avatar: user.photos[0].value,
                    role: UserRole.USER,
                    sub: 'refresh', // Sử dụng 'refresh' làm subject của accessToken
                },
                { expiresIn: '7d' },
            );

            return { accessToken, refreshToken: user.refreshToken };
        } else {
            // User doesn't exist, create a new user
            const slug = await this.generateSlug(user.displayName);
            const newUser = await this.userModel.create({
                _id: user.id,
                username: user.fullname,
                fullname: user.displayName,
                email: user.emails[0].value,
                avatar: user.photos[0].value,
                slug: slug,
                role: UserRole.USER,
            });
            await newUser.save();

            const accessToken = this.jwtService.sign({
                user: newUser.id,
                username: user.fullname,
                fullname: user.displayName,
                email: user.emails[0].value,
                avatar: user.photos[0].value,
                role: UserRole.USER,
                sub: 'access', // Sử dụng 'access' làm subject của accessToken
            });

            user.refreshToken = this.jwtService.sign(
                {
                    user: user.id,
                    name: user.displayName,
                    email: user.emails[0].value,
                    avatar: user.photos[0].value,
                    role: UserRole.USER,
                    sub: 'refresh', // Sử dụng 'refresh' làm subject của accessToken
                },
                { expiresIn: '7d' },
            );

            return { accessToken, refreshToken: user.refreshToken };
        }
    }

    async generateSlug(fullname) {
        const slug = slugify(fullname, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
        });
        return slug;
    }
    generateRefreshToken(accessToken: string): string {
        const decoded = this.jwtService.verify(accessToken);
        const refreshToken = this.jwtService.sign({ decoded });
        return refreshToken;
    }
    // Login Facebook

    async login(
        loginDto: LoginDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = {
            id: user._id,
            username: user.fullname,
            avatar: user.avatar,
            email: user.email,
            role: user.role,
            slug: user.slug,
        };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_EXPIRES,
        });

        user.refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        await user.save();
        const res = await this.userModel.findByIdAndUpdate(user._id, payload);
        res.refreshToken = user.refreshToken;
        await res.save();
        return { accessToken, refreshToken: user.refreshToken };
    }
    async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const decodedToken = this.jwtService.decode(refreshToken) as { id: string };

        if (!decodedToken || !decodedToken.id) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const user = await this.userModel.findById(decodedToken.id);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const payload = { id: user._id, username: user.email, role: user.role };
        const newAccessToken = this.jwtService.sign(payload);
        const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    
    async logout(refreshToken: string): Promise<void> {
        const decodedToken = this.jwtService.decode(refreshToken) as {
            id: string;
        };

        if (!decodedToken || !decodedToken.id) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const user = await this.userModel.findById(decodedToken.id);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        user.refreshToken = null;
        await user.save();
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.userModel.findOne({ email });
        if (user.typeLogin === TypeLogin.GOOGLE) {
            throw new Error('Password reset is not allowed for Google login users');
        }
        if (!user) {
            throw new Error('User not found');
        }
    
        const token = this.jwtService.sign(
            { id: user._id },
            { expiresIn: '1h' },
        );
    
        user.passwordResetToken = token;
        const expiresDate = new Date(Date.now() + 3600000);
        user.passwordResetExpires = expiresDate.toISOString();
        await user.save();
    
        // Load MJML template from file
        const mjmlTemplate = fs.readFileSync('src/providers/mail/templates/resetpassword.mjml', 'utf8');
    
        // Compile template with Handlebars
        const template = handlebars.compile(mjmlTemplate);
    
        // Data to be passed to the template
        const templateData = {
            name: user.fullname || 'người dùng',
            nextReviewDate: expiresDate.toISOString(),
            reviewLink: `http://localhost:3000/reset-password?token=${token}`,
        };
    
        // Render MJML template to HTML
        const htmlContent = mjml(template(templateData)).html;
    
        // Prepare email options
        const mailOptions = {
            from: '<hieu@78544@gmail.com>',
            to: user.email,
            subject: 'Password Reset Request',
            html: htmlContent,
        };
    
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Failed to send password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }
    async resetPassword(token: string, newPassword: string): Promise<void> {
        const decodedToken = this.jwtService.decode(token) as { id: string };
        if (!decodedToken || !decodedToken.id) {
            throw new UnauthorizedException('Invalid token');
        }

        const user = await this.userModel.findById(decodedToken.id);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (new Date() > new Date(user.passwordResetExpires)) {
            throw new Error('Password reset token has expired');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();
    }
}
