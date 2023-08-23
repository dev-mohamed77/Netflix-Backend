import slugify from 'slugify';
import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { CategoryEntity } from 'src/domain/entities/categories.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';

export class UpdateCategoryUseCase implements BaseUseCase<CategoryEntity> {
  constructor(private repo: ICategoryRepository) {}

  execute(
    id: string,
    params: Partial<CategoryEntity>,
  ): Promise<CategoryEntity> {
    if (params.name) {
      params.slug = slugify(params.name);
    }

    return this.repo.update(id, params);
  }
}
