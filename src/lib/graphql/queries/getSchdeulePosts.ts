import { gql } from "@apollo/client";
export const GET_SCHEDULE_POST = gql`
  query Posts($search: String) {
    posts(search: $search) {
      totalCount
      edges {
        node {
          content
          teamMembers
          img
          isPublish
          schedulePostDate
          time
          createdBy {
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
        cursor
      }
    }
  }
`;
