import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
  BelongsToMany,
  Default,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import StatusType from '../constants/StatusType';
import { User } from './user.model';
import { JobMeta } from './jobMeta.model';

@Table({ timestamps: true })
export class Job extends Model<Job> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Default(StatusType.Actived)
  @Column
  status: string;

  @Column
  primaryImageUrl: string;

  @Column
  visibility: string;

  @Column(DataType.VIRTUAL)
  link: string;

  @Column
  dueDate: Date;

  @HasMany(() => JobMeta)
  metadata: JobMeta[];

  // Reference ================================

  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
