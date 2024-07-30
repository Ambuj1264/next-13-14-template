import SchedulePostCard from "@/components/ui/CardContainer/SchedulePostCard";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import { greyColor, guttersPx, lightGreyColor } from "@/styles/variables";
import {
  findTime,
  getDateWithMonth,
  isCurrentDate,
  timeZone,
} from "@/utils/helperUtils";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { DATE } from "../CalenderHeader";

const DailyCalender = () => {
  const [dates, setDates] = useState(new Date());
  const handleNextDate = () => {
    const nextDate = new Date(
      dates.getFullYear(),
      dates.getMonth(),
      dates.getDate() + 1,
    );
    setDates(nextDate);
  };
  const handlePrevDate = () => {
    const nextDate = new Date(
      dates.getFullYear(),
      dates.getMonth(),
      dates.getDate() - 1,
    );
    setDates(nextDate);
  };
  const { filteredData } = useScheduledContext();
  const dateTitle = getDateWithMonth(dates) || "";
  return (
    <DailyCalenderWrapper>
      <DateWrapper>
        <DATE
          handleprev={handlePrevDate}
          handleNext={handleNextDate}
          title={dateTitle}
          isTime={false}
        />
      </DateWrapper>
      <CalenderWrapper>
        {timeZone.map((time, index) => {
          const items = filteredData.filter(
            (i) =>
              isCurrentDate(i.schedulePostDate) && findTime(i.time) === time,
          );
          return (
            <TimeWrapper key={index}>
              <HeadingWrapper>
                <Time>{time}</Time>
                <Hr></Hr>
              </HeadingWrapper>
              <CardWrapper>
                {items?.map((Dateitem, postIndex) => (
                  <SchedulePostCard key={postIndex} data={Dateitem} />
                ))}
              </CardWrapper>
            </TimeWrapper>
          );
        })}
      </CalenderWrapper>
    </DailyCalenderWrapper>
  );
};

export default DailyCalender;

const DailyCalenderWrapper = styled.div`
  background: ${lightGreyColor};
  border-radius: ${guttersPx.small};
  border: 1px solid ${greyColor};
  padding: ${guttersPx.small};
`;
const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${guttersPx.small};
`;
const CalenderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: ${guttersPx.small} 0;
`;
const CardWrapper = styled.div`
  margin-left: 100px;
  & > div {
    max-width: 348px;
  }
  max-height: 200px;
  overflow-y: auto;
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: ${guttersPx.smallHalf};
    border-radius: 20px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
  }
`;

const TimeWrapper = styled.div``;
const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Time = styled.div``;
const Hr = styled.hr`
  border: 1px dashed ${greyColor};
  width: 100%;
`;
