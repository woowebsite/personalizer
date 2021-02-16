import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './role.model';

// timestamps = false : Use from NextAuth are created_at, updated_at
@Table({ timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column
  email_verified: Date;

  @Column
  image: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
