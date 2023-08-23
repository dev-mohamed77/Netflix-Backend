import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BannerEntity } from 'src/domain/entities/banner.entity';
import * as mongoose from 'mongoose';
import { MovieModel } from './movie.schema';
import { Type } from 'class-transformer';

@Schema()
export class BannerModel {
  @Prop({
    type: String,
    required: true,
  })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MovieModel.name })
  @Type(() => MovieModel)
  movie: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  createdAt: mongoose.Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: mongoose.Date;
}

export const BannerSchema =
  SchemaFactory.createForClass<BannerEntity>(BannerModel);
