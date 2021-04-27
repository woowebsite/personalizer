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
  Sequelize,
} from 'sequelize-typescript';
import StatusType from '../constants/StatusType';
import { User } from './user.model';
import { JobMeta } from './jobMeta.model';
import { JobTerm } from './jobTerm.model';
import moment from 'moment';

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

  @Default(moment().toDate())
  @Column
  publishDate: Date;

  @Column
  dueDate: Date;

  @HasMany(() => JobMeta)
  metadata: JobMeta[];

  @HasMany(() => JobTerm)
  jobTerms: JobTerm[];

  // Reference ================================

  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  // Virtual fields
  @Column(DataType.VIRTUAL)
  link: string;

  @Column(DataType.VIRTUAL)
  job_priority: any;
  
  
  @Column(DataType.VIRTUAL)
  job_status: any;
}
