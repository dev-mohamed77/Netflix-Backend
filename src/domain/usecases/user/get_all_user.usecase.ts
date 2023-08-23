import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class GetUsersUseCase implements BaseUseCase<UserEntity[]> {
  constructor(private repo: IUserRepository) {}

  execute(pagination?: PaginationModel): Promise<UserEntity[]> {
    return this.repo.getAll(pagination);
  }
}
