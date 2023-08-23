import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/infra/schema/user.schema';
import { UserRepositoryImp } from 'src/infra/repositories/user.repositoy.imp';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { CreateUserUseCase } from 'src/domain/usecases/user/create_user.usecase';
import { GetUsersUseCase } from 'src/domain/usecases/user/get_all_user.usecase';
import { GetManyUsersUseCase } from 'src/domain/usecases/user/get_many_user.usecase';
import { GetUserByIdUseCase } from 'src/domain/usecases/user/get_user_by_id.usecase';
import { GetOneUserUseCase } from 'src/domain/usecases/user/get_one_user.usecase';
import { UpdateUserUseCase } from 'src/domain/usecases/user/update_user.usecase';
import { DeleteUserUseCase } from 'src/domain/usecases/user/delete_user.usecase';
import { UserService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: UserRepositoryImp,
      useClass: UserRepositoryImp,
    },

    {
      provide: CreateUserUseCase,
      useFactory(repo: IUserRepository) {
        return new CreateUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetUsersUseCase,
      useFactory(repo: IUserRepository) {
        return new GetUsersUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetManyUsersUseCase,
      useFactory(repo: IUserRepository) {
        return new GetManyUsersUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory(repo: IUserRepository) {
        return new GetUserByIdUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetOneUserUseCase,
      useFactory(repo: IUserRepository) {
        return new GetOneUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: UpdateUserUseCase,
      useFactory(repo: IUserRepository) {
        return new UpdateUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: DeleteUserUseCase,
      useFactory(repo: IUserRepository) {
        return new DeleteUserUseCase(repo);
      },
      inject: [UserRepositoryImp],
    },
  ],
})
export class UsersModule {}
