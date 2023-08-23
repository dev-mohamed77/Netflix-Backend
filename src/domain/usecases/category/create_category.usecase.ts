import { BaseUseCase } from 'src/application/core/base/usecase.base';
import slugify from 'slugify';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/categories.entity';

export class CreateCategoryUseCase implements BaseUseCase<CategoryEntity> {
  constructor(private repo: ICategoryRepository) {}

  execute(params: CategoryEntity): Promise<CategoryEntity> {
    if (params.name) {
      params.slug = slugify(params.name);
    }
    return this.repo.create(params);
  }
}
