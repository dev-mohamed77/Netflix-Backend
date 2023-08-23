import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IHomeRepository } from 'src/domain/repositories/home.repository';

export class GetNewRealeseMoviesUseCase
  implements BaseUseCase<MovieEntity[][]>
{
  constructor(private repo: IHomeRepository) {}

  execute(): Promise<MovieEntity[][]> {
    return this.repo.newReleaseMovies();
  }
}
