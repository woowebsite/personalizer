import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import baseQuery from './baseQuery';

export const optionBaseQuery = baseQuery({
  name: 'Option',
  plural: 'Options',
});

export const optionQuery = {
  upsertOption: gql`
    mutation UpsertOption(
      $data: [OptionInput]
      $metadata: [OptionMetaInput]
      $taxonomies: [Int] = []
    ) {
      upsertOption(
        data: $data
        metadata: $metadata
        taxonomies: $taxonomies
      ) {
        id
        key
        type
        value
        data
      }
    }
  `,
};

const definitions = {
  upsertOption: options => {
    return withMutation(optionQuery.upsertOption, options);
  },
};

const optionService = baseService({
  name: 'Option',
  plural: 'Options',
  definitions,
});
export default optionService;
