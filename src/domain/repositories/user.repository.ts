import { IBaseRepository } from 'src/application/core/base/repository.base';
import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository extends IBaseRepository<UserEntity> {}
