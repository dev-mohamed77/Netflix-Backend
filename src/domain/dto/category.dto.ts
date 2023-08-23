import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    description: 'Please enter your name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
