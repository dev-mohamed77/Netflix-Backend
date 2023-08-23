import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { CategoryEntity } from 'src/domain/entities/categories.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';

export class GetCategoriesUseCase implements BaseUseCase<CategoryEntity[]> {
  constructor(private repo: ICategoryRepository) {}

  execute(pagination?: PaginationModel): Promise<CategoryEntity[]> {
    return this.repo.getAll(pagination);
  }
}
