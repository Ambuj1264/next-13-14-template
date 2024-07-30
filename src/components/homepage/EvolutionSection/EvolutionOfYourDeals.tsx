import React from "react";
import styled from "@emotion/styled";
import ArrowRightUp from "../../../../public/assets/icons/Arrowdown.svg";
import RightArrowIcon from "../../../../public/assets/icons/arrowRight.svg";
import { ROUTE_NAMES } from "@/shared/routeNames";
import { MoreInformation } from "../MoreInformationDealsList";
import EvolutionOfYourDealsProgress from "./EvolutionOfYourDealsProgress";
import { mqMax } from "@/styles/base";
import CloseMoreText from "@/layouts/CloseMoreDealsText/CloseMoreText";
import LargeBoxContent from "@/layouts/Cards/LargeBoxTopContent/LargeBoxContent";

export interface KanbanBoardData {
  boardName: string;
  price: string;
}

const EvolutionOfYourDeals: React.FC<{ data: KanbanBoardData[] }> = ({
  data,
}) => {
  return (
    <>
      <CloseMoreText
        showTitle={"Do you want to know what is the evolution of your deals?"}
        src={ArrowRightUp}
        width={12}
        height={12}
        alt={"ArrowIcon"}
        route={ROUTE_NAMES.ROOT}
        linkText={"Look it"}
      />
      <MainSection>
        <LargeBoxContent
          leftTitle={"Evolution"}
          src={RightArrowIcon}
          width={14}
          height={14}
          alt={"Icon"}
          href={ROUTE_NAMES.DEALS}
          rightContent={"Go to deals section"}
          showleftContent={true}
          showRightLink={true}
        />
        <EvolutionOfYourDealsProgress data={data} />
      </MainSection>
    </>
  );
};

const MainSection = styled(MoreInformation)`
  height: auto;
  ${mqMax.large} {
    width: 100%;
    margin: 0px auto;
  }
`;

export default EvolutionOfYourDeals;
