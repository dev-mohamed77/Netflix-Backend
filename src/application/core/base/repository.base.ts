import { PaginationModel } from '../model/pagination.model';
import { BaseEntity } from './entity.base';

export abstract class IBaseRepository<T extends BaseEntity> {
  abstract create(params: T): Promise<T>;
  abstract update(id: string, params: Partial<T>): Promise<T>;
  abstract getByID(id: string): Promise<T>;
  abstract getAll(pagination?: PaginationModel): Promise<T[]>;
  abstract getOne(filter: Partial<T>): Promise<T | null>;
  abstract getMany(
    filter?: Partial<T>,
    pagination?: PaginationModel,
  ): Promise<T[]>;
  abstract delete(id: string): Promise<T>;
  abstract deleteOne(filter: Partial<T>);
}
