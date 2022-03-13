import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShoppingCartDocument = ShoppingCart & Document;

@Schema()
export class ShoppingCart {
  @Prop({ required: true })
  productId!: string;

  @Prop({ required: true })
  number!: number;

  @Prop({ required: true })
  _id!: string;
};

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
