import SmallButton from "@/components/ui/button/SmallButton";
import InputBox from "@/components/ui/input/InputBox";
import DatePickerModal from "@/components/ui/modal/DatePickerModal";
import SelectBox from "@/components/ui/selectBox/SelectBox";
import CustomTooltip from "@/components/ui/tooltip/CustomTooltip";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import {
  typographyH4Regular,
  typographySmall,
  typographySubtitle2Normal,
} from "@/styles/typography";
import {
  darkblueColor,
  darkCharcoalColor,
  fontFamily,
  fontSizeBody2,
  fontWeightNormal,
  GreenTeal,
  guttersPx,
  lightRedColor,
  whiteColor,
} from "@/styles/variables";
import { schedulePostOption } from "@/utils/constant";
import {
  DateIcon,
  searchIcon,
  TodayIcon,
} from "@/utils/formUtils/InputSvg/InputSvg";
import { formatDateRange, getCurrentWeekDates } from "@/utils/helperUtils";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CalenderHeader = () => {
  const {
    filteredTeams,
    calenderType,
    searchPosts,
    handleScheduleType,
    handleSetWeeklyDates,
  } = useScheduledContext();
  let cWeek = getCurrentWeekDates();
  const [weeks, setWeeks] = useState({ from: cWeek.from, to: cWeek.to });
  const handlePrevWeekClick = () => {
    const prevWeek = {
      from: new Date(
        weeks.from.getFullYear(),
        weeks.from.getMonth(),
        weeks.from.getDate() - 7,
      ),
      to: new Date(
        weeks.to.getFullYear(),
        weeks.to.getMonth(),
        weeks.to.getDate() - 7,
      ),
    };
    setWeeks(prevWeek);
  };

  const handleNextWeekClick = () => {
    const nextWeekFrom1 = new Date(
      weeks.to.getFullYear(),
      weeks.to.getMonth(),
      weeks.to.getDate() + 1,
    );
    const nextWeekTo2 = new Date(
      nextWeekFrom1.getFullYear(),
      nextWeekFrom1.getMonth(),
      nextWeekFrom1.getDate() + 6,
    );
    setWeeks({ from: nextWeekFrom1, to: nextWeekTo2 });
  };
  function getDatesBetween(
    startDate: string | number | Date,
    endDate: number | Date,
  ) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    handleSetWeeklyDates(dates);
    return dates;
  }
  useEffect(() => {
    getDatesBetween(weeks.from, weeks.to);
  }, [weeks.from, weeks.to]);
  const DateTitle = formatDateRange(weeks);
  const { values, errors, handleChange } = useFormik({
    initialValues: { search: "", members: "All members", data: "All" },
    onSubmit: async () => {
      console.log("success");
    },
  });

  const handleSearch = (e: { target: { value: string } }) => {
    handleChange(e);
    searchPosts(e.target.value);
  };
  console.log(values, "???values");

  const defaultValue = { label: "All members", value: "All members" };

  const teamMembers = filteredTeams?.map((item) => ({
    label: `Team:${item.teamName}`,
    value: item.teamName,
  }));
  const allMembers = [defaultValue, ...teamMembers];
  return (
    <HeaderWrapper>
      <LeftContentWrapper>
        <InputWrapper>
          <InputBox
            type="text"
            placeholder={"Search"}
            name="search"
            value={values.search}
            autocomplete="off"
            error={errors.search || ""}
            onChange={handleSearch}
            Icon={searchIcon}
          />
        </InputWrapper>
        <SelectBox
          name="members"
          options={allMembers}
          value={values?.members}
          onChange={handleChange}
          sx={selectBoxstyle}
        />
        <SelectBox
          name="data"
          options={schedulePostOption}
          value={values?.data}
          onChange={handleChange}
          sx={selectBoxstyle}
        />
      </LeftContentWrapper>
      {calenderType === "weekly" && (
        <DATE
          handleprev={handlePrevWeekClick}
          handleNext={handleNextWeekClick}
          title={DateTitle}
        />
      )}
      <RightContentWrapper>
        {btnType.map((btn) => (
          <StyledBtn
            bgcolor={calenderType === btn.value ? darkblueColor : whiteColor}
            color={calenderType === btn.value ? whiteColor : darkCharcoalColor}
            key={btn.id}
            onClick={() => {
              handleScheduleType(btn.value);
            }}
          >
            {btn.name}
          </StyledBtn>
        ))}
      </RightContentWrapper>
    </HeaderWrapper>
  );
};

export default CalenderHeader;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${guttersPx.extraLarge} 0;
`;
const StyledBtn = styled(SmallButton)<{ bgcolor?: string; color: string }>(
  ({ bgcolor, color }) => css`
    background: ${bgcolor};
    color: ${color};
    border-radius: 5px;
    width: auto;
    ${typographySmall};
    border: 1px solid ${darkblueColor};
  `,
);

const LeftContentWrapper = styled.div`
  display: flex;
  gap: ${guttersPx.smallHalf};
`;
const CenterContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.small};
  svg {
    cursor: pointer;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
  input {
    ${typographySubtitle2Normal};
  }
  span {
    display: block;
    z-index: 1;
  }
  span:nth-of-type(2) {
    display: none;
  }
`;
const RightContentWrapper = styled.div`
  display: flex;
  gap: ${guttersPx.small};
`;
const selectBoxstyle = {
  mb: 1,
  color: darkCharcoalColor,
  fontFamily: fontFamily,
  fontSize: fontSizeBody2,
  fontWeight: fontWeightNormal,
};
const btnType = [
  {
    id: 1,
    name: "Daily",
    value: "daily",
  },
  {
    id: 2,
    name: "Weekly",
    value: "weekly",
  },
  {
    id: 3,
    name: "Monthly",
    value: "monthly",
  },
];

export const DATE = ({
  handleprev,
  handleNext,
  title,
  isTime = true,
}: {
  handleprev: () => void;
  handleNext: () => void;
  title: string;
  isTime?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CenterContent>
        <CustomTooltip title="Go to today" placement="bottom">
          <TodayIcon color={lightRedColor} />
        </CustomTooltip>
        <CustomTooltip title="Change data" placement="bottom">
          <DateIcon color={GreenTeal} onclick={handleClickOpen} />
        </CustomTooltip>
        <StyledICon
          onClick={handleprev}
          src="/assets/icons/nextIcon.png"
          width={10}
          height={16}
          alt="next"
        />
        <StyledDate>{title}</StyledDate>
        <StyledICon
          onClick={handleNext}
          src="/assets/icons/prevIcon.png"
          width={10}
          height={16}
          alt="prev"
        />
      </CenterContent>
      <DatePickerModal isTime={isTime} open={open} closeModal={handleClose} />
    </>
  );
};

const StyledICon = styled(Image)`
  object-fit: contain;
  cursor: pointer;
`;
const StyledDate = styled.div`
  ${typographyH4Regular};
  color: ${darkCharcoalColor};
`;
