import { gql } from "@apollo/client";
export const GET_TEAMS = gql`
  query Teams {
    teams {
      totalCount
      edges {
        node {
          teamMembers
          teamName
          createdBy
        }
        cursor
      }
    }
  }
`;
