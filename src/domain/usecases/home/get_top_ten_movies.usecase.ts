import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { IHomeRepository } from 'src/domain/repositories/home.repository';

export class GetTopTenMoviesUseCase implements BaseUseCase<MovieEntity[][]> {
  constructor(private repo: IHomeRepository) {}

  execute(): Promise<MovieEntity[][]> {
    return this.repo.topTenMovies();
  }
}
