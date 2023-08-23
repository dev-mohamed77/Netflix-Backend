import { Injectable } from '@nestjs/common';
import { BannerService } from '../banner/banner.service';
import { MoviesService } from '../movies/movies.service';
import { GetNewRealeseMoviesUseCase } from 'src/domain/usecases/home/get_new_realese_movies.usecase';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { GetTopTenMoviesUseCase } from 'src/domain/usecases/home/get_top_ten_movies.usecase';

@Injectable()
export class HomeService {
  constructor(
    private getNewRealeseMoviesUseCase: GetNewRealeseMoviesUseCase,
    private getTopTenMoviesUseCase: GetTopTenMoviesUseCase,
  ) {}

  async getNewReleaseMoviesService() {
    return this.getNewRealeseMoviesUseCase.execute();
  }

  async getTopTenMoviesService() {
    return this.getTopTenMoviesUseCase.execute();
  }
}
