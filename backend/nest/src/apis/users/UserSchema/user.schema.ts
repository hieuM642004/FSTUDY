import mongoose from 'mongoose';
import IUser from '../user.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum TypeLogin {
  GOOGLE = 'google',
  BASIC = 'basic',
}

@Schema({ timestamps: true })
export class User {

  _id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullname: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop()
  slug: string;

  @Prop()
  refreshToken: string;

  @Prop()
  passwordResetToken: string;

  @Prop()
  passwordResetExpires: string;

  @Prop({ enum: TypeLogin, default: TypeLogin.BASIC })
  typeLogin: string;

  @Prop()
  birthday: Date;

  @Prop({ default: true }) 
  active: boolean;

  async generateSlug() {
    this.slug = slugify(this.fullname, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
