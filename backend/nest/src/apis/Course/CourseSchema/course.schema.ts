import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import slugify from 'slugify';
import { COURSE_DETAIL_TYPES } from 'src/utils/constants';
// import mongooseDelete from 'mongoose-delete';
@Schema({ timestamps: true })
export class Course {
  // General
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true, default: false })
  featured: boolean;

  @Prop({ required: true, default: 0 })
  displayOrder: number;

  @Prop({
    type: [
      {
        title: { type: String, required: true },
        lessons: [
          {
            title: { type: String, required: true, default: '' },
            videoUrl: { type: String, required: true, default: '' }
          }
        ],
        displayOrder: { type: Number, required: true, default: 0 },
        free: { type: Boolean, required: true, default: false }
      }
    ]
  })
  learnings: {
    title: string;
    lessons: {
      title: string;
      videoUrl: string;
    }[];
    displayOrder: number;
    free: boolean;
  }[];

  // Details
  @Prop({ required: true })
  detailTitle: string;

  @Prop({
    required: true,
    enum: COURSE_DETAIL_TYPES,
    default: COURSE_DETAIL_TYPES.OBJECTIVE,
  })
  detailType: string;

  @Prop({ required: true, default: '' })
  detailShortDescription: string;

  @Prop({ required: true, default: '' })
  detailContent: string;

  // Type
  @Prop({ type: SchemaTypes.ObjectId, ref: 'CourseType' })
  type: Types.ObjectId;
}

// CourseType schema
@Schema({ timestamps: true })
export class CourseType {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  slug: string;

  async generateSlug() {
    this.slug = await slugify(this.name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
}

export type CourseDocument = HydratedDocument<Course>;

export const CourseSchema = SchemaFactory.createForClass(Course);
// CourseSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export const CourseTypeSchema = SchemaFactory.createForClass(CourseType);
