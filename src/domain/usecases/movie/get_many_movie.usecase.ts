import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';

export class GetManyMoviesUseCase implements BaseUseCase<MovieEntity[]> {
  constructor(private repo: IMoviesRepository) {}

  execute(
    params?: Partial<MovieEntity>,
    pagination?: PaginationModel,
  ): Promise<MovieEntity[]> {
    return this.repo.getMany(params, pagination);
  }
}
