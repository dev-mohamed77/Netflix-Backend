import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForgetPasswordUseCase } from 'src/domain/usecases/auth/forget_password.auth';
import { ResetPasswordUseCase } from 'src/domain/usecases/auth/reset_password.auth';
import { SignInUseCase } from 'src/domain/usecases/auth/signin.auth';
import { SignUpUseCase } from 'src/domain/usecases/auth/signup.auth';
import { VerifyPassResetCodeUseCase } from 'src/domain/usecases/auth/verify_pass_reset_code.auth';

@Injectable()
export class AuthService {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private forgetPasswordUseCase: ForgetPasswordUseCase,
    private verifyPassResetCodeUseCase: VerifyPassResetCodeUseCase,
    private jwtService: JwtService,
  ) {}

  async signInService(email: string, password: string) {
    const user = await this.signInUseCase.execute(email, password);

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload, {
      secret: 'Netflix_secret',
    });

    return { user, token };
  }

  signUpService(email: string, password: string) {
    return this.signUpUseCase.execute(email, password);
  }

  forgetPasswordService(email: string) {
    return this.forgetPasswordUseCase.execute(email);
  }

  verifyPassResetCodeService(resetCode: string) {
    return this.verifyPassResetCodeUseCase.execute(resetCode);
  }

  async resetPasswordService(email: string, password: string) {
    const user = await this.resetPasswordUseCase.execute(email, password);

    if (!user) {
      throw new BadRequestException('User not Exist');
    }
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload, {
      secret: 'Netflix_secret',
    });

    return { user, token };
  }
}
