import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users @rest(type: "User", path: "/users",  method: "GET") {
      id
      name
      avatar
      age
    }
  }
`;

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