import slugify from 'slugify';
import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';

export class CreatePlanUseCase implements BaseUseCase<PlanEntity> {
  constructor(private repo: IPlanRepository) {}

  execute(params: PlanEntity): Promise<PlanEntity> {
    if (params.title) {
      params.slug = slugify(params.title);
    }

    return this.repo.create(params);
  }
}
