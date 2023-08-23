import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';
import { PaginationModel } from '../../../application/core/model/pagination.model';

export class GetPlansUseCase implements BaseUseCase<PlanEntity[]> {
  constructor(private repo: IPlanRepository) {}

  execute(pagination?: PaginationModel): Promise<PlanEntity[]> {
    return this.repo.getAll(pagination);
  }
}
