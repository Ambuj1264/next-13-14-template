import { gql } from "@apollo/client";
export const UPDATE_DEAL = gql`
  mutation UpdateDeal($input: UpdateDealInput) {
    updateDeal(input: $input) {
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
      tags
      teamMembers {
        id
        fullName
      }
      leadImage
      expectedCloseDate
    }
  }
`;
