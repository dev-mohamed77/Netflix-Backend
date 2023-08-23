import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class GetManyFavoritesUseCase implements BaseUseCase<FavoriteEntity[]> {
  constructor(private repo: IFavoriteRepository) {}

  execute(
    params: Partial<FavoriteEntity>,
    pagination?: PaginationModel,
  ): Promise<FavoriteEntity[]> {
    return this.repo.getMany(params, pagination);
  }
}
