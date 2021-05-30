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
import { User } from './user.model';

// timestamps = false : Use from NextAuth are created_at, updated_at
@Table({ timestamps: true })
export class UserMeta extends Model<UserMeta> {
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

  @Column
  status: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
