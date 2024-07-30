import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { css } from "@emotion/react";
import WarningIcon from "../../../public/assets/icons/warnning.svg";
import RightArrowIcon from "../../../public/assets/icons/arrowRight.svg";
import {
  blackColor,
  borderRadiusBig,
  boxShadowOther,
  darkblueColor,
  darkCharcoalColor,
  fontSizeH5,
  fontWeightNormal,
  GreenTeal,
  greyColor,
  gutters,
  lightGreyColor,
  whiteColor,
} from "@/styles/variables";
import {
  typographyBody1,
  typographyBody2,
  typographyH4,
} from "@/styles/typography";
import { mqMax } from "@/styles/base";
import { InfoIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import { ROUTE_NAMES } from "@/shared/routeNames";
import MoreInformationDealsListSkeleton from "../ui/loader/DashBoard/MoreInformationDealsListSkeleton";
import { useQueryContext } from "@/context/query/queryContext";
interface MoreInformationItem {
  name: string;
  value: number;
}
const MoreInformationDealsList: React.FC<{ data: MoreInformationItem[] }> = ({
  data,
}) => {
  const getColor = (name: string) => {
    if (name === "Deated deals") {
      return greyColor;
    }
    if (name === "Won deals") {
      return GreenTeal;
    }
    if (name === "Lost deals") {
      return "#960000";
    }
    return darkblueColor;
  };

  const getTopContent = data?.filter(
    (item) => item.name !== "Incomplete deals",
  );
  const getBottomData: MoreInformationItem = data?.find(
    (item) => item.name === "Incomplete deals",
  ) ?? { name: "", value: 0 };
  const { loader } = useQueryContext();
  return (
    <MoreInformation>
      <MoreInfoDiv>
        <MoreInfoTitle>More information about your deals:</MoreInfoTitle>
      </MoreInfoDiv>
      {loader ? (
        <MoreInformationDealsListSkeleton />
      ) : (
        <>
          {" "}
          <MoreInformationDealsSection>
            {getTopContent?.map((item, index) => (
              <MoreDealsSections key={index}>
                <MoreDealsInnerItemDiv>
                  <MoreDealsInnerIcons>
                    <InfoIcon color={getColor(item.name)} />
                  </MoreDealsInnerIcons>
                  <MoreDealsInnerText>
                    <MoreDealsInnerTitleLeft>
                      {item.name}{" "}
                      <MoreDealsInnerTitleLeftNumber>
                        {item.value}
                      </MoreDealsInnerTitleLeftNumber>
                    </MoreDealsInnerTitleLeft>
                  </MoreDealsInnerText>
                </MoreDealsInnerItemDiv>
                <Link href={ROUTE_NAMES.DEALS} key={index}>
                  <MoreDealsInnerItemDiv>
                    <MoreDealsInnerText>
                      <MoreDealsInnerTitle>
                        Go to deals section
                      </MoreDealsInnerTitle>
                    </MoreDealsInnerText>
                    <MoreDealsInnerIcons>
                      <Image
                        src="/assets/icons/arrowRight.svg"
                        alt="go to deals"
                        width={14}
                        height={14}
                      />
                    </MoreDealsInnerIcons>
                  </MoreDealsInnerItemDiv>
                </Link>
              </MoreDealsSections>
            ))}
          </MoreInformationDealsSection>
          <MoreInfoIncompleteDiv>
            <MoreDealsSections>
              <MoreDealsInnerItemDiv alignItems="start">
                <Image
                  src={WarningIcon}
                  alt="WarnningIcon"
                  width={36}
                  height={36}
                />
                <MoreDealsInnerText>
                  <MoreDealsInnerTitleLeft>
                    {getBottomData?.name}
                    <MoreDealsInnerTitleLeftNumber>
                      {getBottomData?.value}
                    </MoreDealsInnerTitleLeftNumber>
                  </MoreDealsInnerTitleLeft>
                </MoreDealsInnerText>
              </MoreDealsInnerItemDiv>
              <Link href={ROUTE_NAMES.DEALS}>
                <MoreDealsInnerItemDiv>
                  <MoreDealsInnerText>
                    <MoreDealsInnerTitle>
                      Go to deals section
                    </MoreDealsInnerTitle>
                  </MoreDealsInnerText>
                  <MoreDealsInnerIcons>
                    <Image
                      src={RightArrowIcon}
                      alt="Icon"
                      width={14}
                      height={14}
                    />
                  </MoreDealsInnerIcons>
                </MoreDealsInnerItemDiv>
              </Link>
            </MoreDealsSections>
          </MoreInfoIncompleteDiv>
        </>
      )}
    </MoreInformation>
  );
};

export const MoreInformation = styled.footer`
  // height: 303px;
  border-radius: ${borderRadiusBig};
  border: 1px solid ${blackColor};
  background: ${whiteColor};
  box-shadow: ${boxShadowOther};
  margin: ${gutters.small - 13}rem ${gutters.small - 12}rem;
  padding: ${gutters.small - 15}rem;
  ${mqMax.large} {
    width: 100%;
    margin: 0px auto;
    height: auto;
  }
`;

const MoreInfoDiv = styled.div`
  padding: ${gutters.small}px 0px;
  border-bottom: 1px solid ${greyColor};
  margin-bottom: ${gutters.small}px;
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
const MoreDealsInnerText = styled.div(css``);
const MoreDealsInnerItemDiv = styled.div<{
  alignItems?: string;
}>(
  ({ alignItems = "center" }) => css`
    display: flex;
    justify-content: space-between;
    align-items: ${alignItems};
  `,
);

const MoreDealsInnerTitleLeft = styled.p(
  [typographyBody1],
  css`
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightNormal};
    margin-left: ${gutters.small - 6}px;
  `,
);
const MoreDealsInnerTitleLeftNumber = styled.span(css`
  color: ${darkCharcoalColor};
  font-weight: ${fontWeightNormal};
  font-size: ${fontSizeH5};
  margin-left: ${gutters.small - 6}px;
`);
const MoreDealsInnerTitle = styled.p(
  [typographyBody2],
  css`
    color: ${greyColor};
    font-weight: ${fontWeightNormal};
    margin-right: ${gutters.small - 6}px;
  `,
);

const MoreInfoIncompleteDiv = styled.div`
  padding: ${gutters.small}px 0px;
  border-top: 1px solid ${lightGreyColor};
`;

const MoreInformationDealsSection = styled.div``;

export default MoreInformationDealsList;
