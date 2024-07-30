import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Select from "react-select";
import {
  blackColor,
  darkCharcoalColor,
  fontWeightNormal,
  fullWidth,
  gutters,
} from "@/styles/variables";
import { typographyBody1, typographyH2 } from "@/styles/typography";
import { Container } from "@mui/material";
import { mqMax } from "@/styles/base";
import { useQueryContext } from "@/context/query/queryContext";
import { dateOptions } from "@/utils/constant";
import {
  LazyQueryHookExecOptions,
  OperationVariables,
  useLazyQuery,
} from "@apollo/client";
import { GET_DASHBOARD_DETAILS } from "@/lib/graphql/queries/getDashboardDetails";
import Skeletor from "../ui/skeletor/Skeletor";

interface DateOption {
  value: string;
  label: string;
  fieldvalue: {
    startDateInput: string;
    endDateInput: string;
  };
}

const DashboardTopContent: React.FC = () => {
  const [getDashboardDetials, { loading }] = useLazyQuery(
    GET_DASHBOARD_DETAILS,
    {
      fetchPolicy: "network-only",
    },
  );
  const [selectedOption, setSelectedOption] = useState<DateOption>(
    dateOptions[0],
  );
  const {
    profiledata,
    profileRefecth,
    setDashboardData,
    setLoader,
    loader,
    setDealTime,
  } = useQueryContext();
  const { fullName } = profiledata?.getUserDetailsById || {};

  const SavedashBoardData = async (
    variables:
      | Partial<LazyQueryHookExecOptions<any, OperationVariables>>
      | undefined,
  ) => {
    const { data } = await getDashboardDetials(variables);
    if (data?.getDashboardDetails) {
      setDashboardData(data?.getDashboardDetails);
    }
  };

  const onOptionSelect = (selectedvalue: {
    value: string;
    label: string;
    fieldvalue: { startDate: string; endDate: string };
  }) => {
    setDealTime(selectedvalue?.value);
    setSelectedOption(selectedvalue as unknown as DateOption);
    SavedashBoardData({ variables: selectedvalue.fieldvalue });
  };

  useEffect(() => {
    profileRefecth();
    SavedashBoardData({ variables: dateOptions[0].fieldvalue });
  }, []);
  useEffect(() => {
    setLoader(loading);
  }, [loading]);

  return (
    <Container maxWidth="xl">
      <Content>
        <ContentTitle>
          {loader ? (
            <Skeletor variant={"text"} width={"60%"} height={100} />
          ) : (
            <>Hello, {fullName}!</>
          )}
        </ContentTitle>
        <ContentDescription>
          {loader ? (
            <Skeletor variant={"text"} />
          ) : (
            <>
              Save LinkedIn leads in just one click with socialmotion
              <br /> Let&apos;s go!
            </>
          )}
        </ContentDescription>
        <DropDownSelectWrapper>
          <Select
            value={selectedOption}
            onChange={onOptionSelect}
            options={dateOptions}
            className={"custom-select-dropdown"}
          />
        </DropDownSelectWrapper>
      </Content>
    </Container>
  );
};

const Content = styled.div`
  flex: 1;
  padding: 0rem ${gutters.small - 12}rem;
  padding-top: ${gutters.small - 13}rem;
  width: ${fullWidth};
  ${mqMax.large} {
    padding: unset;
  }
`;
const ContentTitle = styled.h2(
  [typographyH2],
  css`
    color: ${darkCharcoalColor};
  `,
);
const ContentDescription = styled.p(
  [typographyBody1],
  css`
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightNormal};
    margin-bottom: ${gutters.large}px;
  `,
);

const DropDownSelectWrapper = styled.div`
  width: 200px;
  margin-bottom: ${gutters.large * 6}px;
  color: ${blackColor};
  font-size: ${gutters.small - 2}px;
  font-weight: ${fontWeightNormal};
`;

export default DashboardTopContent;
