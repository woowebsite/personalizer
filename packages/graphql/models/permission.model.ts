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
import { Role } from './role.model';
import { User } from './user.model';

// timestamps = false : Use from NextAuth are created_at, updated_at
@Table({ timestamps: true })
export class Permission extends Model<Permission> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  type: string; // User, Role

  @Column
  featureName: string; // Customer, User, Job

  @Column
  code: number; // Bit field technology

  @Column
  status: string; // A, D

  @ForeignKey(() => Role)
  @Column
  refId: number; //RoleId

  @BelongsTo(() => Role)
  role: Role;
}
