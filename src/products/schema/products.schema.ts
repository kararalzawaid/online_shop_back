import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
    userId!: string;

  @Prop({ required: true })
    brandName!: string;

  @Prop({ required: true })
    name!: string;

  @Prop({ required: true })
    category!: string;

  @Prop({ required: true })
    price!: string;

  @Prop({ required: false })
    color?: string;

  @Prop({ required: false })
    size?: string;

  @Prop({ required: true })
    numberInStock!: string;

  @Prop({ required: false })
    falvour?: string;

  @Prop({ required: false })
    images?: string[];
};

export const ProductSchema = SchemaFactory.createForClass(Product);
