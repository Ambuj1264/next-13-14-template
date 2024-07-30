import { gql } from "@apollo/client";

export const FORGET_PASSWORD = gql`
  mutation LoginReset($input: LoginResetInput!) {
    loginReset(input: $input)
  }
`;
