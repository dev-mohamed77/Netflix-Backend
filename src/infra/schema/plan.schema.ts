import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEntity } from 'src/domain/entities/categories.entity';
import { PlanEntity } from 'src/domain/entities/plan.entity';

@Schema()
export class PlanModel {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({ type: String })
  slug: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String })
  resolution: string;

  @Prop({ type: String })
  quality: string;

  @Prop({ type: Array<String> })
  supportedDevices: string[];
}

export const PlanSchema = SchemaFactory.createForClass<PlanEntity>(PlanModel);
