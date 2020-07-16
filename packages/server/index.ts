import express from 'express';

import nextApp from '@monorepo/client';
import apolloServer from '@monorepo/graphql';

const PORT = process.env.PORT || '3000';

async function main() {
  const app = express();

  await bootstrapApolloServer(app);
  await bootstrapClientApp(app);

  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`[ server ] ready on port ${PORT}`);
  });
}

async function bootstrapClientApp(expressApp) {
  await nextApp.prepare();
  expressApp.get('*', nextApp.getRequestHandler());
}

async function bootstrapApolloServer(expressApp) {
  apolloServer.applyMiddleware({ app: expressApp });
}

main();
