import { resolver } from 'graphql-sequelize';
import { Role } from '../../models';
import to from 'await-to-js';

export const Query = {
    getRole: resolver(Role),
    getRoles: resolver(Role, {
        before: async (findOptions, { where, limit, offset }) => {
            return findOptions
        },
        after: (result) => {
            return result;
        },
    }),
};