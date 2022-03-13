import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Address, AddressSchema } from '@common/schemas/address.schema';

import { ShoppingCart, ShoppingCartSchema } from './shopping-cart.schema';
import { LikedItems, LikedItemsSchema } from './liked-items.schema';
import { OrderHistory, OrderHistorySchema } from './order-history.schema';

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
    passwordHash!: string;

  @Prop({ required: true })
    isAdmin!: boolean;

  @Prop({ type: AddressSchema, required: true })
    address!: Address[];

  @Prop({ type: [ShoppingCartSchema], required: false })
    shoppingCart?: ShoppingCart[];

  @Prop({ type: [LikedItemsSchema], required: false })
    likedItems?: LikedItems[];

  @Prop({ type: [OrderHistorySchema], required: false })
    ordersHistory?: OrderHistory[];
};

export const UserSchema = SchemaFactory.createForClass(User);
