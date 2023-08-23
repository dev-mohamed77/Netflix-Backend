import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanModel, PlanSchema } from 'src/infra/schema/plan.schema';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { PlanRepositoryImp } from 'src/infra/repositories/plan.repository.imp';
import { IPlanRepository } from 'src/domain/repositories/plan.repository';
import { GetPlansUseCase } from 'src/domain/usecases/plan/get_all_plan.usecase';
import { GetManyPlansUseCase } from 'src/domain/usecases/plan/get_many_plan.usecase';
import { GetPlanByIdUseCase } from 'src/domain/usecases/plan/get_plan_by_id.usecase';
import { GetOnePlanUseCase } from 'src/domain/usecases/plan/get_one_plan.usecase';
import { UpdatePlanUseCase } from 'src/domain/usecases/plan/update_plan.usecase';
import { DeletePlanUseCase } from 'src/domain/usecases/plan/delete_plan.usecase';
import { UsersModule } from '../users/users.module';
import { CreatePlanUseCase } from 'src/domain/usecases/plan/create_plan.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlanModel.name, schema: PlanSchema }]),
    UsersModule,
  ],
  controllers: [PlanController],
  providers: [
    PlanService,
    {
      provide: PlanRepositoryImp,
      useClass: PlanRepositoryImp,
    },
    {
      provide: CreatePlanUseCase,
      useFactory(repo: IPlanRepository) {
        return new CreatePlanUseCase(repo);
      },
      inject: [PlanRepositoryImp],
    },
    {
      provide: GetPlansUseCase,
      useFactory(repo: IPlanRepository) {
        return new GetPlansUseCase(repo);
      },
      inject: [PlanRepositoryImp],
    },
    {
      provide: GetManyPlansUseCase,
      useFactory(repo: IPlanRepository) {
        return new GetManyPlansUseCase(repo);
      },
      inject: [PlanRepositoryImp],
    },
    {
      provide: GetPlanByIdUseCase,
      useFactory(repo: IPlanRepository) {
        return new GetPlanByIdUseCase(repo);
      },
      inject: [PlanRepositoryImp],
    },
    {
      provide: GetOnePlanUseCase,
      useFactory(repo: IPlanRepository) {
        return new GetOnePlanUseCase(repo);
      },
      inject: [PlanRepositoryImp],
    },
    {
      provide: UpdatePlanUseCase,
      useFactory(repo: IPlanRepository) {
        return new UpdatePlanUseCase(repo);
      },
      inject: [PlanRepositoryImp],
    },
    {
      provide: DeletePlanUseCase,
      useFactory(repo: IPlanRepository) {
        return new DeletePlanUseCase(repo);
      },
      inject: [PlanRepositoryImp],
    },
  ],
})
export class PlanModule {}
