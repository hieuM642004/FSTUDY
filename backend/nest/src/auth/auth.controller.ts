import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Response,
  Res,
  UnauthorizedException,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.tdo';

import { HttpStatus, HttpMessage } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/apis/users/userSchema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
UnauthorizedException;
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  // Login with Google (google Auth20) 
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async callback(@Req() req , @Res() res){
    const jwt = await this.authService.loginGoogle(req.user)
    res.set('authorization', jwt.accessToken)

    res.cookie('token', jwt.accessToken);
    res.cookie('refreshToken', jwt.refreshToken);
    res.cookie('typeLogin', 'google');
    res.redirect(`${process.env.BASEURL_FE}/home`);
  }
  @Get('LoginGoogle')
  @UseGuards(AuthGuard('jwt'))
  async testLogin(@Req() req, @Res() res) {
    try {
      const accessToken = await req.headers.authorization.split(' ')[1];
      const refreshToken = await this.authService.generateRefreshToken(accessToken);
      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  //Login with facebook
  
  @Get("facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.SUCCESS;
  }

  @Get("facebook/callback")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req , @Res() res): Promise<any> {
    const jwt = await this.authService.loginFacebook(req.user)
    res.set('authorization', jwt.accessToken)
    res.json({
      accessToken : jwt.accessToken,
      refreshToken : jwt.refreshToken
    });
    return {
      accessToken : jwt.accessToken,
      refreshToken : jwt.refreshToken,
      statusCode: HttpStatus.SUCCESS,
    };
  }




  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseData<User>> {
    try {
      const newUser = new User();
      Object.assign(newUser, user);
      newUser.generateSlug();
      const saveUser = await this.authService.register(newUser, file);
      return new ResponseData<User>(
        saveUser,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.error('Registration error:', error.message);
      return new ResponseData<User>(
        null,
        HttpStatus.ERROR, 
        error.message || HttpMessage.ERROR, 
      );
    }
  }
  

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Body('device') device: 'web' | 'mobile' 
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const { accessToken, refreshToken } =
        await this.authService.login(loginDto, device);
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
  
  @Post('/refresh-token')
  async refreshToken(
    @Body('refresh_token') refresh_token: string,
    @Body('device') device: 'web' | 'mobile' = 'web' // Default to 'web' if not provided
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token is required');
    }
  
    try {
      const { accessToken, refreshToken } = await this.authService.refreshToken(refresh_token, device);
      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  
  @Post('/logout')
  async logout(
    @Body() body: any,
    // @Res() res, 
  ): Promise<{ message: string }> {
    console.log(body);
    const { refresh_token } = body;

    try {
      await this.authService.logout(refresh_token);
      // res.clearCookie('accessToken');
      // res.clearCookie('refreshToken');
      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
  @Post('/forgot-password')
  async forgotPassword(@Body() body: any, @Res() res): Promise<{ message: string }> {
    const { email } = body;
    try {
      await this.authService.forgotPassword(email);
    return  res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      return  res.status(400).json({ error: error.message });
    }
  }
  @Post('/reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ message: string }> {
    try {
      await this.authService.resetPassword(token, newPassword);
      return { message: 'Password reset successful' };
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
}
