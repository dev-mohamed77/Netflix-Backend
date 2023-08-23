import { BaseEntity } from 'src/application/core/base/entity.base';

export class CategoryEntity extends BaseEntity {
  name?: string;
  slug?: string;

  constructor(partial: Partial<CategoryEntity>) {
    super();
    Object.assign(this, partial);
  }
}
