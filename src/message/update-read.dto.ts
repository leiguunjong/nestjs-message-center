import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateReadDto {
  @IsString()
  @IsNotEmpty()
  msg: string;
}