import { BaseEntity } from 'src/application/core/base/entity.base';

export class PlanEntity extends BaseEntity {
  title?: string;
  description?: string;
  slug?: string;
  price?: number;
  resolution?: string;
  quality?: string;
  supportedDevices?: string[];

  constructor(partial: Partial<PlanEntity>) {
    super();
    Object.assign(this, partial);
  }
}

// export class PlanEntity extends BaseEntity {
//   title?: string;
//   planType?: string;
//   slug?: string;
//   description?: string;
//   features?: string[];
//   price?: number;
//   offer?: string;
//   support?: string[];

//   constructor(partial: Partial<PlanEntity>) {
//     super();
//     Object.assign(this, partial);
//   }
// }
