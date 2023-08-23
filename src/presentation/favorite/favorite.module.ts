import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteModel,
  FavoriteSchema,
} from 'src/infra/schema/favorite.schema';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteRepositoryImp } from 'src/infra/repositories/favorite.repository.imp';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { GetFavoritesUseCase } from 'src/domain/usecases/favorite/get_all_favorite.usecase';
import { GetManyFavoritesUseCase } from 'src/domain/usecases/favorite/get_many_favorite.usecase';
import { GetFavoriteByIdUseCase } from 'src/domain/usecases/favorite/get_favorite_by_id.usecase';
import { GetOneFavoriteUseCase } from 'src/domain/usecases/favorite/get_one_favorite.usecase';
import { UpdateFavoriteUseCase } from 'src/domain/usecases/favorite/update_favorite.usecase';
import { DeleteFavoriteUseCase } from 'src/domain/usecases/favorite/delete_favorite.usecase';
import { CreateFavoriteUseCase } from 'src/domain/usecases/favorite/create_favorite.usecase';
import { MoviesModule } from '../movies/movies.module';
import { DeleteOneFavoriteUseCase } from 'src/domain/usecases/favorite/delete_one_favorite.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FavoriteModel.name, schema: FavoriteSchema },
    ]),
    MoviesModule,
  ],
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    {
      provide: FavoriteRepositoryImp,
      useClass: FavoriteRepositoryImp,
    },
    {
      provide: CreateFavoriteUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new CreateFavoriteUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetFavoritesUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new GetFavoritesUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetManyFavoritesUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new GetManyFavoritesUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetFavoriteByIdUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new GetFavoriteByIdUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetOneFavoriteUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new GetOneFavoriteUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: UpdateFavoriteUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new UpdateFavoriteUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: DeleteFavoriteUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new DeleteFavoriteUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: DeleteOneFavoriteUseCase,
      useFactory(repo: IFavoriteRepository) {
        return new DeleteOneFavoriteUseCase(repo);
      },
      inject: [FavoriteRepositoryImp],
    },
  ],
})
export class FavoriteModule {}
