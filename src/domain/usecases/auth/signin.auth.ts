import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';

export class SignInUseCase implements BaseUseCase<UserEntity> {
  constructor(private repo: IAuthRepository) {}
  execute(email: string, password: string): Promise<UserEntity> {
    return this.repo.signIn(email, password);
  }
}
