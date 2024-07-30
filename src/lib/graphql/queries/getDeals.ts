import { gql } from "@apollo/client";
export const GET_DEALS = gql`
  query GetDeals($search: String) {
    getDeals(search: $search) {
      edges {
        node {
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
          webURL
          tags
          teamMembers {
            id
            fullName
          }
          leadImage
          expectedCloseDate
          createdAt
          dealManagement_isDeleted
          dealManagement_isWon
          dealManagement_isLost
        }
        cursor
      }
      totalCount
    }
  }
`;
