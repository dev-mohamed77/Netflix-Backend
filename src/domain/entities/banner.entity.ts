import { BaseEntity } from 'src/application/core/base/entity.base';
import * as mongoose from 'mongoose';

export class BannerEntity extends BaseEntity {
  image?: string;
  movie?: mongoose.Schema.Types.ObjectId;
  createdAt?: mongoose.Date;
  updatedAt?: mongoose.Date;
}
