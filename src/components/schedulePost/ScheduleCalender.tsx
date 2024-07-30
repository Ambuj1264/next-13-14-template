import { useQueryContext } from "@/context/query/queryContext";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import DailyCalender from "@/layouts/schedulePostLayouts/calenders/DailyCalender";
import MonthlyCalender from "@/layouts/schedulePostLayouts/calenders/MonthlyCalender";
import WeeklyCalender from "@/layouts/schedulePostLayouts/calenders/WeeklyCalender";
import { gutters } from "@/styles/variables";
import { calenderName } from "@/utils/constant";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo } from "react";
const CalenderHeader = dynamic(
  () => import("@/layouts/schedulePostLayouts/CalenderHeader"),
  {
    loading: () => <p>Loading...</p>,
  },
);

const ScheduleCalender = () => {
  const { calenderType } = useScheduledContext();
  const { membersRefecth } = useQueryContext();
  useEffect(() => {
    membersRefecth();
  }, []);

  const getCalender = useMemo(() => {
    let CalenderComponent;
    switch (calenderType) {
      case calenderName.Daily:
        CalenderComponent = DailyCalender;
        break;
      case calenderName.Weekly:
        CalenderComponent = WeeklyCalender;
        break;
      case calenderName.Monthly:
        CalenderComponent = MonthlyCalender;
        break;
      default:
        CalenderComponent = null;
    }

    return CalenderComponent ? <CalenderComponent /> : null;
  }, [calenderType]);

  return (
    <div>
      <CalenderHeader />
      <CalenderWrapper>{getCalender}</CalenderWrapper>
    </div>
  );
};

export default ScheduleCalender;

const CalenderWrapper = styled.div`
  margin-top: ${gutters.medium * 2}px;
`;
