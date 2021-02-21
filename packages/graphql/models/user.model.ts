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

  @Column
  password: string;

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
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  // @BeforeSave
  // static async hashPassword(user: User) {
  //   let err;
  //   if (user.changed('password')) {
  //     let salt, hash;
  //     [err, salt] = await to(bcrypt.genSalt(10));
  //     if (err) {
  //       throw err;
  //     }

  //     [err, hash] = await to(bcrypt.hash(user.password, salt));
  //     if (err) {
  //       throw err;
  //     }
  //     user.password = hash;
  //   }
  // }

  // async comparePassword(pw) {
  //   let err, pass;
  //   if (!this.password) {
  //     throw new Error('Does not have password');
  //   }

  //   [err, pass] = await to(bcrypt.compare(pw, this.password));
  //   if (err) {
  //     throw err;
  //   }

  //   if (!pass) {
  //     throw 'Invalid password';
  //   }

  //   return this;
  // }

  // getJwt() {
  //   return (
  //     'Bearer ' +
  //     jsonwebtoken.sign(
  //       {
  //         id: this.id,
  //       },
  //       ENV.JWT_ENCRYPTION,
  //       { expiresIn: ENV.JWT_EXPIRATION }
  //     )
  //   );
  // }
}
