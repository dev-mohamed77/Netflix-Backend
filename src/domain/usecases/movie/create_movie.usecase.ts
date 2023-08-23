import slugify from 'slugify';
import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';

export class CreateMovieUseCase implements BaseUseCase<MovieEntity> {
  constructor(private repo: IMoviesRepository) {}

  execute(params: MovieEntity): Promise<MovieEntity> {
    if (params.title) {
      params.slug = slugify(params.title);
    }
    return this.repo.create(params);
  }
}
