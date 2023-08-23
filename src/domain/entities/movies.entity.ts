import { BaseEntity } from 'src/application/core/base/entity.base';
import * as mongoose from 'mongoose';

export class MovieEntity extends BaseEntity {
  title?: string | any;
  description?: string;
  slug?: string;
  imageUrl?: string;
  streamUrl?: string;
  language?: string[];
  cast?: string[];
  directors?: string[];
  isFavorite?: boolean;
  releaseDate?: string;
  runtime?: string;
  viewCount?: number;
  categories?: mongoose.Schema.Types.ObjectId[] | {};
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<MovieEntity>) {
    super();
    Object.assign(this, partial);
  }
}
