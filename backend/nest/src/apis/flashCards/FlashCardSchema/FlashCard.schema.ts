import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/apis/users/UserSchema/user.schema';

export type FlashCardDocument = FlashCard & Document;

class Word {
  @Prop()
  word: string;

  @Prop()
  definition: string;

  @Prop()
  audioUrl: string;
  @Prop()
  image: string;
}

@Schema({ timestamps: true })
export class FlashCard {
  @Prop()
  nameCard: string;

  @Prop({ type: [Word], _id: false })
  words: Word[];

  @Prop({ default: 0 })
  wordCount: number;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
}

export const FlashCardSchema = SchemaFactory.createForClass(FlashCard);
