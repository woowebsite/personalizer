import { Sequelize} from 'sequelize-typescript';
import { ENV } from '../config/env.config';
import camelCase from 'lodash/camelCase';

export const sequelize = new Sequelize(
  ENV.DB_NAME,
  ENV.DB_USER,
  ENV.DB_PASSWORD,
  {
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    port: +ENV.DB_PORT,
    dialect: 'mysql',
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    define: {
      freezeTableName: false, // Make plural database table
    },
    // logging: console.log,      // log SQL query
    logging: false,
    storage: ':memory:',
    models: [__dirname + '/*.model.ts'],
    modelMatch: (filename, member) => {
      const tableName = filename.substring(0, filename.indexOf('.model'));
      return (
        tableName === member.toLowerCase() || tableName === camelCase(member)
      );
    },
  },
);
export { User } from './user.model';
export { UserMeta } from './userMeta.model';
export { UserTerm } from './userTerm.model';
export { Permission } from './permission.model';
export { Account } from './account.model';
export { Role } from './role.model';
export { Album } from './album.model';
export { Filter } from './filter.model';
export { Job } from './job.model';
export { JobMeta } from './jobMeta.model';
export { JobTerm } from './jobTerm.model';
export { TermTaxonomy } from './termTaxonomy.model';
export { Option } from './option.model';
