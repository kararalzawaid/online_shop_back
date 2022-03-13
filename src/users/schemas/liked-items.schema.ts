import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikedItemsDocument = LikedItems & Document;

@Schema()
export class LikedItems {
  @Prop({ required: true })
    productId!: string;

  @Prop({ required: true })
    _id!: string;
};

export const LikedItemsSchema = SchemaFactory.createForClass(LikedItems);
