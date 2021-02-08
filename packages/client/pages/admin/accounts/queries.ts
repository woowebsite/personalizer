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