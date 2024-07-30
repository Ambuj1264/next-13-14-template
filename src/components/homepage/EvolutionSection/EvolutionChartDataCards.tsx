import React from "react";
import {
  EvolutionBoxWrapper,
  EvolutionCardBox,
  EvolutionMainSection,
  GridTitle,
  GridTitleWrapper,
} from "./EvolutionCardGrid";
import EvolutionChartData from "./EvolutionChartData";
import { mqMax } from "@/styles/base";
import { gutters } from "@/styles/variables";
import styled from "@emotion/styled";
const EvolutionChartDataCards = ({
  heading,
  data,
}: {
  heading: string;
  data: any;
}) => {
  return (
    <EvolutionMainSection>
      <EvolutionBoxWrapper>
        <EvolutionCardBox>
          <GridTitleWrapper>
            <GridTitle>{heading}</GridTitle>
          </GridTitleWrapper>
        </EvolutionCardBox>
        <ChartWrapper>
          <EvolutionChartData data={data} />
        </ChartWrapper>
      </EvolutionBoxWrapper>
    </EvolutionMainSection>
  );
};

const ChartWrapper = styled.div`
  margin: auto;
  ${mqMax.large} {
    padding: ${gutters.small * 2}px 0px;
  }
`;

export default EvolutionChartDataCards;
