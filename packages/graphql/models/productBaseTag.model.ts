import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { ProductBase } from './productBase.model';
import { Tag } from './tag.model';

@Table({ timestamps: true })
export class ProductBaseTag extends Model<ProductBaseTag> {
  @ForeignKey(() => ProductBase)
  @Column
  productBaseId: number;
  
  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}
