import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';


export class ResetPassword {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;
};
