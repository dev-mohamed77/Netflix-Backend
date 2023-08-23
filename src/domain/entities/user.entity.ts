import { BaseEntity } from 'src/application/core/base/entity.base';
import * as mongoose from 'mongoose';

export class UserEntity extends BaseEntity {
  fullName?: string;
  email?: string;
  password?: string;
  slug?: string;
  phone?: string;
  gender?: string;
  role?: string;
  membership?: mongoose.Schema.Types.ObjectId; // One to Many
  membershipStartDate?: number;
  membershipEndDate?: number;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: number;
  passwordResetVerified?: boolean;
  created_at?: Date;
  updated_at?: Date;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
