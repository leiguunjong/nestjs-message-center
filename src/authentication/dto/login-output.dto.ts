import { IsString, IsNotEmpty } from 'class-validator';

export class LoginOutputDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}