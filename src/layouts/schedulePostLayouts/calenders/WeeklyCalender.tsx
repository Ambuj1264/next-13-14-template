import SchedulePostCard from "@/components/ui/CardContainer/SchedulePostCard";
import PostAction from "@/components/ui/modal/schedulePost/PostActions";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import { typographyParagraph, typographySubtitle1 } from "@/styles/typography";
import {
  darkblueColor,
  darkCharcoalColor,
  greyColor,
  guttersPx,
  lightGreyColor,
  whiteColor,
} from "@/styles/variables";
import { SchedulePostProp } from "@/types/global";
import {
  getDate,
  getDateWithMonth,
  isCurrentDate,
  isFutureDate,
  weekDayName,
} from "@/utils/helperUtils";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState } from "react";
import AddSchedulepost from "../AddSchedulepost";

const WeeklyCalender = () => {
  const { weeklyDates, onSecheduleOpen, filteredData } = useScheduledContext();

  const [open, setOpen] = useState<string | null>(null);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const handleClose = () => {
    setIsDelete(false);
  };
  return (
    <>
      <WeeklyCalenderWrapper>
        {weeklyDates?.map((weekDayitem, index) => {
          const date = getDateWithMonth(weeklyDates?.[index]);
          const items = filteredData.filter(
            (i: { schedulePostDate: string | number | Date }) =>
              getDate(i.schedulePostDate, weeklyDates?.[index]),
          );
          const dayName = weeklyDates?.[index]?.toLocaleDateString("en-US", {
            weekday: "long",
          });
          return (
            <WeekluCalenderItems
              key={index}
              onMouseEnter={() => {
                if (!onSecheduleOpen && isFutureDate(weekDayitem)) {
                  setOpen(weekDayitem);
                }
              }}
              onMouseLeave={() => {
                if (!onSecheduleOpen && isFutureDate(weekDayitem)) {
                  setOpen(null);
                }
              }}
              index={index}
            >
              <DayName>{dayName ? dayName : "Loading..."}</DayName>
              <ContentWrapper>
                <DateWithMonth isCurrent={isCurrentDate(weeklyDates?.[index])}>
                  {date ? date : "Loading..."}
                </DateWithMonth>
                {open === weekDayitem && <AddSchedulepost data={weekDayitem} />}
                {items?.map((item: SchedulePostProp, postIndex) => (
                  <SchedulePostCard
                    onClick={() => {
                      setIsDelete(true);
                    }}
                    key={postIndex}
                    data={item}
                  />
                ))}
              </ContentWrapper>
            </WeekluCalenderItems>
          );
        })}
      </WeeklyCalenderWrapper>
      <PostAction open={isDelete} onClose={handleClose} />
    </>
  );
};

export default WeeklyCalender;

const WeeklyCalenderWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap !important;
  align-items: strech;
  min-height: 100vh;
`;
const WeekluCalenderItems = styled.div<{
  index: number;
}>(
  ({ index }) => css`
    background: ${lightGreyColor};
    width: 100%;
    border: 1px solid ${greyColor};
    ${getBorder(index)}
  `,
);
const ContentWrapper = styled.div`
  padding: ${guttersPx.smallHalf};
`;
const DayName = styled.h1`
  ${typographySubtitle1};
  color: ${darkCharcoalColor};
  min-height: 50px;
  background: ${whiteColor};
  padding: ${guttersPx.smallHalf};
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${greyColor};
`;
export const DateWithMonth = styled.h1<{
  isCurrent: boolean;
}>(
  ({ isCurrent = false }) => css`
    ${typographyParagraph};
    color: ${greyColor};
    background-color: transparent;
    ${isCurrent ? getCurrentDateStye() : ""}
  `,
);

const getCurrentDateStye = () => css`
  padding: 5px 10px;
  width: fit-content;
  border-radius: 20px;
  background-color: ${darkblueColor};
  color: ${whiteColor};
`;

const getBorder = (index: number) => {
  const isFirstDayOfWeek = index === 0;
  const isLastDayOfWeek = index === weekDayName.length - 1;
  return `
    ${
      isFirstDayOfWeek
        ? "border-top-left-radius: 10px; border-bottom-left-radius: 10px; overflow: hidden;"
        : ""
    }
    ${
      isLastDayOfWeek
        ? "border-top-right-radius: 10px; border-bottom-right-radius: 10px; overflow: hidden;"
        : ""
    }
  `;
};
