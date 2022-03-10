import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Address, AddressSchema } from './address.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
    firstName!: string;

  @Prop({ required: true })
    lastName!: string;

  @Prop({ required: true })
    email!: string;

  @Prop({ required: true })
    phoneNumber!: string;

  @Prop({ required: true })
    password!: string;

  @Prop({ required: true })
    isAdmin!: boolean;

  @Prop({ type: AddressSchema, required: true })
    address!: Address[];
};

export const UserSchema = SchemaFactory.createForClass(User);
