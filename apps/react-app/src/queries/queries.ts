import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      password
      email
    }
  }
`;

export const REGISTER_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInputDTO!) {
    createUser(createUserInput: $createUserInput) {
      email
    }
  }
`;
