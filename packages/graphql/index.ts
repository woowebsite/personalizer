import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import { sequelize, User } from './models';
import { ENV } from './config';
import { getSession } from 'next-auth/client';

import { resolver as resolvers, schema, schemaDirectives } from './schemas';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import to from 'await-to-js';
import { cookieToObj } from './utils/cookieUtil';

const secret = process.env.SECRET;
// const app = express();

// const authMiddleware = jwt({
//   secret: ENV.JWT_ENCRYPTION,
//   credentialsRequired: false,
// });
// app.use(authMiddleware);

// app.use(function (err, req, res, next) {
//   const errorObject = { error: true, message: `${err.name}: ${err.message}` };
//   if (err.name === 'UnauthorizedError') {
//     return res.status(401).json(errorObject);
//   } else {
//     return res.status(400).json(errorObject);
//   }
// });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  schemaDirectives,
  playground: true,
  context: async ({ req }) => {
    const session = await getSession({ req });
    let currentUser;
    if (session && session.user) {
      currentUser = await User.findOne({
        where: { email: session.user.email },
      })
        .then(x => x.get({ plain: true }))
        .catch(e => console.log('Error: ', e));
    }

 // Sync database
    // {force: true} remove all data
    // {alter: true} modify table and keep data
    sequelize.sync({ alter: false });

    return {
      [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
      currentUser,
    };
  },
});

export default server;
