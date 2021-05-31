import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { useQuery } from '@apollo/react-hooks';
import createApolloClient from 'apollo/apolloClient';
import { LOGIN, GET_USER } from 'definitions/user-definitions';

import Adapters from 'next-auth/adapters';
import Models from 'models';

const options = {
  site: process.env.VERCEL_URL,
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        const client = createApolloClient({}, undefined);

        try {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // credentials.email = 'wooowebsite@gmail.com';
          // credentials.password = '1';
          const user = await client.query({
            query: LOGIN,
            variables: credentials,
          });

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            const session = user.data.loginUser;
            return Promise.resolve(session);
          } else {
            // If you return null or false then the credentials will be rejected
            return Promise.resolve(null);
            // You can also Reject this callback with an Error or with a URL:
            // return Promise.reject(new Error('error message')) // Redirect to error page
            // return Promise.reject('/path/to/redirect')        // Redirect to a URL
          }
        } catch (error) {
          console.log('error', error.networkError.result.errors);
        }
      },
    }),
    Providers.Email({
      // SMTP connection string or nodemailer configuration object https://nodemailer.com/
      server: process.env.EMAIL_SERVER,
      // Email services often only allow sending email from a valid/verified address
      from: process.env.EMAIL_FROM,
    }),
    // When configuring oAuth providers make sure you enabling requesting
    // permission to get the users email address (required to sign in)
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  adapter: Adapters.TypeORM.Adapter(process.env.DATABASE_URL, {
    models: {
      User: Models.User,
    },
  }),
  // The 'database' option should be a connection string or TypeORM
  // configuration object https://typeorm.io/#/connection-options
  //
  // Notes:
  // * You need to install an appropriate node_module for your database!
  // * The email sign in provider requires a database but OAuth providers do not
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
    // Easily add custom properties to response from `/api/auth/session`.
    // Note: This should not return any sensitive information.
    /*
    get: async (session) => {
      session.customSessionProperty = "ABC123"
      return session
    }
    */
  },
  callbacks: {
    session: async (session, user, sessionToken) => {
      const client = createApolloClient({}, undefined);
      const { data, error, loading }: any = await client.query({
        query: GET_USER,
        variables: { where: { email: user.email } },
      });

      if (data) {
        const loggedUser = data.user;
        session.user = loggedUser;
      } else {
        error.networkError.map(({ message }, i) => console.error(message));
        console.error('Error: The user ' + user.email + 'is not available');
      }
      console.log('session', session);
      return Promise.resolve(session);
    },
    // jwt: async (token, user, account, profile, isNewUser) => {
    //   if (user && user.role) {
    //     token.roleId = user.role.id;
    //   }
    //   return Promise.resolve(token);
    // },
  },
  // JSON Web Token options
  jwt: {
    // secret: 'my-secret-123', // Recommended (but auto-generated if not specified)
    // Custom encode/decode functions for signing + encryption can be specified.
    // if you want to override what is in the JWT or how it is signed.
    // encode: async ({ secret, key, token, maxAge }) => {},
    // decode: async ({ secret, key, token, maxAge }) => {},
    // Easily add custom to the JWT. It is updated every time it is accessed.
    // This is encrypted and signed by default and may contain sensitive information
    // as long as a reasonable secret is defined.
    /*
    set: async (token) => {
      token.customJwtProperty = "ABC123"
      return token
    }
    */
  },

  // Control which users / accounts can sign in
  // You can use this option in conjunction with OAuth and JWT to control which
  // accounts can sign in without having to use a database.
  allowSignin: async (user, account) => {
    // Return true if user / account is allowed to sign in.
    // Return false to display an access denied message.
    return true;
  },

  // You can define custom pages to override the built-in pages
  // The routes shown here are the default URLs that will be used.
  pages: {
    // signin: '/api/auth/signin',  // Displays signin buttons
    // signout: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Additional options
  // secret: 'abcdef123456789' // Recommended (but auto-generated if not specified)
  // debug: true, // Use this option to enable debug messages in the console
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
