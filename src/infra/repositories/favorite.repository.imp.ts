import { InjectModel } from '@nestjs/mongoose';
import { BaseMongooseData } from 'src/application/core/base/mongoose_data.base';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { FavoriteModel } from '../schema/favorite.schema';
import { Model } from 'mongoose';

export class FavoriteRepositoryImp
  extends BaseMongooseData<FavoriteEntity>
  implements IFavoriteRepository
{
  constructor(@InjectModel(FavoriteModel.name) model: Model<FavoriteEntity>) {
    super(model, 'user movie movie.categories');
  }
}
