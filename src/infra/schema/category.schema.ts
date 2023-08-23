import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEntity } from 'src/domain/entities/categories.entity';

@Schema()
export class CategoryModel {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({ type: String, required: true })
  slug: string;
}

export const CategorySchema =
  SchemaFactory.createForClass<CategoryEntity>(CategoryModel);
