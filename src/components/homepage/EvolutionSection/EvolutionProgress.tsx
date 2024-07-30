import React from "react";
import styled from "@emotion/styled";
import { gutters } from "@/styles/variables";
import { mqMax } from "@/styles/base";
import CardBoxSmall from "@/layouts/Cards/CardBoxSmall";
import { DashboardEvolution } from "./EvolutionSection";

const EvolutionProgress: React.FC<{ data: DashboardEvolution[] }> = ({
  data,
}) => {
  return (
    <EvolutionMain>
      {data?.map((item, index) => (
        <CardBoxSmall
          key={index}
          showProgress={false}
          showTopContent={true}
          amount={item.totalValue}
          numberdeal={item.dealsValue}
          statusTop={item.name}
          title={""}
        />
      ))}
    </EvolutionMain>
  );
};

const EvolutionMain = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  grid-area: content;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${gutters.small}px;
  ${mqMax.medium} {
    flex-direction: column;
  }
`;

export default EvolutionProgress;
