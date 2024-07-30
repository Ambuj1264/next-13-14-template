import { gql } from "@apollo/client";
export const BOARD_DATA = gql`
  query KanbanBoard {
    kanbanBoard {
      id
      boardName
      boardConstraint
      dealdata {
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
        probability
        notes
        estimate
        tags
        teamMembers {
          id
          fullName
          profilePicture
        }
        leadImage
        isincomplete
        expectedCloseDate
        createdAt
        dealManagement_isDeleted
        dealManagement_isWon
        dealManagement_isLost
      }
      price
    }
  }
`;
