import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';
import { ProductBase } from './productBase.model';

@Table({ timestamps: true })
export class Image extends Model<Image> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  url: string;

  // Foreign ========================================
  // product base
  @ForeignKey(() => ProductBase)
  @Column
  productBaseId: number;

  @BelongsTo(() => ProductBase)
  productBase: ProductBase;

  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
