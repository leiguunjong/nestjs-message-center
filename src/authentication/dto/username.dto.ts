import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsernameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
}