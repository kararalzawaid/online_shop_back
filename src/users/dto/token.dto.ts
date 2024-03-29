import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class TokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token!: string;
};
