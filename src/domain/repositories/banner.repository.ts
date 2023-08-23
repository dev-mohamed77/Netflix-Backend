import { IBaseRepository } from 'src/application/core/base/repository.base';
import { BannerEntity } from '../entities/banner.entity';

export abstract class IBannerRepository extends IBaseRepository<BannerEntity> {}
