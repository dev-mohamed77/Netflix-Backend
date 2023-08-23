import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EndPoint } from 'src/application/config/endpoint';
import { CategoryService } from './categories.service';
import { CategoryDto } from 'src/domain/dto/category.dto';
import { Role } from 'src/application/config/roles';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { ValidateMongoIdPipe } from 'src/application/pipe/mongo_id_pipe';
import { MoviesService } from '../movies/movies.service';

@Controller(EndPoint.categories)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async createCategoryController(@Body(ValidationPipe) params: CategoryDto) {
    const result = await this.categoryService.createCategoryService(params);

    return {
      status: true,
      result,
    };
  }

  @Get()
  async getCategoriesController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const result = await this.categoryService.getCategoriesService({
      limit: parseInt(limit),
      page: parseInt(page),
    });

    return {
      status: true,
      result,
    };
  }

  @Get(EndPoint.id)
  async getCategoryByIDController(
    @Param('id', ValidateMongoIdPipe) id: string,
  ) {
    const result = await this.categoryService.getCategoryByIDService(id);

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.id)
  @Roles(Role.user, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateCategoryController(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body(ValidationPipe) params: CategoryDto,
  ) {
    const result = await this.categoryService.updateCategoryService(id, params);

    return {
      status: true,
      result,
    };
  }

  @Delete(EndPoint.id)
  @Roles(Role.user, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deleteCategoryController(@Param('id', ValidateMongoIdPipe) id: string) {
    const result = await this.categoryService.deleteCategoryByIDService(id);

    return {
      status: true,
      result,
    };
  }
}
