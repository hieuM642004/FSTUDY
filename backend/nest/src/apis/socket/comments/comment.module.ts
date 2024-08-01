import { Module } from '@nestjs/common';

import { CommentGateway } from './comment-gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { UserModule } from 'src/apis/users/user.module';
import { UserSchema } from 'src/apis/users/userSchema/user.schema';


@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
      { name: 'User', schema: UserSchema },
    ]),
    
  ],
  controllers: [],
  providers: [CommentGateway],
})
export class CommentModule1 {}
