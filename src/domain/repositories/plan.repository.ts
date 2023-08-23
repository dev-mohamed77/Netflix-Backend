import { IBaseRepository } from 'src/application/core/base/repository.base';
import { PlanEntity } from '../entities/plan.entity';

export abstract class IPlanRepository extends IBaseRepository<PlanEntity> {}
