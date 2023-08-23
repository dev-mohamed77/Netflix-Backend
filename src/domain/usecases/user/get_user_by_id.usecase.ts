import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class GetUserByIdUseCase implements BaseUseCase<UserEntity> {
  constructor(private repo: IUserRepository) {}

  execute(id: string): Promise<UserEntity> {
    return this.repo.getByID(id);
  }
}
