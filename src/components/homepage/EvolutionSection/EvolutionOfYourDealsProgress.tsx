import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  borderRadius,
  darkCharcoalColor,
  fontWeightNormal,
  fullHeight,
  fullWidth,
  greyColor,
  gutters,
  lightGreyColor,
} from "@/styles/variables";
import { typographySubtitle1, typographySubtitle2 } from "@/styles/typography";
import { mqMax } from "@/styles/base";
import { KanbanBoardData } from "./EvolutionOfYourDeals";
import { formatedValues } from "@/utils/helperUtils";

const EvolutionOfYourDealsProgress: React.FC<{ data: KanbanBoardData[] }> = ({
  data,
}) => {
  return (
    <EvolutionMain>
      {data?.map((item, index) => (
        <EvolutionBoxWrapper key={index}>
          <EvolutionCardBox>
            <EvolutionDataWrapper>
              <EvolutionDataStatus>{item.boardName}</EvolutionDataStatus>
            </EvolutionDataWrapper>
          </EvolutionCardBox>
          <EvolutionAmount>{formatedValues(item.price)}€</EvolutionAmount>
        </EvolutionBoxWrapper>
      ))}
    </EvolutionMain>
  );
};

const EvolutionMain = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  grid-area: content;
  justify-content: space-between;
  ${mqMax.medium} {
    flex-direction: column;
    margin-bottom: unset;
  }
`;
const EvolutionBoxWrapper = styled.div`
  padding: 1.25rem;
  width: ${fullWidth};
  height: ${fullHeight};
  max-width: auto;
  max-height: 122px;
  border-radius: ${borderRadius};
  border: 1px solid ${greyColor};
  background: ${lightGreyColor};
  margin: ${gutters.small * 2}px auto;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  ${mqMax.medium} {
    margin: unset;
  }
`;

const EvolutionDataStatus = styled.p(
  [typographySubtitle1],
  css`
    color: ${darkCharcoalColor};
  `,
);

const EvolutionCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${gutters.small}px;
`;
const EvolutionDataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const EvolutionAmount = styled.h2(
  [typographySubtitle2],
  css`
    color: ${greyColor};
    font-weight: ${fontWeightNormal};
    margin-right: ${gutters.small}px;
  `,
);

export default EvolutionOfYourDealsProgress;
