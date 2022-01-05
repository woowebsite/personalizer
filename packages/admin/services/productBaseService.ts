import { gql } from '@apollo/client';
import baseService from './baseService';
import baseQuery from './baseQuery';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

const definitions = {};
export const productBaseQuery = baseQuery({
  name: 'ProductBase',
  plural: 'ProductBases',
});

const productBaseService = baseService({
  name: 'ProductBase',
  plural: 'ProductBases',
  definitions,
});
export default productBaseService;
