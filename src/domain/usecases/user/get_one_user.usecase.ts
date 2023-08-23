import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class GetOneUserUseCase implements BaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(params: Partial<UserEntity>): Promise<UserEntity> {
    return this.repo.getOne(params);
  }
}
