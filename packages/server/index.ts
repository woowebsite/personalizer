import express from 'express';
import bodyParser from 'body-parser';
import nextApp from '@monorepo/client';
import apolloServer from '@monorepo/graphql';

const PORT = process.env.PORT || '3001';

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
  expressApp.all('*', nextApp.getRequestHandler());
}

async function bootstrapApolloServer(expressApp) {
  apolloServer.applyMiddleware({
    app: expressApp,
    bodyParserConfig: {
      limit: '2mb',
    },
  });
}

main();
