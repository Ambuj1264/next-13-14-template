import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { mqMax } from "@/styles/base";
import {
  typographyBody1,
  typographyBody2,
  typographyH2,
  typographyParagraph,
} from "@/styles/typography";
import {
  borderRadiusBig,
  darkCharcoalColor,
  whiteColor,
  boxShadowOther,
  fontWeightNormal,
  gutters,
  lightGrayishBlue,
  fontWeightSemibold,
  darkRedColor,
  greyColor,
  guttersPx,
  GreenTeal,
  darkblueColor,
} from "@/styles/variables";
import {
  DecreaseIcon,
  IncreaseIcon,
} from "@/utils/formUtils/InputSvg/InputSvg";
import DataCounterSectionSkeleton from "@/components/ui/loader/DashBoard/DataCounterSectionSkeleton";
import { useQueryContext } from "@/context/query/queryContext";

interface CardBoxProps {
  title: string;
  amount?: number | string;
  percentage?: string | number;
  status?: string;
  showProgress?: boolean;
  showTopContent?: boolean;
  numberdeal?: string | number;
  statusTop?: string;
  srcTopContent?: string;
  showDots?: boolean;
}

const CardBoxSmall: React.FC<CardBoxProps> = ({
  title,
  amount,
  percentage,
  status,
  showProgress,
  showTopContent,
  numberdeal,
  statusTop,
}) => {
  const isIncrease = status === "increase";
  const { loader } = useQueryContext();
  if (loader) {
    return <DataCounterSectionSkeleton />;
  }
  return (
    <DataCounterBillingBox>
      {showTopContent && (
        <EvolutionCardBox>
          <EvolutionDataWrapper>
            <Circle bgcolor={getColor(statusTop || "")} />
            <EvolutionDataStatus>{statusTop}</EvolutionDataStatus>
          </EvolutionDataWrapper>
          <NumbersOfDeals>
            {Number(numberdeal)?.toFixed(2)} deals
          </NumbersOfDeals>
        </EvolutionCardBox>
      )}
      <BoxContentTitle>{title}</BoxContentTitle>
      {
        <BoxContentNumbersWrapper>
          <BoxContentNumbers>{amount}</BoxContentNumbers>
          {status && (isIncrease ? <IncreaseIcon /> : <DecreaseIcon />)}
          {showProgress && (
            <BoxContentPercentageUp status={isIncrease}>
              {percentage}
            </BoxContentPercentageUp>
          )}
        </BoxContentNumbersWrapper>
      }
    </DataCounterBillingBox>
  );
};

export default CardBoxSmall;

const DataCounterBillingBox = styled.div`
  padding: 1.25rem;
  flex: 29%;
  border-radius: ${borderRadiusBig};
  border: 1px solid ${darkCharcoalColor};
  background: ${whiteColor};
  box-shadow: ${boxShadowOther};
  ${mqMax.medium} {
    width: -webkit-fill-available;
  }
`;
const BoxContentTitle = styled.p(
  [typographyBody1],
  css`
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightNormal};
  `,
);

const BoxContentNumbersWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${gutters.small}px;
`;
const BoxContentPercentageUp = styled.p<{
  status: boolean;
}>(
  [typographyBody2],
  ({ status }) => css`
    color: ${status ? lightGrayishBlue : darkRedColor};
    margin-left: ${gutters.small / 2}px;
    font-weight: ${fontWeightNormal};
  `,
);

const BoxContentNumbers = styled.h2(
  [typographyH2],
  css`
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightSemibold};
    margin-right: ${gutters.small}px;
  `,
);

const EvolutionDataWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NumbersOfDeals = styled.p(
  [typographyParagraph],
  css`
    color: ${greyColor};
    margin-left: ${gutters.small - 8}px;
  `,
);

const EvolutionDataStatus = styled.p(
  [typographyBody1],
  css`
    color: ${greyColor};
    font-weight: ${fontWeightNormal};
    margin-left: ${gutters.small / 2}px;
  `,
);

const EvolutionCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${gutters.small}px;
`;

const Circle = styled.div<{ bgcolor?: string }>(
  ({ bgcolor }) => css`
    width: ${guttersPx.medium};
    height: ${guttersPx.medium};
    border-radius: ${gutters.large * 2}px;
    background: ${bgcolor};
  `,
);

export const colorMap: any = {
  "In progress": darkblueColor,
  Won: GreenTeal,
  "Estimated billing": greyColor,
};

export const getColor = (name: string) => colorMap[name] || darkblueColor;
