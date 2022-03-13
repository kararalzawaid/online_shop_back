import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';
import mongoose from 'mongoose';

export class ShoppingCartDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly number!: number;

  _id: string = new mongoose.Types.ObjectId().toString();
};
