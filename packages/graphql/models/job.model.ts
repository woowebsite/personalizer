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

@Table({ timestamps: true })
export class Job extends Model<Job> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: string;
 
  @Column
  primaryImageUrl: string;

  @Column
  visibility: string;

  @Column
  publishDate: Date;

  // Reference ================================
  
  // user
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
