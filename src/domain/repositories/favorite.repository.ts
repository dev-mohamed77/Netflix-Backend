import { IBaseRepository } from 'src/application/core/base/repository.base';
import { FavoriteEntity } from '../entities/favorite.entity';

export abstract class IFavoriteRepository extends IBaseRepository<FavoriteEntity> {}
