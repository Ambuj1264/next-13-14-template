import { gql } from "@apollo/client";
export const GET_BOARD_DATA_BY_ID = gql`
  query GetKanbanBoardByMemberID($memberIds: [String]) {
    getKanbanBoardByMemberID(memberIds: $memberIds) {
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
