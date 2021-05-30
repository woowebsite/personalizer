import { resolver } from 'graphql-sequelize';
import { TermTaxonomy, User, UserTerm } from '../../models';
import to from 'await-to-js';
import { UserMeta } from '../../models/userMeta.model';

export const Mutation = {
  createUser: resolver(User, {
    before: async (findOptions, { data }) => {
      let err, user;
      [err, user] = await to(User.create(data));
      if (err) {
        throw err;
      }
      findOptions.where = { id: user.id };
      return findOptions;
    },
    after: user => {
      return user;
    },
  }),

  upsertUser: resolver(User, {
    before: async (findOptions, { data, metadata, taxonomies }) => {
      const [user, created0] = await User.upsert(data, { returning: true });

      // Metadata
      if (user && metadata) {
        const userMeta = metadata.map(x => ({
          ...x,
          user_id: user.id,
        }));

        await UserMeta.destroy({
          where: { user_id: user.id },
        });
        await UserMeta.bulkCreate(userMeta);
      }

      // Taxonomies is object
      if (user && taxonomies) {
        const allTaxonomies = await TermTaxonomy.findAll({ raw: true });
        let userTerms = [];
        for (const key in taxonomies) {
          const taxonomy = allTaxonomies.find(x => x.taxonomy === key);
          userTerms.push({
            term_taxonomy_id: taxonomy.id,
            user_id: user.id,
            money: taxonomies[key],
            status: 'A',
          });
        }

        await UserTerm.bulkCreate(userTerms);
      }

      findOptions.where = { id: user.id };
      return findOptions;
    },
    after: user => {
      user.login = true;
      return user;
    },
  }),

  changePassword: resolver(User, {
    before: (users, { currentPassword, password }, ctx) => {
      const { currentUser } = ctx;
      return User.findOne({ where: { id: currentUser.id } });
    },
    after: async (authUser, { currentPassword, password }) => {
      try {
        // first change password
        if (!authUser.password) {
          authUser.update({ password });
          return { result: true };
        }
        // change password
        else {
          const [a, user] = await to(authUser.comparePassword(currentPassword));
          if (user) {
            authUser.update({ password });
            return { result: true };
          } else {
            return { result: false };
          }
        }
      } catch (error) {
        console.log('Sequelize error: ', error);
      }
    },
  }),
};
