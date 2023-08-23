import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { BannerEntity } from 'src/domain/entities/banner.entity';
import { IBannerRepository } from 'src/domain/repositories/banner.repository';

export class CreateBannerUseCase implements BaseUseCase<BannerEntity> {
  constructor(private repo: IBannerRepository) {}

  execute(params: BannerEntity): Promise<BannerEntity> {
    return this.repo.create(params);
  }
}
