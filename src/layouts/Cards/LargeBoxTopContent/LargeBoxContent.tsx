import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { css } from "@emotion/react";
import {
  typographyH4,
  typographyBody2Semibold,
  typographySubtitle2Normal,
} from "@/styles/typography";
import {
  lightGreyColor,
  darkCharcoalColor,
  gutters,
  greyColor,
  fontFamily,
} from "@/styles/variables";
import { useQueryContext } from "@/context/query/queryContext";
interface LargeBoxProps {
  leftTitle: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  href: string;
  rightContent: string;
  showleftContent: boolean;
  showRightLink: boolean;
}
const LargeBoxContent: React.FC<LargeBoxProps> = ({
  leftTitle,
  src,
  width,
  height,
  alt,
  href,
  rightContent,
  showleftContent,
  showRightLink,
}) => {
  const { DealTime } = useQueryContext();
  return (
    <MoreEvolutionInfo>
      <MoreDealsSections>
        <MoreDealsInnerItemDiv>
          <MoreDealsInnerText>
            <MoreInfoTitle>{leftTitle}</MoreInfoTitle>
            {showleftContent && <EvolutionTitle>{DealTime}</EvolutionTitle>}
          </MoreDealsInnerText>
        </MoreDealsInnerItemDiv>
        {showRightLink && (
          <Link href={href}>
            <MoreDealsInnerItemDiv>
              <MoreDealsInnerText>
                <EvolutionTitleDeals>{rightContent}</EvolutionTitleDeals>
              </MoreDealsInnerText>
              <MoreDealsInnerIcons>
                <Image src={src} alt={alt} width={width} height={height} />
              </MoreDealsInnerIcons>
            </MoreDealsInnerItemDiv>
          </Link>
        )}
      </MoreDealsSections>
    </MoreEvolutionInfo>
  );
};

export default LargeBoxContent;

const MoreEvolutionInfo = styled.div`
  border-bottom: 1px solid ${lightGreyColor};
`;

const MoreInfoTitle = styled.h2(
  [typographyH4],
  css`
    color: ${darkCharcoalColor};
  `,
);
const MoreDealsSections = styled.div(css`
  padding: 0px ${gutters.small}px ${gutters.small}px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`);
const MoreDealsInnerIcons = styled.div(css``);
const MoreDealsInnerText = styled.div(css`
  display: flex;
  align-items: center;
`);
const MoreDealsInnerItemDiv = styled.div(css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`);

const EvolutionTitle = styled.p(
  [typographyBody2Semibold],
  css`
    color: ${greyColor};
    margin: 0px ${gutters.small / 2}px;
  `,
);

const EvolutionTitleDeals = styled.p(
  [typographySubtitle2Normal],
  css`
    color: ${greyColor};
    margin: 0px ${gutters.small / 2}px;
    font-family: ${fontFamily};
  `,
);
