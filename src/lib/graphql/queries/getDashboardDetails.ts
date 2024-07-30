import { gql } from "@apollo/client";
export const GET_DASHBOARD_DETAILS = gql`
  query GetDashboardDetails($startDateInput: String, $endDateInput: String) {
    getDashboardDetails(
      startDateInput: $startDateInput
      endDateInput: $endDateInput
    ) {
      DealsDetail {
        name
        percentageChange
        determine
        value
      }
      MoreInformation {
        name
        value
      }
      Evolution {
        name
        dealsValue
        totalValue
      }
      TeamPodium {
        topDealMakerDetails {
          dealsInWeek
          image
          name
        }
        topWinnerDetails {
          winsInWeek
          name
          image
        }
      }
      TopDeals {
        name
        dealsInWeek
      }
      TopCloseDeals {
        dealsInWeek
        name
      }
      TopLostReason {
        count
        reason
      }
      KanbanData {
        boardName
        price
      }
    }
  }
`;
