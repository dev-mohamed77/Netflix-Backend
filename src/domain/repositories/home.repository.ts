import { PaginationModel } from 'src/application/core/model/pagination.model';
import { MovieEntity } from '../entities/movies.entity';

export abstract class IHomeRepository {
  abstract topTenMovies(): Promise<MovieEntity[][]>;
  abstract newReleaseMovies(): Promise<MovieEntity[][]>;
}
