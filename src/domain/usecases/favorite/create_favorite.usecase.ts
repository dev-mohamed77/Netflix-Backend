import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class CreateFavoriteUseCase implements BaseUseCase<FavoriteEntity> {
  constructor(private repo: IFavoriteRepository) {}

  execute(params: FavoriteEntity): Promise<FavoriteEntity> {
    return this.repo.create(params);
  }
}
