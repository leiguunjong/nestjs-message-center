import { IsString, IsNotEmpty } from 'class-validator';

export class LoginInputDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}