import slugify from 'slugify';
import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class UpdateUserUseCase implements BaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(id: string, params: Partial<UserEntity>): Promise<UserEntity> {
    if (params.fullName) {
      params.slug = slugify(params.fullName);
    }

    return this.repo.update(id, params);
  }
}
