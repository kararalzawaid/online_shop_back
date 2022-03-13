import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiFile } from '@products/interceptors/files';

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly price!: string;

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
  @IsString()
    numberInStock!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    falvour?: string;


  @ApiFile({ isArray: true })
    images: Express.Multer.File[];
};
