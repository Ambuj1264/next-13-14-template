import { gql } from "@apollo/client";
export const CREATE_SCHEDULE_POST = gql`
  mutation CreatePost($input: PostInput) {
    createPost(input: $input) {
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
  }
`;
