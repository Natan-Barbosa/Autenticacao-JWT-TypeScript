import { IsEmail, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsString()
  email: string;

  @Length(8, 64)
  @IsString()
  password: string;
}
