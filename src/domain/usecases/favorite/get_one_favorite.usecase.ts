import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class GetOneFavoriteUseCase implements BaseUseCase<FavoriteEntity> {
  constructor(private repo: IFavoriteRepository) {}

  execute(params: Partial<FavoriteEntity>): Promise<FavoriteEntity> {
    return this.repo.getOne(params);
  }
}
