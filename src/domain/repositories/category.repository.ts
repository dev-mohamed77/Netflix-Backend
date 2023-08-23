import { IBaseRepository } from 'src/application/core/base/repository.base';
import { CategoryEntity } from '../entities/categories.entity';

export abstract class ICategoryRepository extends IBaseRepository<CategoryEntity> {}
