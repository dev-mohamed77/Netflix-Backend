import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty({
    description: 'Please enter your title',
    type: String,
    minimum: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  title: string;

  @ApiProperty({
    description: 'Please enter your description',
    type: String,
    minimum: 50,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  description: string;

  @ApiProperty({
    description: 'Please enter your imageUrl',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'Please enter your streamUrl',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  streamUrl: string;

  @ApiProperty({
    description: 'Please enter your language',
    type: [String],
  })
  @IsArray()
  language: string[];

  @ApiProperty({
    description: 'Please enter your cast',
    type: [String],
  })
  @IsArray()
  cast: string[];

  @ApiProperty({
    description: 'Please enter your directors',
    type: [String],
  })
  @IsArray()
  directors: string[];

  @ApiProperty({
    description: 'Please enter your releaseDate',
    type: String,
  })
  @IsString()
  releaseDate: string;

  @ApiProperty({
    description: 'Please enter your runtime',
    type: String,
  })
  @IsString()
  runtime: string;

  @ApiProperty({
    description: 'Please enter your categories',
    type: mongoose.Types.Array<mongoose.Schema.Types.ObjectId>,
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  categories: mongoose.Schema.Types.ObjectId[];
}

export class UpdateMovieDto extends PartialType(MovieDto) {
  readonly gender?: string;
}

export class CategoriesIdsDto {
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  readonly categories?: mongoose.Schema.Types.ObjectId[];
}
