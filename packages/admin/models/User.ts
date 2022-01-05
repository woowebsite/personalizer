import Adapters, { TypeORMUserModel } from 'next-auth/adapters';
import RoleType from './RoleType';
import StatusType from './StatusType';

// Extend the built-in models using class inheritance
export default class User extends TypeORMUserModel {
  roleId: number;
  status: string;
  password: string;
  
  constructor(name, email, image, emailVerified, roleId, password, status) {
    super(name, email, image, emailVerified);
    if (roleId) this.roleId = roleId;
    if (status) this.status = status;
    if (password) this.password = password;
  }
}

export const UserSchema = {
  name: 'User',
  target: typeof TypeORMUserModel,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    roleId: {
      type: 'int',
      nullable: true,
      default: RoleType.Developer,
    },
    password: {
      type: 'varchar',
      nullable: true,
    },
    status: {
      type: 'varchar',
      nullable: true,
      default: StatusType.Actived,
    },
  },
};
