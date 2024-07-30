import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import {
  borderRadiusBig,
  boxShadowOther,
  darkCharcoalColor,
  fullHeight,
  fontWeightNormal,
  fullWidth,
  greyColor,
  gutters,
  lightGreyColor,
  whiteColor,
  darkblueColor,
} from "@/styles/variables";
import {
  typographyBody1,
  typographyH4,
  typographyCaption,
  typographyBody2,
  typographySubtitle2,
} from "@/styles/typography";
import EvolutionChartDataCards from "./EvolutionChartDataCards";
import { mqMax } from "@/styles/base";
import { AvatarInitials } from "@/components/ui/avatar/Avatar";
import Image from "next/image";
import { isValidImageUrl } from "@/utils/helperUtils";

interface PerformerDetails {
  dealsInWeek: number;
  image: string;
  name: string;
  winsInWeek?: number;
}
interface TopPerformer {
  topDealMakerDetails: PerformerDetails;
  topWinnerDetails: PerformerDetails;
}

interface TopLostReason {
  reason: string;
  count: number;
}
interface Deals {
  name: string;
  dealsInWeek: number;
}
interface EvolutionProp {
  data: TopPerformer;
  closedDeals: Deals[];
  TopLostDeals: TopLostReason[];
  topDeals: Deals[];
}

const EvolutionCardGrid = ({
  data,
  closedDeals,
  topDeals,
  TopLostDeals,
}: EvolutionProp) => {
  const getChartData = (deals: any[]) => {
    if (!deals) {
      return;
    }
    const labels = deals?.map((deal) => deal.name || deal.reason);
    const chartdata = deals?.map((deal) => deal.dealsInWeek || deal.count || 0);
    const backgroundColor = ["#0277B6", "#67D64B", "#D64B4B", "#B3D000"];
    return { labels, datasets: [{ data: chartdata, backgroundColor }] };
  };

  return (
    <>
      <EvolutionMainWrapper>
        <EvolutionMainSection>
          <EvolutionBoxWrapper>
            <EvolutionCardBox>
              <GridTitleWrapper>
                <GridTitle>Team’s podium</GridTitle>
              </GridTitleWrapper>
            </EvolutionCardBox>

            <EvolutionGridData>
              <EvolutionDataStatus>
                Who <HighlightedText>gets</HighlightedText> more deals?
              </EvolutionDataStatus>
              <EvolutionDataStatusName>
                {data?.topDealMakerDetails?.name}
              </EvolutionDataStatusName>
              <UserProfile
                name={data?.topDealMakerDetails?.name}
                Imgurl={data?.topDealMakerDetails?.image}
              />
              <EvolutionDataStatusWeek>
                {data?.topDealMakerDetails?.dealsInWeek}/week
              </EvolutionDataStatusWeek>
            </EvolutionGridData>

            <EvolutionGridData>
              <EvolutionDataStatus>
                Who <HighlightedText>closes</HighlightedText> more deals?
              </EvolutionDataStatus>
              <EvolutionDataStatusName>
                {data?.topWinnerDetails?.name}
              </EvolutionDataStatusName>
              <UserProfile
                name={data?.topWinnerDetails?.name}
                Imgurl={data?.topWinnerDetails?.image}
              />
              <EvolutionDataStatusWeek>
                {data?.topWinnerDetails?.winsInWeek}/week
              </EvolutionDataStatusWeek>
            </EvolutionGridData>

            <EvolutionGridData>
              <EvolutionDataStatus>
                Who <HighlightedText>uses</HighlightedText> more socialmotion?
              </EvolutionDataStatus>
              <EvolutionDataStatusName>N/A</EvolutionDataStatusName>
              <AvatarComponent>N/A</AvatarComponent>
              <EvolutionDataStatusWeek>N/A</EvolutionDataStatusWeek>
            </EvolutionGridData>
          </EvolutionBoxWrapper>
        </EvolutionMainSection>

        <EvolutionChartDataCards
          heading="Total Deals Dashboard"
          data={getChartData(topDeals)}
        />
        <EvolutionChartDataCards
          heading="Closed Deals Dashboard"
          data={getChartData(closedDeals)}
        />
        <EvolutionChartDataCards
          heading="Lost Reasons Dashboard"
          data={getChartData(TopLostDeals)}
        />
      </EvolutionMainWrapper>
    </>
  );
};

export default EvolutionCardGrid;

export const EvolutionMainSection = styled.div(css`
  gap: ${gutters.small * 2}px;
  flex: 48%;
`);
export const EvolutionMainWrapper = styled.div(css`
  display: flex;
  flex-wrap: wrap;
  padding: 64px;
  justify-content: space-evenly;
  column-gap: 30px;
  row-gap: 40px;
  ${mqMax.medium} {
    padding: 24px 0px;
  }
`);

export const EvolutionCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${gutters.small}px;
  border-bottom: 1px solid ${lightGreyColor};
`;
export const EvolutionBoxWrapper = styled.div`
  padding: 1.25rem;
  width: ${fullWidth};
  height: ${fullHeight};
  min-height: 303px;
  border-radius: ${borderRadiusBig};
  border: 1px solid ${greyColor};
  background: ${whiteColor};
  box-shadow: ${boxShadowOther};
  ${mqMax.medium} {
    // margin-top:24px;
  }
`;

const EvolutionDataStatus = styled.p(
  [typographyBody1],
  css`
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightNormal};
  `,
);
const EvolutionDataStatusName = styled.p(
  [typographyCaption],
  css`
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightNormal};
  `,
);

const EvolutionDataStatusWeek = styled.p(
  [typographyBody2],
  css`
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightNormal};
  `,
);
const HighlightedText = styled.b``;

export const GridTitleWrapper = styled.div(css`
  display: flex;
  align-items: center;
  margin-bottom: ${gutters.small}px;
`);
const EvolutionGridData = styled.div(css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${gutters.small * 2}px;
`);

export const GridTitle = styled.h2(
  [typographyH4],
  css`
    color: ${darkCharcoalColor};
  `,
);
const AvatarComponent = styled(Avatar)`
  ${typographySubtitle2};
  width: 37px;
  height: 37px;
  color: ${whiteColor};
  text-align: center;
  background: ${darkblueColor};
`;
const StyledImage = styled(Image)`
  border-radius: ${gutters.medium * 2}px;
  border: 1px solid ${darkblueColor};
`;
const UserProfile = ({ name, Imgurl }: { name: string; Imgurl: string }) => {
  return !isValidImageUrl(Imgurl) ? (
    <AvatarInitials w={"37"} h={"37"} name={name} textSize="14px" />
  ) : (
    <StyledImage src={Imgurl} width={37} height={37} alt="user" />
  );
};
