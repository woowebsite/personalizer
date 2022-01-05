import next from 'next';

const nextFrontPage = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: __dirname,
});

export default nextFrontPage;
