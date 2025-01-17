import { gql } from "@apollo/client";
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      mobileNumber
      countryCode
      jobRole
      experience
      firstWishlist
      company {
        name
        id
      }
      weLeadUserInCompany
      fullName
      companySize
      profilePicture
      industry
    }
  }
`;
