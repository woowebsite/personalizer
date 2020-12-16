import { resolver } from 'graphql-sequelize';
import { Company } from '../../models';
import to from 'await-to-js';

export const Query = {
    getCompany: resolver(Company),
    getCompanies: resolver(Company, {
        before: async (findOptions, { where, limit, offset }) => {
            return findOptions
        },
        after: (result) => {
            return result;
        },
    }),
};