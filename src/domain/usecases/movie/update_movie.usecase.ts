import slugify from 'slugify';
import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';

export class UpdateMovieUseCase implements BaseUseCase<MovieEntity> {
  constructor(private repo: IMoviesRepository) {}

  execute(id: string, params: Partial<MovieEntity>): Promise<MovieEntity> {
    if (params.title) {
      params.slug = slugify(params.title);
    }

    return this.repo.update(id, params);
  }
}
