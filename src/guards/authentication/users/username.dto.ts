import { IsString, IsNotEmpty } from 'class-validator';


export class UsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}