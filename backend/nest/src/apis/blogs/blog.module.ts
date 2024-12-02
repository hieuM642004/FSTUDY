import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema, ChildTopicSchema, TopicSchema } from './blogSchema/blog.schema';
import { BlogService } from './blog.service';
import { BlogController } from './Blog.Controller';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { UserSchema } from '../users/userSchema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Blog', schema: BlogSchema },
    { name: 'Topic', schema: TopicSchema },
    { name: 'ChildTopic', schema: ChildTopicSchema },
    {name : 'User', schema: UserSchema}

  ])],
  controllers: [BlogController],
  providers: [BlogService , GoogleDriveUploader],
})
export class BlogModule {}
