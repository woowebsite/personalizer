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

  @AllowNull(true)
  @Column
  code: string;
  
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
  finishDate?: Date;

  @Default(
    moment()
      .add(3, 'days')
      .toDate(),
  )
  @Column
  dueDate: Date;

  @HasMany(() => JobMeta)
  metadata: JobMeta[];

  @HasMany(() => JobTerm)
  jobTerms: JobTerm[];

  // Reference ================================

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  // metadata
  @Column(DataType.VIRTUAL)
  priority: any;

  @Column(DataType.VIRTUAL)
  link: string;
  
  @Column(DataType.VIRTUAL)
  cost: number;
  
  @Column(DataType.VIRTUAL)
  paid: number;
  
  @Column(DataType.VIRTUAL)
  dept: number;

  @Column(DataType.VIRTUAL)
  isDemoColor: boolean;

  @Column(DataType.VIRTUAL)
  isDemoLayout: boolean;

  @Column(DataType.VIRTUAL)
  employee: any;

  @Column(DataType.VIRTUAL)
  leader: any;
  
  @Column(DataType.VIRTUAL)
  customer: any;

  // taxonomies
  @Column(DataType.VIRTUAL)
  job_status: any;
}
