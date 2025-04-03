import { IsString, IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}