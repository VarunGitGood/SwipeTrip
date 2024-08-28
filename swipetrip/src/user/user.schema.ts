import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  picture: string;

  @Prop({ type: Object })
  preferences: {
    budget: string;
    location: string;
    travelStyle: string;
    accommodation: string;
    activities: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
