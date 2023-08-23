import { Injectable } from '@nestjs/common';
import { PlanEntity } from 'src/domain/entities/plan.entity';
import { DeletePlanUseCase } from 'src/domain/usecases/plan/delete_plan.usecase';
import { GetPlansUseCase } from 'src/domain/usecases/plan/get_all_plan.usecase';
import { GetOnePlanUseCase } from 'src/domain/usecases/plan/get_one_plan.usecase';
import { GetPlanByIdUseCase } from 'src/domain/usecases/plan/get_plan_by_id.usecase';
import { UpdatePlanUseCase } from 'src/domain/usecases/plan/update_plan.usecase';
import { UserService } from '../users/users.service';
import { GetManyPlansUseCase } from 'src/domain/usecases/plan/get_many_plan.usecase';
import { CreatePlanUseCase } from 'src/domain/usecases/plan/create_plan.usecase';
import { PaginationModel } from 'src/application/core/model/pagination.model';

@Injectable()
export class PlanService {
  constructor(
    private createPlanUseCase: CreatePlanUseCase,
    private updatePlanUseCase: UpdatePlanUseCase,
    private getPlansUseCase: GetPlansUseCase,
    private getManyPlansUseCase: GetManyPlansUseCase,
    private getOnePlanUseCase: GetOnePlanUseCase,
    private getPlanByIDUseCase: GetPlanByIdUseCase,
    private deletePlanUseCase: DeletePlanUseCase,
    private userService: UserService,
  ) {}

  createPlaneService(params: PlanEntity) {
    return this.createPlanUseCase.execute(params);
  }

  updatePlanService(id: string, params: Partial<PlanEntity>) {
    return this.updatePlanUseCase.execute(id, params);
  }

  getPlansService(pagination?: PaginationModel) {
    return this.getPlansUseCase.execute(pagination);
  }

  getManyPlansService(params: Partial<PlanEntity>) {
    return this.getManyPlansUseCase.execute(params);
  }

  getOnePlanService(params: Partial<PlanEntity>) {
    return this.getOnePlanUseCase.execute(params);
  }

  getPlanByIDService(id: string) {
    return this.getPlanByIDUseCase.execute(id);
  }

  deletePlanService(id: string) {
    return this.deletePlanUseCase.execute(id);
  }

  // -----------------------------------subscriptions Plan--------------------------------

  async onSubscribePlanService(planId: string, userId: string) {
    var date = new Date(); // Now

    const user = await this.userService.updateUserService(userId, {
      membership: planId as any,
      membershipStartDate: Date.now(),
      membershipEndDate: date.setDate(date.getDate() + 30),
    });

    return user;
  }

  async onUnSubscribePlanService(userId: string) {
    const user = await this.userService.updateUserService(userId, {
      membership: null,
      membershipStartDate: null,
      membershipEndDate: null,
    });

    return user;
  }
}
