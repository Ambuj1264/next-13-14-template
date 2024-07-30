"use client";
import React from "react";
import DashboardTopContent from "@/components/homepage/DashboardTopContent";
import styled from "@emotion/styled";
import { boxShadow, darkblueColor } from "@/styles/variables";
import { displayRow } from "@/styles/base";
import { css } from "@emotion/core";
import DataCounterSection from "@/components/homepage/DataCounterSection";
import MoreInformationDealsList from "@/components/homepage/MoreInformationDealsList";
import WantToCloseMoreDeals from "@/components/homepage/WantToCloseMoreDeals";
import { Container } from "@mui/material";
import EvalutionSection from "@/components/homepage/EvolutionSection/EvolutionSection";
import EvolutionCardGrid from "@/components/homepage/EvolutionSection/EvolutionCardGrid";
import EvolutionOfYourDeals from "@/components/homepage/EvolutionSection/EvolutionOfYourDeals";
import { useQueryContext } from "@/context/query/queryContext";

const Page = () => {
  const { dashboardData } = useQueryContext();
  const {
    DealsDetail,
    MoreInformation,
    Evolution,
    KanbanData,
    TeamPodium,
    TopCloseDeals,
    TopDeals,
    TopLostReason,
  } = dashboardData;

  return (
    <>
      <DashboardTopContent />
      <BottomContentSection>
        <Container maxWidth="xl">
          <DataCounterSection data={DealsDetail} />
          <MoreInformationDealsList data={MoreInformation} />
          <WantToCloseMoreDeals />
          <EvalutionSection data={Evolution} />
          <EvolutionCardGrid
            data={TeamPodium}
            closedDeals={TopCloseDeals}
            topDeals={TopDeals}
            TopLostDeals={TopLostReason}
          />
          <EvolutionOfYourDeals data={KanbanData} />
          <WantToCloseMoreDeals />
        </Container>
      </BottomContentSection>
    </>
  );
};

export default Page;

const BottomContentSection = styled.section(
  [displayRow],
  css`
    background-color: ${darkblueColor};
    box-shadow: ${boxShadow};
  `,
);
