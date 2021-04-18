import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ timestamps: false, tableName: 'accounts' })
export class Account extends Model<Account> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  compound_id: string;

  @Column
  provider_type: string;

  @Column
  provider_id: string;

  @Column
  provider_account_id: string;

  @Column
  refresh_token: string;

  @Column
  access_token: string;

  @Column
  access_token_expires: Date;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  // foreign models
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
