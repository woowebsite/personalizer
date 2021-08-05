import bcrypt from 'bcrypt';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
  BeforeSave,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { Role } from './role.model';
import to from 'await-to-js';
import { UserMeta } from './userMeta.model';

// timestamps = false : Use from NextAuth are created_at, updated_at
@Table({ timestamps: false, tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  password: string;

  @AllowNull(false)
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

  @Column
  status: string;

  // foreign
  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => UserMeta)
  metadata: UserMeta[];

  // CUSTOMER's metadata
  @Column(DataType.VIRTUAL)
  account_money: number;
  
  @Column(DataType.VIRTUAL)
  account_holding: number;
  
  @Column(DataType.VIRTUAL)
  account_dept: number;

  @Column(DataType.VIRTUAL)
  phone: String;

  @Column(DataType.VIRTUAL)
  address: String;

  @Column(DataType.VIRTUAL)
  customerType: number;

  @Column(DataType.VIRTUAL)
  facebookUrl: String;

  // METHOD
  @BeforeSave
  static async hashPassword(user: User) {
    let err;
    if (user.changed('password')) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) {
        throw err;
      }

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) {
        throw err;
      }
      user.password = hash;
    }
  }

  public get havePassword(): Boolean {
    return this.password ? true : false;
  }

  async comparePassword(pw) {
    let err, pass;
    if (!this.password) {
      throw new Error('Does not have password');
    }

    [err, pass] = await to(bcrypt.compare(pw, this.password));
    if (err) {
      throw err;
    }

    if (!pass) {
      throw 'Invalid password';
    }

    return this;
  }

  // getJwt() {
  //   return (
  //     'Bearer ' +
  //     jsonwebtoken.sign(
  //       {
  //         id: this.id,
  //       },
  //       ENV.JWT_ENCRYPTION,
  //       { expiresIn: ENV.JWT_EXPIRATION },
  //     )
  //   );
  // }
}
