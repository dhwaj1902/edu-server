import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaTypes } from 'mongoose';
import { Schedule } from './schedule.schema';
import { TagType } from '../course-tag.enum';
import { Review } from './review.schema';
import { courseLevelType } from '../courseLevel.enum';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: Date.now })
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop({ required: true })
  duration: string;

  @Prop({ default: false })
  active: boolean;

  @Prop()
  coupons: number;

  @Prop({ default: 0 })
  student_num: number;

  @Prop({ required: true })
  mentor: string[];

  @Prop({ required: true })
  video_num: number;

  @Prop()
  assignments: string[]; //links to questions pdf

  @Prop({ default: 0 })
  no_of_enrollments: number;

  @Prop()
  sharable_link: string;

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Schedule' }] })
  schedule: Schedule[];

  @Prop({ required: true })
  tags: TagType[];

  @Prop({ required: true })
  courseDetails: string;

  @Prop({ default: 'Training', required: true })
  courseLevel: courseLevelType;

  @Prop({ required: true })
  courseThumbnail: string;

  @Prop({ required: true })
  courseTrailerUrl: string;

  @Prop({ type: [{ type: SchemaTypes.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.methods.toJSON = function () {
  const courseObject = this.toObject();
  courseObject.id = courseObject._id;
  delete courseObject.__v;
  delete courseObject['student_num'];
  delete courseObject['updatedAt'];
  delete courseObject['createdAt'];
  delete courseObject['no_of_enrollments'];
  delete courseObject._id;
  return courseObject;
};
