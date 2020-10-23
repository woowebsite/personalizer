import gql from "graphql-tag";

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