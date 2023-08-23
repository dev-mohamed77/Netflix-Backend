import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesRepositoryImp } from 'src/infra/repositories/movie.repository.imp';
import { CreateMovieUseCase } from 'src/domain/usecases/movie/create_movie.usecase';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';
import { GetMoviesUseCase } from 'src/domain/usecases/movie/get_all_movie.usecase';
import { GetManyMoviesUseCase } from 'src/domain/usecases/movie/get_many_movie.usecase';
import { GetMovieByIdUseCase } from 'src/domain/usecases/movie/get_movie_by_id.usecase';
import { GetOneMovieUseCase } from 'src/domain/usecases/movie/get_one_movie.usecase';
import { UpdateMovieUseCase } from 'src/domain/usecases/movie/update_movie.usecase';
import { DeleteMovieUseCase } from 'src/domain/usecases/movie/delete_movie.usecase';
import { MovieModel, MovieSchema } from 'src/infra/schema/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from 'src/application/common/cloudinary/cloudinary.module';
import { diskStorage } from 'multer';
import { GategoryModule } from '../categories/categoties.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MovieModel.name, schema: MovieSchema }]),
    MulterModule.register({
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, `${Date.now()} + ${file.originalname}`);
        },
      }),
    }),
    CloudinaryModule,
    GategoryModule,
  ],
  controllers: [MoviesController],
  exports: [MoviesService],
  providers: [
    MoviesService,
    {
      provide: MoviesRepositoryImp,
      useClass: MoviesRepositoryImp,
    },
    {
      provide: CreateMovieUseCase,
      useFactory(repo: IMoviesRepository) {
        return new CreateMovieUseCase(repo);
      },
      inject: [MoviesRepositoryImp],
    },
    {
      provide: GetMoviesUseCase,
      useFactory(repo: IMoviesRepository) {
        return new GetMoviesUseCase(repo);
      },
      inject: [MoviesRepositoryImp],
    },
    {
      provide: GetManyMoviesUseCase,
      useFactory(repo: IMoviesRepository) {
        return new GetManyMoviesUseCase(repo);
      },
      inject: [MoviesRepositoryImp],
    },
    {
      provide: GetMovieByIdUseCase,
      useFactory(repo: IMoviesRepository) {
        return new GetMovieByIdUseCase(repo);
      },
      inject: [MoviesRepositoryImp],
    },
    {
      provide: GetOneMovieUseCase,
      useFactory(repo: IMoviesRepository) {
        return new GetOneMovieUseCase(repo);
      },
      inject: [MoviesRepositoryImp],
    },
    {
      provide: UpdateMovieUseCase,
      useFactory(repo: IMoviesRepository) {
        return new UpdateMovieUseCase(repo);
      },
      inject: [MoviesRepositoryImp],
    },
    {
      provide: DeleteMovieUseCase,
      useFactory(repo: IMoviesRepository) {
        return new DeleteMovieUseCase(repo);
      },
      inject: [MoviesRepositoryImp],
    },
  ],
})
export class MoviesModule {}
