import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepositoryImp } from 'src/infra/repositories/auth.repository.imp';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';
import { SignInUseCase } from 'src/domain/usecases/auth/signin.auth';
import { SignUpUseCase } from 'src/domain/usecases/auth/signup.auth';
import { ForgetPasswordUseCase } from 'src/domain/usecases/auth/forget_password.auth';
import { VerifyPassResetCodeUseCase } from 'src/domain/usecases/auth/verify_pass_reset_code.auth';
import { ResetPasswordUseCase } from 'src/domain/usecases/auth/reset_password.auth';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/infra/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './role.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'Netflix_secret',
      signOptions: { expiresIn: '7d' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RoleGuard,
    {
      provide: AuthRepositoryImp,
      useClass: AuthRepositoryImp,
    },
    {
      provide: SignInUseCase,
      useFactory(repo: IAuthRepository) {
        return new SignInUseCase(repo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: SignUpUseCase,
      useFactory(repo: IAuthRepository) {
        return new SignUpUseCase(repo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: ForgetPasswordUseCase,
      useFactory(repo: IAuthRepository) {
        return new ForgetPasswordUseCase(repo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: VerifyPassResetCodeUseCase,
      useFactory(repo: IAuthRepository) {
        return new VerifyPassResetCodeUseCase(repo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: ResetPasswordUseCase,
      useFactory(repo: IAuthRepository) {
        return new ResetPasswordUseCase(repo);
      },
      inject: [AuthRepositoryImp],
    },
  ],
})
export class AuthModule {}
