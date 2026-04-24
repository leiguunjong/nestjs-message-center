import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterOutputDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  msg: string;

  @IsString()
  @IsNotEmpty()
  access_token: string;

  constructor(code: number, msg: string, access_token: string) {
    this.code = code;
    this.msg = msg;
    this.access_token = access_token;
  }
}