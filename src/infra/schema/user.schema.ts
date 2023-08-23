import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from 'src/application/config/gender';
import { Role } from 'src/application/config/roles';
import { UserEntity } from 'src/domain/entities/user.entity';
import { PlanModel, PlanSchema } from './plan.schema';
import * as mongoose from 'mongoose';
import { Exclude, Type } from 'class-transformer';

@Schema()
export class UserModel {
  @Prop({ type: String })
  fullName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, minlength: 6 })
  @Exclude()
  password: string;

  @Prop({ type: String, lowercase: true, trim: true })
  slug: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String, enum: [Gender.male, Gender.female] })
  gender: Gender;

  @Prop({ type: String, enum: Role, default: Role.user })
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: PlanModel.name })
  @Type(() => PlanModel)
  membership: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date })
  membershipStartDate: number;

  @Prop({ type: Date })
  membershipEndDate: number;

  @Prop({ type: Date })
  passwordChangedAt: Date;

  @Prop({ type: String })
  passwordResetCode: string;

  @Prop({ type: Number })
  passwordResetExpires: number;

  @Prop({ type: Boolean })
  passwordResetVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass<UserEntity>(UserModel);
