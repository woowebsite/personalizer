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
export class Filter extends Model<Filter> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column({ unique: true })
  conditions: string;

  @Column
  model_name: string;

  @Column
  status: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

}
