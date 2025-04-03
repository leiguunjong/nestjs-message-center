import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class OutputDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;
  
  @IsString()
  @IsNotEmpty()
  msg: string;
}