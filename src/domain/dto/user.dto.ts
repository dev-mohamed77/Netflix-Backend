import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Please enter your fullName',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @ApiProperty({
    description: 'Please enter your email',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: 'Please enter your password',
    type: String,
    required: true,
    minimum: 6,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Please enter your role',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty({
    description: 'Please enter your phone',
    type: IsPhoneNumber,
  })
  @IsNotEmpty()
  @IsPhoneNumber('EG')
  @IsString()
  readonly phone: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Please enter your gender',
    type: String,
  })
  readonly gender?: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Please enter your current password',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly currentPassword: string;

  @ApiProperty({
    description: 'Please enter your password',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UpdateLoggedUserDto {
  @ApiProperty({
    description: 'Please enter your fullName',
    type: IsPhoneNumber,
  })
  @IsOptional()
  @IsString()
  readonly fullName?: string;

  @ApiProperty({
    description: 'Please enter your phone',
    type: IsPhoneNumber,
  })
  @IsOptional()
  @IsPhoneNumber('EG')
  @IsString()
  readonly phone?: string;

  @ApiProperty({
    description: 'Please enter your gender',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly gender?: string;
}
