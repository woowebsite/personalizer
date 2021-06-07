import { DocumentNode } from 'apollo-link';

export const gql2String = (gql: DocumentNode): string => {
  if (!gql) return '';
  return gql.loc && gql.loc.source.body;
};
