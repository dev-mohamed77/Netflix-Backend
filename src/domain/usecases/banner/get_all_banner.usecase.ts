import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { BannerEntity } from 'src/domain/entities/banner.entity';
import { IBannerRepository } from 'src/domain/repositories/banner.repository';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';

export class GetBannersUseCase implements BaseUseCase<BannerEntity[]> {
  constructor(private repo: IBannerRepository) {}

  execute(pagination?: PaginationModel): Promise<BannerEntity[]> {
    return this.repo.getAll(pagination);
  }
}
