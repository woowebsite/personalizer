import express from 'express';
import bodyParser from 'body-parser';
import nextFrontPage from '@monorepo/frontpage';
import nextApp from '@monorepo/admin';
import apolloServer from '@monorepo/graphql';

const PORT = process.env.PORT || '3001';

async function main() {
  const app = express();

  await bootstrapApolloServer(app);
  await bootstrapAdminApp(app);
  await bootstrapFrontPage(app);

  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`[ server ] ready on port ${PORT}`);
  });
}

async function bootstrapFrontPage(expressApp) {
  await nextFrontPage.prepare();
  expressApp.all('*', nextFrontPage.getRequestHandler());
}
async function bootstrapAdminApp(expressApp) {
  await nextApp.prepare();
  expressApp.all('/admin/*', nextApp.getRequestHandler());
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
