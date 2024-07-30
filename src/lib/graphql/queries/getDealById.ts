import { gql } from "@apollo/client";
export const GET_DEAL_BY_ID = gql`
  query GetDealById($getDealByIdId: String) {
    getDealById(id: $getDealByIdId) {
      id
      userId
      name
      organization
      value
      valueType
      stage {
        id
        boardName
        boardConstraint
      }
      email
      phone
      phoneType
      linkedin
      calendly
      tags
      teamMembers {
        id
        fullName
        profilePicture
      }
      leadImage
      expectedCloseDate
      dealManagement_isDeleted
      dealManagement_isWon
      dealManagement_isLost
      estimate
      notes
      probability
      webURL
      createdAt
    }
  }
`;
