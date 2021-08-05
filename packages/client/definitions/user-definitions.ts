import { gql } from '@apollo/client';

export const GET_REST_USERS = gql`
  query ApiUsers {
    users @rest(type: "User", path: "/users", method: "GET") {
      id
      name
      avatar
      age
    }
  }
`;
export const GET_USERS = gql`
  query GetAllUsers($where: UserWhere) {
    users(where: $where) {
      rows {
        id
        name
        image
        email
        created_at
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($where: UserWhere) {
    user(where: $where) {
      id
      name
      image
      email
      status
      role {
        id
        permissions {
          featureName
          code
        }
      }
      metadata {
        key
        type
        value
      }
      havePassword
      account_money
      account_holding
      account_dept
      phone
      address
      facebookUrl
      role_id
      created_at
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String, $image: String, $email: String) {
    createUser(data: { name: $name, image: $image, email: $email }) {
      name
      image
      email
    }
  }
`;

export const UPSERT_USER = gql`
  mutation UpsertUser($id: Int, $name: String, $image: String, $email: String) {
    upsertUser(data: { id: $id, name: $name, image: $image, email: $email }) {
      name
      image
      email
      role_id
    }
  }
`;

export const LOGIN = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
      role {
        id
        name
      }
    }
  }
`;
