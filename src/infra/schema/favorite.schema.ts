import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import * as mongoose from 'mongoose';
import { UserModel } from './user.schema';
import { MovieModel } from './movie.schema';

@Schema()
export class FavoriteModel {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModel.name,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: MovieModel.name,
  })
  movie: mongoose.Schema.Types.ObjectId;
}

export const FavoriteSchema =
  SchemaFactory.createForClass<FavoriteEntity>(FavoriteModel);
