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

  // Thuộc tính cho kỹ thuật lặp lại ngắt quãng
  @Prop({ default: 0 })
  reviewCount?: number; // Số lần từ này đã được ôn tập

  @Prop({ default: 1 })
  reviewInterval?: number; // Khoảng thời gian lặp lại ôn tập (tính bằng ngày)

  @Prop({ type: Date, default: Date.now })
  lastReviewed?: Date; // Ngày lần cuối từ này được ôn tập

  @Prop({ type: Date, default: Date.now })
  nextReviewDate?: Date; // Ngày cần ôn lại từ tiếp theo
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
