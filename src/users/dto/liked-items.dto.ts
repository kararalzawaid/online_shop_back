import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class LikedItemsDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId!: string;

  _id: string = new mongoose.Types.ObjectId().toString();
};
