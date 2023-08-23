import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMongooseData } from 'src/application/core/base/mongoose_data.base';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserModel } from '../schema/user.schema';

export class UserRepositoryImp
  extends BaseMongooseData<UserEntity>
  implements IUserRepository
{
  constructor(@InjectModel(UserModel.name) model: Model<UserEntity>) {
    super(model, ['membership']);
  }
}
