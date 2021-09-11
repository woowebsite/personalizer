import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ timestamps: true })
export class Option extends Model<Option> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  key: string;

  @Column
  type: string;

  @Column
  value: string;

  @Column
  data: string;
}
