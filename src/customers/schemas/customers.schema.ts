import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Address, AddressSchema } from './address.schema';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
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

  @Prop({ type: AddressSchema, required: true })
    address!: Address[];
};

export const CustomerSchema = SchemaFactory.createForClass(Customer);
