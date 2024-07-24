import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './JWT/jwt.strategy';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { UserSchema } from 'src/apis/users/userSchema/user.schema';
import { googleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES,
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,GoogleDriveUploader, googleStrategy, FacebookStrategy],

  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}