import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { CategoryEntity } from 'src/domain/entities/categories.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';

export class GetOneCategoryUseCase implements BaseUseCase<CategoryEntity> {
  constructor(private repo: ICategoryRepository) {}

  execute(params: Partial<CategoryEntity>): Promise<CategoryEntity> {
    return this.repo.getOne(params);
  }
}
