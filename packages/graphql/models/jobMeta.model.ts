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
import { Job } from './job.model';

// timestamps = false : Use from NextAuth are created_at, updated_at
@Table({ timestamps: true })
export class JobMeta extends Model<JobMeta> {
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
  
  @ForeignKey(() => Job)
  @Column
  job_id: number;

  @BelongsTo(() => Job)
  job: Job;
}
