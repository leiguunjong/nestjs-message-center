import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterOutputDto {
  @IsString()
  @IsNotEmpty()
  msg: string;
}