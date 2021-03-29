import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Category } from './category.model';
import { Tag } from './tag.model';
import { ProductBaseTag } from './productBaseTag.model';

@Table({ timestamps: true })
export class ProductBase extends Model<ProductBase> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column({ unique: true })
  description: string;

  @Column
  status: string;

  @Column
  visibility: string;

  @Column
  publishDate: Date;

  // Reference ================================

  // category
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  // tag
  @BelongsToMany(() => ProductBaseTag, () => Tag)
  tags: ProductBaseTag[];

  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
