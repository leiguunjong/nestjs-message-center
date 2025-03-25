import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateReadDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;
  
  @IsString()
  @IsNotEmpty()
  msg: string;
}