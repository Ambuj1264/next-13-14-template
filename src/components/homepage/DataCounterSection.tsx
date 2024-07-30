import React from "react";
import styled from "@emotion/styled";
import { gutters } from "@/styles/variables";
import { mqMax } from "@/styles/base";
import CardBoxSmall from "@/layouts/Cards/CardBoxSmall";

interface DashboardDetail {
  name: string;
  value: string;
  percentageChange: string;
  determine: string;
}
const DataCounterSection: React.FC<{ data: DashboardDetail[] }> = ({
  data,
}) => {
  return (
    <DataBox>
      {data?.map((item, index) => (
        <CardBoxSmall
          key={index}
          title={item.name}
          amount={item?.value}
          percentage={item?.percentageChange}
          status={item?.determine}
          showProgress
          showTopContent={false}
          showDots
        />
      ))}
    </DataBox>
  );
};

const DataBox = styled.div`
  display: flex;
  gap: 30px;
  padding: 0rem ${gutters.small * 4}px;
  margin-top: -${gutters.small * 5}px;
  align-items: center;
  grid-area: content;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mqMax.medium} {
    flex-direction: column;
    margin-bottom: ${gutters.large}px;
    width: -webkit-fill-available;
    padding: unset;
    gap: ${gutters.large}px;
  }
`;

export default DataCounterSection;
