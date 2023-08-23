import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class FavoriteDto {
  @ApiProperty({
    description: 'Please enter your movie_id',
    type: mongoose.Schema.Types.ObjectId,
  })
  @IsNotEmpty()
  @IsMongoId()
  movie: mongoose.Schema.Types.ObjectId;
}
