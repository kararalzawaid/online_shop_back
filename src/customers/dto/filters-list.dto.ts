import { Transform } from 'class-transformer';

import { IsArray, IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class FiltersListDto {
  @IsString()
  @IsOptional()
  readonly page?: string;

  @IsString()
  @IsOptional()
  readonly limit?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  readonly isPaginated?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  readonly search?: string;

  @IsString()
  @IsOptional()
  readonly sort?: string;

  @IsString()
  @IsOptional()
  readonly sortOrder?: string;
}