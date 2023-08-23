import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlanDto {
  @ApiProperty({
    description: 'Please enter your title',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Please enter your description',
    type: String,
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Please enter your price',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Please enter your resolution',
    type: String,
  })
  @IsString()
  resolution: string;

  @ApiProperty({
    description: 'Please enter your quality',
    type: String,
  })
  @IsString()
  quality: string;

  @ApiProperty({
    description: 'Please enter your supportedDevices',
    type: [String],
  })
  @IsArray()
  supportedDevices: string[];
}

export class UpdatePlanDto extends PartialType(PlanDto) {
  readonly gender?: string;
}
