import bcrypt from 'bcrypt';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
  BeforeSave,
} from 'sequelize-typescript';
import { ProductBase } from './productBase.model';

// timestamps = false : Use from NextAuth are created_at, updated_at
@Table({ timestamps: true })
export class ProductBaseMeta extends Model<ProductBase> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  key: string;

  @Column
  value: string;

  @Column
  type: string;
  
  @Column
  data: string;
  
  @ForeignKey(() => ProductBase)
  @Column
  productBaseId: number;

  @BelongsTo(() => ProductBase)
  productBase: ProductBase;
}
