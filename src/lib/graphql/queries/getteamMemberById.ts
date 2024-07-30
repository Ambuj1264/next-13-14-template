import { gql } from "@apollo/client";
export const GET_TEAM_MEMEBRS_BY_COMPANY_ID = gql`
  query GetTeamMembersByCompanyId {
    getTeamMembersByCompanyId {
      fullName
      id
      profilePicture
    }
  }
`;
