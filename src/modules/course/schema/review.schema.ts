import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReviewType } from '../review.enum';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  reviewerName: string;

  @Prop({ required: true })
  reviewDescription: string;

  @Prop({ required: true })
  occupation: ReviewType;

  @Prop({})
  stars: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.methods.toJSON = function () {
  const reviewObject = this.toObject();

  reviewObject.id = reviewObject._id;

  delete reviewObject.__v;
  delete reviewObject._id;

  return reviewObject;
};
