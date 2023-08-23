import { PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import * as mongoose from 'mongoose';

export class BannerDto {
  @IsNotEmpty()
  @IsMongoId()
  movie: mongoose.Schema.Types.ObjectId;
}

export class UpdateBannerDto {
  @IsOptional()
  @IsMongoId()
  movie?: mongoose.Schema.Types.ObjectId;
}
