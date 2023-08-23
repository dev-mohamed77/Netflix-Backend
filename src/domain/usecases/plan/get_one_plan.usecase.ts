import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';

export class GetOnePlanUseCase implements BaseUseCase<PlanEntity> {
  constructor(private repo: IPlanRepository) {}

  execute(params: Partial<PlanEntity>): Promise<PlanEntity> {
    return this.repo.getOne(params);
  }
}
