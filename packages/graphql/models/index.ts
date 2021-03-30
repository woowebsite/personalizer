import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../config/env.config';

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
    logging: false,
    storage: ':memory:',
    models: [__dirname + '/*.model.ts'],
    modelMatch: (filename, member) => {
      const tableName = filename.substring(0, filename.indexOf('.model'));
      return tableName === member.toLowerCase();
    },
  },
);
export { User } from './user.model';
export { Role } from './role.model';
export { Album } from './album.model';
export { Filter } from './filter.model';
export { ProductBase } from './productbase.model';
export { ProductBaseImage } from './productbaseimage.model';
export { ProductBaseTag } from './productbasetag.model';
export { Image } from './image.model';
export { Provider } from './provider.model';
