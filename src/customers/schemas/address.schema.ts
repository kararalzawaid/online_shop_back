import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop()
  street!: string;

  @Prop()
  zip!: string;

  @Prop()
  town!: string;

  @Prop()
  county!: string;

  @Prop({ default: 'Austria' })
  country!: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
