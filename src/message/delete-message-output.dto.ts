import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class deleteMessageOutputDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;
  
  @IsString()
  @IsNotEmpty()
  msg: string;
}