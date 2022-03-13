import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsPhoneNumber, IsString, IsEmail, ValidateNested, IsNumber } from 'class-validator';

import { AddressDto } from '@common/dto/address.dto';

export class GuestOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId!: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly phoneNumber!: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
    address?: AddressDto;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly status!: number;
};
