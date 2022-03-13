import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address, AddressSchema } from '@common/schemas/address.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  productId!: string[];

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({ required: true })
  status!: number;

  @Prop({ type: AddressSchema, required: true })
  address!: Address[];
};

export const OrderSchema = SchemaFactory.createForClass(Order);
