import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './BlogSchema/blog.schema';
import { BlogService } from './blog.service';
import { BlogController } from './Blog.Controller';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
  controllers: [BlogController],
  providers: [BlogService , GoogleDriveUploader],
})
export class BlogModule {}
