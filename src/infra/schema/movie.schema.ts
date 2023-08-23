import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { CategoryModel } from './category.schema';
import * as mongoose from 'mongoose';

@Schema()
export class MovieModel {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: String, required: true })
  streamUrl: string;

  @Prop({ type: Array<String> })
  language: string[];

  @Prop({ type: Array<String> })
  cast: string[];

  @Prop({ type: Array<String> })
  directors: string[];

  @Prop({ type: String })
  releaseDate: string;

  @Prop({ type: Boolean, default: false })
  isFavorite: boolean;

  @Prop({ type: String })
  runtime: string;

  @Prop({ type: Number, default: 0 })
  viewCount: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: CategoryModel.name })
  @Type(() => CategoryModel)
  categories: mongoose.Types.Array<mongoose.Schema.Types.ObjectId>;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}

export const MovieSchema =
  SchemaFactory.createForClass<MovieEntity>(MovieModel);
