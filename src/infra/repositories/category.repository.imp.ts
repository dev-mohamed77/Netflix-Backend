import { InjectModel } from '@nestjs/mongoose';
import { BaseMongooseData } from 'src/application/core/base/mongoose_data.base';
import { CategoryEntity } from 'src/domain/entities/categories.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryModel } from '../schema/category.schema';
import { Model } from 'mongoose';

export class CategoryRepositoryImp
  extends BaseMongooseData<CategoryEntity>
  implements ICategoryRepository
{
  constructor(@InjectModel(CategoryModel.name) model: Model<CategoryEntity>) {
    super(model);
  }
}
