import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
    userId!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
    brandName!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly category!: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly price!: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly color?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
    size?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    numberInStock!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
    falvour?: string;
};
