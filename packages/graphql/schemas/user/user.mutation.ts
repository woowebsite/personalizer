import { resolver } from 'graphql-sequelize';
import { TermTaxonomy, User, UserTerm } from '../../models';
import to from 'await-to-js';
import { UserMeta } from '../../models/userMeta.model';
import StatusType from '../../constants/StatusType';
import UserMetaType from '../../constants/UserMetaType';
import TaxonomyType from '../../constants/TaxonomyType';
import { metadataToField } from '../../utils/dataUtil';
import { upsertMetadata } from './user.utils';

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
        const oldUserMeta = await UserMeta.findAll({
          where: { user_id: user.id },
          raw: true,
        });
        upsertMetadata(metadata, oldUserMeta, user.id);
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
            status: StatusType.Actived,
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

  accountTransactionMoney: resolver(User, {
    before: async (findOptions, { data, taxonomies }) => {
      // Taxonomies is object
      let action = '';
      let money = 0;
      if (data && taxonomies) {
        // 1. get taxonomy id by action
        action = Object.keys(taxonomies)[0];
        const allTaxonomies = await TermTaxonomy.findAll({ raw: true });
        const taxonomy = allTaxonomies.find(x => x.taxonomy === action);

        // 2. get money of action: - if withdraw, holding, + if deposit, earning
        money = parseInt(taxonomies[action]);

        switch (action) {
          case (TaxonomyType.Account_Withdraw, TaxonomyType.Account_Hoding):
            money = -money;
            break;
        }

        // 3. add UserTerm
        const userTerm: any = {
          term_taxonomy_id: taxonomy.id,
          user_id: data.id,
          money: money,
          status: StatusType.Actived,
        };

        await UserTerm.create(userTerm);

        // 4. update account_money to metadata to use directly in session.user
        const accountMoneyMetadata = await UserMeta.findOne({
          where: {
            user_id: data.id,
            key: UserMetaType.AccountMoney,
          },
          raw: true,
        });
        const prevMoney = accountMoneyMetadata ? accountMoneyMetadata.value : 0;
        const userMeta: any = {
          ...accountMoneyMetadata,
          key: UserMetaType.AccountMoney,
          type: 'number',
          data: +prevMoney + money,
          value: +prevMoney + money,
          status: StatusType.Actived,
          user_id: data.id,
        };

        await UserMeta.upsert(userMeta);
      }

      findOptions.where = { id: data.id };
      findOptions.include = [{ model: UserMeta }];
      return findOptions;
    },
    after: async user => {
      const transferData = metadataToField(user, 'metadata');
      return transferData;
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
