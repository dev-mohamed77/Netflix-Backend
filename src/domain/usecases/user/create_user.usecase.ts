import { UserEntity } from 'src/domain/entities/user.entity';
import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import slugify from 'slugify';

export class CreateUserUseCase implements BaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(params: UserEntity): Promise<UserEntity> {
    if (params.fullName) {
      params.slug = slugify(params.fullName);
    }
    return this.repo.create(params);
  }
}
