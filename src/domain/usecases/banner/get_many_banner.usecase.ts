import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { BannerEntity } from 'src/domain/entities/banner.entity';
import { IBannerRepository } from 'src/domain/repositories/banner.repository';

export class GetManyBannersUseCase implements BaseUseCase<BannerEntity[]> {
  constructor(private repo: IBannerRepository) {}

  execute(
    params: Partial<BannerEntity>,
    pagination?: PaginationModel,
  ): Promise<BannerEntity[]> {
    return this.repo.getMany(params, pagination);
  }
}
