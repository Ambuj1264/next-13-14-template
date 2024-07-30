import { gql } from "@apollo/client";

export const PROFILE_DATA = gql`
  query GetUserDetailsById {
    getUserDetailsById {
      id
      email
      mobileNumber
      countryCode
      jobRole
      experience
      firstWishlist
      company {
        id
        name
        isActive
      }
      weLeadUserInCompany
      fullName
      companySize
      profilePicture
      industry
      login_isActive
    }
  }
`;
