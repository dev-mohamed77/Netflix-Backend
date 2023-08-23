import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthDto,
  ForgetPasswordDto,
  VerifyPassResetCodeDto,
} from 'src/domain/dto/auth.dto';
import { EndPoint } from 'src/application/config/endpoint';

@Controller(EndPoint.auth)
export class AuthController {
  constructor(
    private authService: AuthService, // private jwtService: JwtService,
  ) {}

  @Post(EndPoint.signin)
  async signInController(@Body(ValidationPipe) authDto: AuthDto) {
    const result = await this.authService.signInService(
      authDto.email,
      authDto.password,
    );

    return {
      status: true,
      result: result,
    };
  }

  @Post(EndPoint.signup)
  async signUpController(@Body(ValidationPipe) authDto: AuthDto) {
    const result = await this.authService.signUpService(
      authDto.email,
      authDto.password,
    );

    return {
      status: true,
      result: result,
    };
  }

  @Post(EndPoint.forgetPassword)
  async forgetPasswordController(
    @Body(ValidationPipe) forgetPasswordDto: ForgetPasswordDto,
  ) {
    const result = await this.authService.forgetPasswordService(
      forgetPasswordDto.email,
    );

    return {
      status: true,
      result: result,
    };
  }

  @Post(EndPoint.verifyPassResetCode)
  async verifyPassResetCodeController(
    @Body(ValidationPipe) verifyPassResetCodeDto: VerifyPassResetCodeDto,
  ) {
    await this.authService.verifyPassResetCodeService(
      verifyPassResetCodeDto.resetCode,
    );

    return {
      status: true,
      result: 'Success',
    };
  }

  @Put(EndPoint.resetPassword)
  async resetPasswordController(@Body(ValidationPipe) authDto: AuthDto) {
    const result = await this.authService.resetPasswordService(
      authDto.email,
      authDto.password,
    );

    return {
      status: true,
      result: result,
    };
  }
}
