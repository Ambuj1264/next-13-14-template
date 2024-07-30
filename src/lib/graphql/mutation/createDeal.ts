import { gql } from "@apollo/client";
export const CREATE_DEAL = gql`
  mutation CreateDeal($input: CreateDealInput!) {
    createDeal(input: $input) {
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
      }
      leadImage
      expectedCloseDate
      dealManagement_isDeleted
      dealManagement_isWon
      dealManagement_isLost
    }
  }
`;
