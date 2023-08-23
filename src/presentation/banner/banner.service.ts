import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { BannerEntity } from 'src/domain/entities/banner.entity';
import { CreateBannerUseCase } from 'src/domain/usecases/banner/create_banner.usecase';
import { DeleteBannerUseCase } from 'src/domain/usecases/banner/delete_banner.usecase';
import { GetBannersUseCase } from 'src/domain/usecases/banner/get_all_banner.usecase';
import { GetBannerByIdUseCase } from 'src/domain/usecases/banner/get_banner_by_id.usecase';
import { GetManyBannersUseCase } from 'src/domain/usecases/banner/get_many_banner.usecase';
import { GetOneBannerUseCase } from 'src/domain/usecases/banner/get_one_banner.usecase';
import { UpdateBannerUseCase } from 'src/domain/usecases/banner/update_banner.usecase';

@Injectable()
export class BannerService {
  constructor(
    private createBannerUseCase: CreateBannerUseCase,
    private updateBannerUseCase: UpdateBannerUseCase,
    private getBannersUseCase: GetBannersUseCase,
    private getManyBannersUseCase: GetManyBannersUseCase,
    private getOneBannerUseCase: GetOneBannerUseCase,
    private getBannerByIDUseCase: GetBannerByIdUseCase,
    private deleteBannerUseCase: DeleteBannerUseCase,
  ) {}

  createBannerService(params: BannerEntity) {
    return this.createBannerUseCase.execute(params);
  }

  updateBannerService(id: string, params: BannerEntity) {
    return this.updateBannerUseCase.execute(id, params);
  }

  getBannersService(pagination?: PaginationModel) {
    return this.getBannersUseCase.execute(pagination);
  }

  getManyBannersService(
    params: Partial<BannerEntity>,
    pagination?: PaginationModel,
  ) {
    return this.getManyBannersUseCase.execute(params, pagination);
  }

  getOneBannerService(params: Partial<BannerEntity>) {
    return this.getOneBannerUseCase.execute(params);
  }

  getBannerByIDService(id: string) {
    return this.getBannerByIDUseCase.execute(id);
  }

  deleteBannerByIDService(id: string) {
    return this.deleteBannerUseCase.execute(id);
  }
}
