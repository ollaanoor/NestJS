import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop()
  fullName: string;

  @Prop({ min: 16, max: 60 })
  age: number;

  @Prop({ minlength: 11, maxlength: 11, match: /^01\d{9}$/ })
  mobileNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
