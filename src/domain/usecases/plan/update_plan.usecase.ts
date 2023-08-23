import slugify from 'slugify';
import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';

export class UpdatePlanUseCase implements BaseUseCase<PlanEntity> {
  constructor(private repo: IPlanRepository) {}

  execute(id: string, params: Partial<PlanEntity>): Promise<PlanEntity> {
    if (params.title) {
      params.slug = slugify(params.title);
    }
    return this.repo.update(id, params);
  }
}
