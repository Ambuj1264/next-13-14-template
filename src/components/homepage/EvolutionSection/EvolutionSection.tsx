import React from "react";
import styled from "@emotion/styled";
import RightArrowIcon from "../../../../public/assets/icons/arrowRight.svg";
import { MoreInformation } from "../MoreInformationDealsList";
import EvolutionProgress from "./EvolutionProgress";
import LargeBoxContent from "@/layouts/Cards/LargeBoxTopContent/LargeBoxContent";
import ProgressBar from "./ProgressBar";
import { getColor } from "@/layouts/Cards/CardBoxSmall";
import { ROUTE_NAMES } from "@/shared/routeNames";

export interface DashboardEvolution {
  name: string;
  dealsValue: number | string;
  totalValue: string;
}

const EvolutionSection: React.FC<{ data: DashboardEvolution[] }> = ({
  data,
}) => {
  const getTotal = (data || []).reduce((acc, item) => {
    const totalValue = Number(item?.totalValue?.replace(/[^\d.]/g, "") || 0);
    return acc + totalValue;
  }, 0);

  const getPercentage = (value: number) => {
    if (getTotal !== 0) {
      const percentage = (value / getTotal) * 100;
      return `${percentage.toFixed(2)}%`;
    } else {
      return `${100 / data?.length}%`;
    }
  };

  const getProgress = (data || []).map((item) => ({
    percentage: getPercentage(
      Number(item?.totalValue?.replace(/[^\d.]/g, "") || 0),
    ),
    color: getColor(item.name),
  }));

  return (
    <MainEvolutionSection>
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
      <ProgressBar progressData={getProgress} />
      <EvolutionProgress data={data} />
    </MainEvolutionSection>
  );
};

const MainEvolutionSection = styled(MoreInformation)`
  height: auto;
`;

export default EvolutionSection;
