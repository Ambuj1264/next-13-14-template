import SchedulePostCard from "@/components/ui/CardContainer/SchedulePostCard";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import { greyColor, guttersPx, lightGreyColor } from "@/styles/variables";
import {
  getCurrentMonthDates,
  getDate,
  getDateWithMonth,
  isCurrentDate,
  isFutureDate,
} from "@/utils/helperUtils";
import styled from "@emotion/styled";
import React, { useState } from "react";
import AddSchedulepost from "../AddSchedulepost";
import { DateWithMonth } from "./WeeklyCalender";

const MonthlyCalender = () => {
  const allMonths = getCurrentMonthDates();
  const { filteredData } = useScheduledContext();
  const { onSecheduleOpen } = useScheduledContext();

  const [open, setOpen] = useState<string | null>(null);
  const handleMouseEnter = (currentitem: Date) => {
    setOpen(currentitem?.toLocaleDateString());
  };

  return (
    <>
      <Container>
        {allMonths.map((item, index) => {
          const date = getDateWithMonth(item);
          const items = filteredData.filter(
            (i: { schedulePostDate: string | number | Date }) =>
              getDate(i.schedulePostDate, item),
          );
          return (
            <Item
              key={index}
              onMouseEnter={() => {
                if (!onSecheduleOpen && isFutureDate(item)) {
                  handleMouseEnter(item);
                }
              }}
              onMouseLeave={() => {
                if (!onSecheduleOpen && isFutureDate(item)) {
                  setOpen(null);
                }
              }}
            >
              <DateWithMonth isCurrent={isCurrentDate(item)}>
                {date}
              </DateWithMonth>
              {open === item?.toLocaleDateString() && (
                <AddSchedulepost data={item?.toString()} />
              )}
              {items?.map((Dateitem, postIndex) => (
                <SchedulePostCard key={postIndex} data={Dateitem} />
              ))}
            </Item>
          );
        })}
      </Container>
    </>
  );
};

export default MonthlyCalender;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  width: 100%;
  margin: 0;
`;

const Item = styled.div`
  padding: ${guttersPx.smallHalf};
  box-sizing: border-box;
  min-height: 184px;
  min-width: 185px;
  background: ${lightGreyColor};
  border: 1px solid ${greyColor};
`;
