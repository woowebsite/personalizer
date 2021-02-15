import { Table, Column, Model } from 'sequelize-typescript';

@Table({ timestamps: true })
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
}
