import { BaseEntity } from 'src/application/core/base/entity.base';
import * as mongoose from 'mongoose';

export class FavoriteEntity extends BaseEntity {
  user: mongoose.Schema.Types.ObjectId;
  movie: mongoose.Schema.Types.ObjectId;
}
