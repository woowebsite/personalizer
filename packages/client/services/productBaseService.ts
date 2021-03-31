import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

const definitions = {
 
};

const productBaseService = baseService({
  name: 'ProductBase',
  plural: 'ProductBases',
  definitions,
});
export default productBaseService;
