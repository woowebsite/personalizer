import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../config/env.config';

export const sequelize = new Sequelize({
  host: ENV.DB_HOST,
  database: ENV.DB_NAME,
  port: +ENV.DB_PORT,
  dialect: ENV.DB_DIALECT,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  operatorsAliases: false,
  define: {
    freezeTableName: false, // Make plural database table
  },
  logging: false,
  storage: ':memory:',
  modelPaths: [__dirname + '/*.model.ts'],
  modelMatch: (filename, member) => {
    const tableName = filename.substring(0, filename.indexOf('.model'));
    return tableName === member.toLowerCase();
  },
});
export { User } from './user.model';
export { Role } from './role.model';
export { Album } from './album.model';
