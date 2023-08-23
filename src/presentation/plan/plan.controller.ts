import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { EndPoint } from 'src/application/config/endpoint';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role } from 'src/application/config/roles';
import { Roles } from '../auth/role.decorator';
import { PlanDto, UpdatePlanDto } from 'src/domain/dto/plan.dto';
import { ValidateMongoIdPipe } from 'src/application/pipe/mongo_id_pipe';
import { UserService } from '../users/users.service';

@Controller(EndPoint.plan)
export class PlanController {
  constructor(private planService: PlanService, userService: UserService) {}

  @Put(`${EndPoint.id}/${EndPoint.subscribed}`)
  @UseGuards(JwtAuthGuard)
  async onSubscribePlanController(
    @Req() req,
    @Param('id', ValidateMongoIdPipe) id: string,
  ) {
    const result = await this.planService.onSubscribePlanService(
      id,
      req.user.id,
    );

    return {
      status: true,
      message: 'The plan has been successfully subscribed',
      result,
    };
  }

  @Put(EndPoint.unsubscribed)
  @UseGuards(JwtAuthGuard)
  async onUnSubscribePlanController(@Req() req) {
    const result = await this.planService.onUnSubscribePlanService(req.user.id);

    return {
      status: true,
      message: 'The plan has been successfully Unsubscribed',
      result,
    };
  }

  @Post()
  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async createPlanController(@Body(ValidationPipe) params: PlanDto) {
    const result = await this.planService.createPlaneService(params);

    return {
      status: true,
      result,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPlansController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const result = await this.planService.getPlansService({
      page: parseInt(page),
      limit: parseInt(limit),
    });

    return {
      status: true,
      result,
    };
  }

  @Get(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async getPlanByIDController(@Param('id', ValidateMongoIdPipe) id: string) {
    const result = await this.planService.getPlanByIDService(id);

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.id)
  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updatePlanController(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body(ValidationPipe) params: UpdatePlanDto,
  ) {
    const result = await this.planService.updatePlanService(id, params);

    return {
      status: true,
      result,
    };
  }

  @Delete(EndPoint.id)
  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deletePlanController(@Param('id', ValidateMongoIdPipe) id: string) {
    const result = await this.planService.deletePlanService(id);

    return {
      status: true,
      result,
    };
  }
}
