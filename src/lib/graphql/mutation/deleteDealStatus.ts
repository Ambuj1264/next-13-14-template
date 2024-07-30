import { gql } from "@apollo/client";
export const UPDATE_DEAL_STATUS = gql`
  mutation UpdateDealStatus($input: UpdateDealStatusInput) {
    updateDealStatus(input: $input)
  }
`;
