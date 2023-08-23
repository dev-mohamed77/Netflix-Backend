import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class GetFavoriteByIdUseCase implements BaseUseCase<FavoriteEntity> {
  constructor(private repo: IFavoriteRepository) {}

  execute(id: string): Promise<FavoriteEntity> {
    return this.repo.getByID(id);
  }
}
