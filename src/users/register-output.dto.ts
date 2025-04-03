import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterOutputDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  msg: string;
}