import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';

export class GetOneMovieUseCase implements BaseUseCase<MovieEntity> {
  constructor(private repo: IMoviesRepository) {}

  execute(params: Partial<MovieEntity>): Promise<MovieEntity> {
    return this.repo.getOne(params);
  }
}
