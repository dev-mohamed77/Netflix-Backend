import { InjectModel } from '@nestjs/mongoose';
import { BaseMongooseData } from 'src/application/core/base/mongoose_data.base';
import { BannerEntity } from 'src/domain/entities/banner.entity';
import { IBannerRepository } from 'src/domain/repositories/banner.repository';
import { BannerModel } from '../schema/banner.schema';
import { Model } from 'mongoose';
import { title } from 'process';

export class BannerRepositoryImp
  extends BaseMongooseData<BannerEntity>
  implements IBannerRepository
{
  constructor(@InjectModel(BannerModel.name) model: Model<BannerEntity>) {
    super(model, 'movie movie.categories');
  }
}
