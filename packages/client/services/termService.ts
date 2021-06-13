import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

const definitions = {};

const termService = baseService({
  name: 'Term',
  plural: 'Terms',
  definitions,
});
export default termService;
