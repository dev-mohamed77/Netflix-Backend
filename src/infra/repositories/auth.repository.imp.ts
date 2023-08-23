import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongooseData } from 'src/application/core/base/mongoose_data.base';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';
import { UserModel } from '../schema/user.schema';
import { Model } from 'mongoose';
import {
  passwordCompare,
  passwordHash,
} from 'src/application/core/utilities/password_hash';
import * as crypto from 'crypto';

export class AuthRepositoryImp
  extends BaseMongooseData<UserEntity>
  implements IAuthRepository
{
  constructor(@InjectModel(UserModel.name) model: Model<UserEntity>) {
    super(model);
  }

  async signIn(email: string, password: string): Promise<UserEntity> {
    if (!email || !password) {
      throw new BadRequestException(`email and password are required`);
    }
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new BadRequestException(`Email not exist`);
    }
    const pass = await passwordCompare(password, user.password);
    if (!pass) {
      throw new BadRequestException(`password not found`);
    }

    return user.populate(['membership']);
  }

  async signUp(email: string, password: string): Promise<UserEntity> {
    if (!email || !password) {
      throw new BadRequestException(`email and password are required`);
    }

    const isEmailExist = await this.model.findOne({ email });

    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const hash = await passwordHash(password);

    const result = await this.model.create({ email: email, password: hash });

    return result.populate(['membership']);
  }

  async forgetPassword(email: string): Promise<string> {
    const user = await this.model.findOne({ email }).populate(['membership']);
    if (!user) {
      throw new BadRequestException(
        `There is no user with that email ${email}`,
      );
    }

    const resetCode = Math.floor(10000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    user.passwordResetVerified = false;

    await user.save();

    const message = `Hi ${user.fullName},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The pixel store Team`;

    console.log(message);

    return message;
  }

  async verifyPassResetCode(resetCode: string): Promise<UserEntity> {
    if (!resetCode) {
      throw new BadRequestException('resetCode required');
    }

    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    const user = await this.model.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestException('Reset code invalid or expired');
    }

    user.passwordResetVerified = true;

    await user.save();

    return user.populate(['membership']);
  }

  async resetPassword(email: string, password: string): Promise<UserEntity> {
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.model.findOne({ email });
    if (!user) {
      throw new BadRequestException(`There is no user with email ${email}`);
    }

    if (!user.passwordResetVerified) {
      throw new BadRequestException(`Reset code not verified`);
    }

    const hashPassword = await passwordHash(password);

    user.password = hashPassword;
    user.passwordResetCode = null;
    user.passwordResetExpires = null;
    user.passwordResetVerified = null;

    await user.save();

    return user.populate(['membership']);
  }
}
