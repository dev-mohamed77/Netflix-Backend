import { BaseUseCase } from 'src/application/core/base/usecase.base';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';

export class ForgetPasswordUseCase implements BaseUseCase<string> {
  constructor(private repo: IAuthRepository) {}

  execute(email: string): Promise<string> {
    return this.repo.forgetPassword(email);
  }
}
