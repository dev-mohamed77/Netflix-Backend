import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { CategoryEntity } from 'src/domain/entities/categories.entity';
import { CreateCategoryUseCase } from 'src/domain/usecases/category/create_category.usecase';
import { DeleteCategoryUseCase } from 'src/domain/usecases/category/delete_category.usecase';
import { GetCategoriesUseCase } from 'src/domain/usecases/category/get_all_category.usecase';
import { GetCategoryByIdUseCase } from 'src/domain/usecases/category/get_category_by_id.usecase';
import { GetManyCategoriesUseCase } from 'src/domain/usecases/category/get_many_category.usecase';
import { GetOneCategoryUseCase } from 'src/domain/usecases/category/get_one_category.usecase';
import { UpdateCategoryUseCase } from 'src/domain/usecases/category/update_category.usecase';
import { DeleteUserUseCase } from 'src/domain/usecases/user/delete_user.usecase';

@Injectable()
export class CategoryService {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private getManyCategoriesUseCase: GetManyCategoriesUseCase,
    private getOneCategoryUseCase: GetOneCategoryUseCase,
    private getCategoryByIDUseCase: GetCategoryByIdUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  createCategoryService(params: CategoryEntity) {
    return this.createCategoryUseCase.execute(params);
  }

  updateCategoryService(id: string, params: CategoryEntity) {
    return this.updateCategoryUseCase.execute(id, params);
  }

  getCategoriesService(pagination?: PaginationModel) {
    return this.getCategoriesUseCase.execute(pagination);
  }

  getManyCategoriesService(params: Partial<CategoryEntity>) {
    return this.getManyCategoriesUseCase.execute(params);
  }

  getOneCategoryService(params: Partial<CategoryEntity>) {
    return this.getOneCategoryUseCase.execute(params);
  }

  getCategoryByIDService(id: string) {
    return this.getCategoryByIDUseCase.execute(id);
  }

  deleteCategoryByIDService(id: string) {
    return this.deleteCategoryUseCase.execute(id);
  }
}
