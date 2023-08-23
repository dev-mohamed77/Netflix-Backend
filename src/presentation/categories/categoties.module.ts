import { Module } from '@nestjs/common';
import { CategoryController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryModel,
  CategorySchema,
} from 'src/infra/schema/category.schema';
import { CategoryService } from './categories.service';
import { CategoryRepositoryImp } from 'src/infra/repositories/category.repository.imp';
import { CreateCategoryUseCase } from 'src/domain/usecases/category/create_category.usecase';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { GetCategoriesUseCase } from 'src/domain/usecases/category/get_all_category.usecase';
import { GetManyCategoriesUseCase } from 'src/domain/usecases/category/get_many_category.usecase';
import { GetOneCategoryUseCase } from 'src/domain/usecases/category/get_one_category.usecase';
import { UpdateCategoryUseCase } from 'src/domain/usecases/category/update_category.usecase';
import { DeleteCategoryUseCase } from 'src/domain/usecases/category/delete_category.usecase';
import { JwtStrategy } from '../auth/jwt.strategy';
import { RoleGuard } from '../auth/role.guard';
import { GetCategoryByIdUseCase } from 'src/domain/usecases/category/get_category_by_id.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryModel.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: CategoryRepositoryImp,
      useClass: CategoryRepositoryImp,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory(repo: ICategoryRepository) {
        return new CreateCategoryUseCase(repo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetCategoriesUseCase,
      useFactory(repo: ICategoryRepository) {
        return new GetCategoriesUseCase(repo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetManyCategoriesUseCase,
      useFactory(repo: ICategoryRepository) {
        return new GetManyCategoriesUseCase(repo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetCategoryByIdUseCase,
      useFactory(repo: ICategoryRepository) {
        return new GetCategoryByIdUseCase(repo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetOneCategoryUseCase,
      useFactory(repo: ICategoryRepository) {
        return new GetOneCategoryUseCase(repo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: UpdateCategoryUseCase,
      useFactory(repo: ICategoryRepository) {
        return new UpdateCategoryUseCase(repo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: DeleteCategoryUseCase,
      useFactory(repo: ICategoryRepository) {
        return new DeleteCategoryUseCase(repo);
      },
      inject: [CategoryRepositoryImp],
    },
  ],
})
export class GategoryModule {}
