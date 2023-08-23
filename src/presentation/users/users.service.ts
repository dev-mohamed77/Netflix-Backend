import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PaginationModel } from 'src/application/core/model/pagination.model';
import {
  passwordHash,
  passwordCompare,
} from 'src/application/core/utilities/password_hash';
import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserUseCase } from 'src/domain/usecases/user/create_user.usecase';
import { DeleteUserUseCase } from 'src/domain/usecases/user/delete_user.usecase';
import { GetUsersUseCase } from 'src/domain/usecases/user/get_all_user.usecase';
import { GetManyUsersUseCase } from 'src/domain/usecases/user/get_many_user.usecase';
import { GetOneUserUseCase } from 'src/domain/usecases/user/get_one_user.usecase';
import { GetUserByIdUseCase } from 'src/domain/usecases/user/get_user_by_id.usecase';
import { UpdateUserUseCase } from 'src/domain/usecases/user/update_user.usecase';

@Injectable()
export class UserService {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private getUsersUseCase: GetUsersUseCase,
    private getManyUserUseCase: GetManyUsersUseCase,
    private getOneUserUseCase: GetOneUserUseCase,
    private getUserByIDUseCase: GetUserByIdUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private jwtService: JwtService,
  ) {}

  createUserService(params: UserEntity) {
    return this.createUserUseCase.execute(params);
  }

  async getUserByIDService(id: string) {
    return this.getUserByIDUseCase.execute(id);
  }

  updateUserService(id: string, params: UserEntity) {
    return this.updateUserUseCase.execute(id, params);
  }

  getUsersService(pagination?: PaginationModel) {
    return this.getUsersUseCase.execute(pagination);
  }

  getManyUserService(params: Partial<UserEntity>) {
    return this.getManyUserUseCase.execute(params);
  }

  getOneUserService(params: Partial<UserEntity>) {
    return this.getOneUserUseCase.execute(params);
  }

  deleteUserByIDService(id: string) {
    return this.deleteUserUseCase.execute(id);
  }

  // ------------------------- Logged User ------------------------

  async changePasswordLoggedUser(
    id: string,
    currentPassword: string,
    password: string,
  ) {
    if (!id) {
      throw new BadRequestException('id is required');
    }
    if (!password || !currentPassword) {
      throw new BadRequestException('password, currentPassword are required');
    }

    const getUser = await this.getUserByIDService(id);

    const comparePassword = await passwordCompare(
      currentPassword,
      getUser.password,
    );

    if (!comparePassword) {
      throw new BadRequestException('The current password is incorrect');
    }

    const hashPassword = await passwordHash(password);

    const user = await this.updateUserService(id, {
      password: hashPassword,
      passwordChangedAt: new Date(Date.now()),
    });

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload, {
      secret: 'Netflix_secret',
    });

    return {
      user,
      token,
    };
  }

  async updateLoggedUserData(
    id: string,
    fullName: string,
    phone: string,
    gender: string,
  ) {
    const user = await this.updateUserService(id, {
      fullName: fullName,
      phone: phone,
      gender: gender,
    });

    return user;
  }

  async deleteLoggedUserData(id: string) {
    const user = await this.deleteUserByIDService(id);

    return user;
  }
}
