import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import mongoose from 'mongoose';

export class OrderHistoryDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId!: string[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly status!: number;

  _id: string = new mongoose.Types.ObjectId().toString();
};
