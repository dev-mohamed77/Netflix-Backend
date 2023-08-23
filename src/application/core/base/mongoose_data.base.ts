import { Model, PopulateOptions } from 'mongoose';
import { BaseEntity } from './entity.base';
import { IBaseRepository } from './repository.base';
import { BadRequestException } from '@nestjs/common';
import { PaginationModel } from '../model/pagination.model';

export class BaseMongooseData<T extends BaseEntity> extends IBaseRepository<T> {
  constructor(public model: Model<T>, public populate?: string | string[]) {
    super();
  }

  async create(params: T): Promise<T> {
    const result = new this.model(params);

    await result.populate(this.populate);

    return result.save();
  }

  async update(id: string, params: Partial<T>): Promise<T> {
    const result = (
      await this.model.findByIdAndUpdate(id, params, { new: true })
    ).populate(this.populate);
    if (!result) {
      throw new BadRequestException(`${id} is not exist`);
    } else {
      return result;
    }
  }

  async getByID(id: string): Promise<T> {
    const result = await this.model.findById(id);
    if (!result) {
      throw new BadRequestException(`this is ${id} not exist`);
    }
    return result.populate(this.populate);
  }

  getAll(pagination?: PaginationModel): Promise<T[]> {
    const page = (Math.abs(pagination.page) || 1) - 1;
    const limit = Math.abs(pagination.limit) || 10;

    return this.model
      .find()
      .limit(limit)
      .skip(limit * page)
      .populate(this.populate);
  }

  async getOne(filter: Partial<T>): Promise<T> {
    const result = await this.model.findOne(filter);

    return result;
  }

  getMany(filter: Partial<T>, pagination?: PaginationModel): Promise<T[]> {
    const page = (Math.abs(pagination.page) || 1) - 1;
    const limit = Math.abs(pagination.limit) || 10;

    return this.model
      .find(filter)
      .limit(limit)
      .skip(limit * page)
      .populate(this.populate);
  }

  async delete(id: string): Promise<T> {
    const result = await this.model.findByIdAndDelete(id);

    if (!result) {
      throw new BadRequestException(`this is ${id} not exist`);
    }
    return result.populate(this.populate);
  }

  async deleteOne(filter: Partial<T>) {
    const result = await this.model.deleteOne(filter).populate(this.populate);

    if (!result) {
      throw new BadRequestException(`this is ${filter} not exist`);
    }
    return result;
  }
}
