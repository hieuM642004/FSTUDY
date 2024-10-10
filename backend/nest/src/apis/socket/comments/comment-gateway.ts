import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { Injectable } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/apis/users/userSchema/user.schema';

@WebSocketGateway(3002, { cors: true })
@Injectable()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>, 
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, { idBlog, idCourse }: { idBlog?: string, idCourse?: string }) {
  const room = idBlog || idCourse;
  if (room) {
    client.join(room);
  }
}
  @SubscribeMessage('requestComments')

  async handleRequestComments(client: Socket, { idBlog, idCourse }: { idBlog?: string, idCourse?: string }) {
    try {      
      const query: any = {};
      if (idBlog) query.idBlog = idBlog;
      if (idCourse) query.idCourse = idCourse;
      const comments = await this.commentModel.find(query).populate('idUser').exec();
      const room = idBlog || idCourse;
      if (room) {
        this.server.to(room).emit('comments', comments);
      }
       
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  @SubscribeMessage('newComment')
  async handleNewComment(client: Socket, commentDto: CreateCommentDto) {
    try {
      const newComment:any = new this.commentModel({
        idUser: commentDto.idUser,
        idBlog: commentDto.idBlog || null,
        idCourse: commentDto.idCourse || null,
        parentId: commentDto.parentId || null,
        content: commentDto.content,
      });

      const savedComment = await newComment.save();

      if (commentDto.parentId) {
        const parentComment = await this.commentModel.findById(commentDto.parentId);
        if (parentComment) {
          parentComment.replies.push(savedComment._id);
          await parentComment.save();
        }
      }
      const query: any = {};
      if (commentDto.idBlog) query.idBlog = commentDto.idBlog;
      if (commentDto.idCourse) query.idCourse = commentDto.idCourse;

      const comments = await this.commentModel.find(query).populate('idUser').exec();
      const room = commentDto.idBlog || commentDto.idCourse;
      if (room) {
        this.server.to(room).emit('comments', comments);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  @SubscribeMessage('updateComment')
  async handleUpdateComment(@MessageBody() { _id, content ,  idBlog , idCourse}: UpdateCommentDto) {
    try {      
      const updatedComment = await this.commentModel.findByIdAndUpdate(
        _id,
        { content },
        { new: true, runValidators: true }
      ).populate('idUser');
      const query: any = {};
      if (updatedComment.idBlog) {
          query.idBlog = updatedComment.idBlog;
      }
      if (updatedComment.idCourse) {
        query.idCourse = updatedComment.idCourse;
      }
      const comments = await this.commentModel.find(query).populate('idUser').exec();
      const room = idBlog || idCourse;
      if (room) {
        this.server.to(room).emit('comments', comments);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(client: Socket, commentId: string ) {
    try {
      const idBlog = commentId[1]
      const idCourse = commentId[2]
      const deletedComment = await this.commentModel.findByIdAndDelete(commentId[0]);
      const query: any = {};
      if (deletedComment.idBlog) {
          query.idBlog = deletedComment.idBlog;
      }
      if (deletedComment.idCourse) {
        query.idCourse = deletedComment.idCourse;
    }
      const comments = await this.commentModel.find(query).populate('idUser').exec();
      const room = idBlog || idCourse;
      
      if (room) {
        this.server.to(room).emit('comments', comments);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}
