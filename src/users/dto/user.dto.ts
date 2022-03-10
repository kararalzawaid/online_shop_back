import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested, IsEmail, IsPhoneNumber, IsBoolean } from 'class-validator';

export class UserDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
    password!: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
    address?: AddressDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
    isAdmin?: boolean;
};
