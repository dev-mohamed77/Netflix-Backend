import { IBaseRepository } from 'src/application/core/base/repository.base';
import { UserEntity } from '../entities/user.entity';

export abstract class IAuthRepository extends IBaseRepository<UserEntity> {
  abstract signIn(email: string, password: string): Promise<UserEntity>;
  abstract signUp(email: string, password: string): Promise<UserEntity>;
  abstract forgetPassword(email: string): Promise<string>;
  abstract verifyPassResetCode(resetCode: string): Promise<UserEntity>;
  abstract resetPassword(email: string, password: string): Promise<UserEntity>;
}
