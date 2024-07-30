import { gql } from "@apollo/client";
export const CREATE_TEAM = gql`
  mutation CreateTeam($input: TeamInput) {
    createTeam(input: $input) {
      teamMembers
      teamName
      createdBy
    }
  }
`;
