import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ timestamps: true })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @AllowNull(true)
  @Column
  parentId: number;

  @Column
  status: string;

  // Reference ================================

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
