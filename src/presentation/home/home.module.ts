import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModel, MovieSchema } from 'src/infra/schema/movie.schema';
import { HomeRepositoryImp } from 'src/infra/repositories/home.repository.imp';
import { IHomeRepository } from 'src/domain/repositories/home.repository';
import { GetNewRealeseMoviesUseCase } from 'src/domain/usecases/home/get_new_realese_movies.usecase';
import { BannerModule } from '../banner/banner.module';
import { GetTopTenMoviesUseCase } from 'src/domain/usecases/home/get_top_ten_movies.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MovieModel.name, schema: MovieSchema }]),
    BannerModule,
  ],
  controllers: [HomeController],
  providers: [
    HomeService,
    {
      provide: HomeRepositoryImp,
      useClass: HomeRepositoryImp,
    },
    {
      provide: GetNewRealeseMoviesUseCase,
      useFactory(repo: IHomeRepository) {
        return new GetNewRealeseMoviesUseCase(repo);
      },
      inject: [HomeRepositoryImp],
    },
    {
      provide: GetTopTenMoviesUseCase,
      useFactory(repo: IHomeRepository) {
        return new GetTopTenMoviesUseCase(repo);
      },
      inject: [HomeRepositoryImp],
    },
  ],
})
export class HomeModule {}
