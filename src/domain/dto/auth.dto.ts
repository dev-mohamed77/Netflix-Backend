import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'Please enter your email',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: 'Please enter your password',
    type: String,
    minimum: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class ForgetPasswordDto {
  @ApiProperty({
    description: 'Please enter your email',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;
}

export class VerifyPassResetCodeDto {
  @ApiProperty({
    description: 'Please enter your resetCode',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly resetCode: string;
}
