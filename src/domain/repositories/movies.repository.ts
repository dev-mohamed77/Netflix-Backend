import { IBaseRepository } from 'src/application/core/base/repository.base';
import { MovieEntity } from '../entities/movies.entity';

export abstract class IMoviesRepository extends IBaseRepository<MovieEntity> {
  abstract searchMovies(text: string): Promise<MovieEntity[]>;
}
