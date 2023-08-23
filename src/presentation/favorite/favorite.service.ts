import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { CreateFavoriteUseCase } from 'src/domain/usecases/favorite/create_favorite.usecase';
import { DeleteFavoriteUseCase } from 'src/domain/usecases/favorite/delete_favorite.usecase';
import { DeleteOneFavoriteUseCase } from 'src/domain/usecases/favorite/delete_one_favorite.usecase';
import { GetFavoritesUseCase } from 'src/domain/usecases/favorite/get_all_favorite.usecase';
import { GetFavoriteByIdUseCase } from 'src/domain/usecases/favorite/get_favorite_by_id.usecase';
import { GetManyFavoritesUseCase } from 'src/domain/usecases/favorite/get_many_favorite.usecase';
import { GetOneFavoriteUseCase } from 'src/domain/usecases/favorite/get_one_favorite.usecase';
import { UpdateFavoriteUseCase } from 'src/domain/usecases/favorite/update_favorite.usecase';

@Injectable()
export class FavoriteService {
  constructor(
    private createFavoriteUseCase: CreateFavoriteUseCase,
    private updateFavoriteUseCase: UpdateFavoriteUseCase,
    private getFavoritesUseCase: GetFavoritesUseCase,
    private getManyFavoritesUseCase: GetManyFavoritesUseCase,
    private getOneFavoriteUseCase: GetOneFavoriteUseCase,
    private getFavoriteByIDUseCase: GetFavoriteByIdUseCase,
    private deleteFavoriteUseCase: DeleteFavoriteUseCase,
    private deleteOneFavoriteUseCase: DeleteOneFavoriteUseCase,
  ) {}

  createFavoriteService(params: FavoriteEntity) {
    return this.createFavoriteUseCase.execute(params);
  }

  updateFavoriteService(id: string, params: Partial<FavoriteEntity>) {
    return this.updateFavoriteUseCase.execute(id, params);
  }

  getFavoritesService(pagination?: PaginationModel) {
    return this.getFavoritesUseCase.execute(pagination);
  }

  getManyFavoritesService(
    params: Partial<FavoriteEntity>,
    pagination?: PaginationModel,
  ) {
    return this.getManyFavoritesUseCase.execute(params, pagination);
  }

  getOneFavoriteService(params: Partial<FavoriteEntity>) {
    return this.getOneFavoriteUseCase.execute(params);
  }

  getFavoriteByIdService(id: string) {
    return this.getFavoriteByIDUseCase.execute(id);
  }

  deleteFavoriteService(id: string) {
    return this.deleteFavoriteUseCase.execute(id);
  }

  deleteOneFavoriteService(params: Partial<FavoriteEntity>) {
    return this.deleteOneFavoriteUseCase.execute(params);
  }
}
