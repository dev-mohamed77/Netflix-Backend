import { InjectModel } from '@nestjs/mongoose';
import { BaseMongooseData } from 'src/application/core/base/mongoose_data.base';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';
import { MovieModel } from '../schema/movie.schema';
import { Model } from 'mongoose';

export class MoviesRepositoryImp
  extends BaseMongooseData<MovieEntity>
  implements IMoviesRepository
{
  constructor(@InjectModel(MovieModel.name) model: Model<MovieEntity>) {
    super(model, ['categories']);
  }
  searchMovies(text: string): Promise<MovieEntity[]> {
    return this.model.find({ $text: { $search: text } });
  }
}
