import { gql } from "@apollo/client";

export const PROFILE_UPDATE = gql`
  mutation Mutation($input: LoginUpdateInput!) {
    loginUpdate(input: $input) {
      user {
        fullName
        mobileNumber
        profilePicture
      }
      token
    }
  }
`;
