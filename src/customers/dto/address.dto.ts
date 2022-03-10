import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddressDto {
  _id: string = new mongoose.Types.ObjectId().toString();

  @ApiProperty()
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  zip?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  town?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  county?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country?: string;
}
