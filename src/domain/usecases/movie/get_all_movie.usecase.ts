import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { MovieEntity } from 'src/domain/entities/movies.entity';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IMoviesRepository } from 'src/domain/repositories/movies.repository';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';

export class GetMoviesUseCase implements BaseUseCase<MovieEntity[]> {
  constructor(private repo: IMoviesRepository) {}

  execute(pagination?: PaginationModel): Promise<MovieEntity[]> {
    return this.repo.getAll(pagination);
  }
}
