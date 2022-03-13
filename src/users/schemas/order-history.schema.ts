import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderHistoryDocument = OrderHistory & Document;

@Schema()
export class OrderHistory {
  @Prop({ required: true })
  productId!: string[];

  @Prop({ required: true })
  _id!: string;

  @Prop({ required: true })
  status!: number;
};

export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
