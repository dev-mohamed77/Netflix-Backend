import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';

export class GetMovieByIdUseCase implements BaseUseCase<MovieEntity> {
  constructor(private repo: IMoviesRepository) {}

  execute(id: string): Promise<MovieEntity> {
    return this.repo.getByID(id);
  }
}
