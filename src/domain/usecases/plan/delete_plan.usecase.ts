import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';

export class DeletePlanUseCase implements BaseUseCase<PlanEntity> {
  constructor(private repo: IPlanRepository) {}

  execute(id: string): Promise<PlanEntity> {
    return this.repo.delete(id);
  }
}
