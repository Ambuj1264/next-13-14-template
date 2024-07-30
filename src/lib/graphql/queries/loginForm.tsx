import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token {
        token
      }
      info {
        id
        email
        userId
        isDeleted
        isActive
      }
    }
  }
`;
