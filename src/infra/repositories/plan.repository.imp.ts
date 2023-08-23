import { InjectModel } from '@nestjs/mongoose';
import { BaseMongooseData } from 'src/application/core/base/mongoose_data.base';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';
import { PlanModel } from '../schema/plan.schema';
import { Model } from 'mongoose';

export class PlanRepositoryImp
  extends BaseMongooseData<PlanEntity>
  implements IPlanRepository
{
  constructor(@InjectModel(PlanModel.name) model: Model<PlanEntity>) {
    super(model);
  }
}
