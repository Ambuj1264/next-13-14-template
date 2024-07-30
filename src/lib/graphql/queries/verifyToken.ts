import { gql } from "@apollo/client";

export const VERIFY_TOKEN = gql`
  query Query($token: String!) {
    verifyToken(token: $token)
  }
`;
