import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({ unique: true, required: true })
  @Field(() => String)
  email: string;

  @Prop({ required: true })
  @Field(() => String)
  password: string;
}

export type UserDocument = User & Document;
// Create Mongoose scheme
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
