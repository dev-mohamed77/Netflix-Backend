import { InjectModel } from '@nestjs/mongoose';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IHomeRepository } from 'src/domain/repositories/home.repository';
import { MovieModel } from '../schema/movie.schema';
import { Model } from 'mongoose';
import { PaginationModel } from 'src/application/core/model/pagination.model';

export class HomeRepositoryImp extends IHomeRepository {
  constructor(@InjectModel(MovieModel.name) private model: Model<MovieEntity>) {
    super();
  }

  async topTenMovies(): Promise<MovieEntity[][]> {
    const movies = await this.model.aggregate<MovieEntity[]>([
      {
        $sort: { viewCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return movies;
  }

  async newReleaseMovies(): Promise<MovieEntity[][]> {
    const movies = await this.model.aggregate<MovieEntity[]>([
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return movies;
  }
}
