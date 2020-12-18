import { gql } from '@apollo/client';

export const LOGIN = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password ) {
      id
      name
      email
      company {
        id
        name
      }
    }
  }
`;