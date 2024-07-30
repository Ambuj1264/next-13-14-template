import { UPDATE_DEAL_STATUS } from "@/lib/graphql/mutation/deleteDealStatus";
import { GET_TEAM_MEMEBRS_BY_COMPANY_ID } from "@/lib/graphql/queries/getteamMemberById";
import { BOARD_DATA } from "@/lib/graphql/queries/KanbanBoard";
import { errorToast, successToast } from "@/styles/toaster";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { QueryContextContainer } from "./queryContext";
import { PROFILE_DATA } from "@/lib/graphql/queries/profileData";
import { DealArray } from "@/types/global";
import {
  BoardObj,
  convertArrayToKanbanBoards,
} from "@/components/deals/DealList";
import { GET_DEALS } from "@/lib/graphql/queries/getDeals";

interface ActionProps {
  delete: boolean;
  won: boolean;
  lost: boolean;
  [key: string]: boolean;
}
export interface DashboardDetails {
  DealsDetail: {
    name: string;
    value: number;
    percentageChange: number;
    determine: string;
    __typename: string;
  }[];
  MoreInformation: {
    name: string;
    value: number;
    __typename: string;
  }[];
  __typename: string;
}

function QueryProvider({ children }: PropsWithChildren) {
  const [dealactions, setDealActions] = useState<ActionProps>({
    delete: false,
    won: false,
    lost: false,
  });
  const [dealDetailModal, setDealDetailModal] = useState(false);
  const [saveSearchData, setSaveSearchData] = useState<DealArray | null>(null);
  const [dealListData, setDealListData] = useState<Record<string, BoardObj>>(
    {},
  );
  const [dashboardData, setDashboardData] = useState<
    Record<string, DashboardDetails>
  >({});
  const [dealId, setDealId] = useState("");
  const [loader, setLoader] = useState(false);
  const [DealTime, setDealTime] = useState("Current month");
  const [accountActionType, setAccountActionType] = useState<string>("");

  const [handlelistData, { data, refetch }] = useLazyQuery(BOARD_DATA, {
    fetchPolicy: "network-only",
  });
  const [getSearchData] = useLazyQuery(GET_DEALS, {
    fetchPolicy: "network-only",
  });
  const searchData = async () => {
    const { data: searchresponse } = await getSearchData({
      variables: { search: "" },
    });
    if (searchresponse?.getDeals) {
      saveSearchFieldValues(searchresponse?.getDeals?.edges);
    }
  };
  const listData = async () => {
    const { data: boarddata } = await handlelistData();
    if (boarddata) {
      const list = convertArrayToKanbanBoards(boarddata?.kanbanBoard);
      setDealListData(list);
      searchData();
    }
  };

  const {
    data: profiledata,
    loading: profileLoading,
    refetch: profileRefecth,
  } = useQuery(PROFILE_DATA);
  const [dealActions] = useMutation(UPDATE_DEAL_STATUS, {
    onCompleted: listData,
  });
  const {
    data: teammembers,
    refetch: membersRefecth,
    loading: teamMemberLoading,
  } = useQuery(GET_TEAM_MEMEBRS_BY_COMPANY_ID, {
    fetchPolicy: "network-only",
  });

  const handleDealActions = (name: keyof ActionProps, value: boolean) => {
    Object.keys(dealactions).forEach((item) => {
      if (item === name) {
        dealactions[item] = value;
      } else {
        dealactions[item] = false;
      }
    });
    setDealActions({ ...dealactions });
  };
  const dealActionsClose = () => {
    setDealActions({
      delete: false,
      won: false,
      lost: false,
    });
  };

  const onDealActionSubmit = async (statusvalues: any, reset: () => void) => {
    try {
      const { data: dealResponse } = await dealActions({
        variables: { input: statusvalues },
      });
      if (dealResponse) {
        successToast(dealResponse?.updateDealStatus);
        reset();
        dealActionsClose();
      }
    } catch (error: any) {
      errorToast(error?.message);
    }
  };

  const isLoading = profileLoading || teamMemberLoading;

  useEffect(() => {
    setLoader(isLoading);
  }, [profileLoading, teamMemberLoading]);

  const saveSearchFieldValues = (values: DealArray) =>
    setSaveSearchData(values);
  const handleAccountActionType = (actionType: string) => {
    setAccountActionType(actionType);
  };

  const contextValues = {
    teammembers,
    dealactions,
    profiledata,
    loader,
    dealDetailModal,
    saveSearchData,
    dealId,
    data,
    dealListData,
    dashboardData,
    DealTime,
    accountActionType,
    refetch,
    setLoader,
    searchData,
    membersRefecth,
    handleDealActions,
    onDealActionSubmit,
    dealActionsClose,
    listData,
    setDealListData,
    setDealDetailModal,
    setDealTime,
    profileRefecth,
    saveSearchFieldValues,
    setDealId,
    setDashboardData,
    handleAccountActionType,
  };

  return (
    <QueryContextContainer value={contextValues}>
      {children}
    </QueryContextContainer>
  );
}

export default QueryProvider;
