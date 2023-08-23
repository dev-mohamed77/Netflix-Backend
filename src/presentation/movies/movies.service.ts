import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { CreateMovieUseCase } from 'src/domain/usecases/movie/create_movie.usecase';
import { DeleteMovieUseCase } from 'src/domain/usecases/movie/delete_movie.usecase';
import { GetMoviesUseCase } from 'src/domain/usecases/movie/get_all_movie.usecase';
import { GetManyMoviesUseCase } from 'src/domain/usecases/movie/get_many_movie.usecase';
import { GetMovieByIdUseCase } from 'src/domain/usecases/movie/get_movie_by_id.usecase';
import { GetOneMovieUseCase } from 'src/domain/usecases/movie/get_one_movie.usecase';
import { UpdateMovieUseCase } from 'src/domain/usecases/movie/update_movie.usecase';

@Injectable()
export class MoviesService {
  constructor(
    private createMovieUseCase: CreateMovieUseCase,
    private updateMovieUseCase: UpdateMovieUseCase,
    private getMoviesUseCase: GetMoviesUseCase,
    private getManyMoviesUseCase: GetManyMoviesUseCase,
    private getOneMovieUseCase: GetOneMovieUseCase,
    private getMovieByIDUseCase: GetMovieByIdUseCase,
    private deleteMovieUseCase: DeleteMovieUseCase,
  ) {}

  createMovieService(params: MovieEntity) {
    return this.createMovieUseCase.execute(params);
  }

  getMoviesService(pagination?: PaginationModel) {
    return this.getMoviesUseCase.execute(pagination);
  }

  getManyMoviesService(
    params?: Partial<MovieEntity>,
    pagination?: PaginationModel,
  ) {
    return this.getManyMoviesUseCase.execute(params, pagination);
  }

  getOneMovieService(params: Partial<MovieEntity>) {
    return this.getOneMovieUseCase.execute(params);
  }

  getMovieByIdService(id: string) {
    return this.getMovieByIDUseCase.execute(id);
  }

  updateMovieService(id: string, params: Partial<MovieEntity>) {
    return this.updateMovieUseCase.execute(id, params);
  }

  deleteMovieService(id: string) {
    return this.deleteMovieUseCase.execute(id);
  }
}
