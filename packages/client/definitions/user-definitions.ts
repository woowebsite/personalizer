import { gql } from '@apollo/client';

export const GET_REST_USERS = gql`
  query ApiUsers {
    users @rest(type: "User", path: "/users",  method: "GET") {
      id
      name
      avatar
      age
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      image
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String, $image: String, $email: String) {
    createUser(data: {name: $name, image: $image, email: $email}) {
      name
      image
      email
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