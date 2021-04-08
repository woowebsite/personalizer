import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { ProductBaseTag } from './productBaseTag.model';
import { ProductBase } from './productBase.model';
import { User } from './user.model';

@Table({ timestamps: true })
export class Tag extends Model<Tag> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  status: string;
  
  @Column
  type: string;   // productBase

  // Reference ================================
  // product base
  @ForeignKey(() => ProductBase)
  @Column
  productBaseId: number;

  @BelongsTo(() => ProductBase)
  productBase: ProductBase;

  // product base tags
  @ForeignKey(() => ProductBaseTag)
  @Column
  productBaseTagId: number;

  @BelongsTo(() => ProductBaseTag)
  productBaseTag: ProductBaseTag;
  
  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
