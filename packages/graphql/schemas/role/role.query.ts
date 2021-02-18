import { resolver } from 'graphql-sequelize';
import { Role } from '../../models';
import to from 'await-to-js';

export const Query = {
    role: resolver(Role),
    roles: resolver(Role, {
        before: async (findOptions, { where, limit, offset }) => {
            return findOptions
        },
        after: (result) => {
            return result;
        },
    }),
};