import React, { useState } from "react";
import Modal from "./Modal";
import styled from "@emotion/styled";
import SmallButton from "../button/SmallButton";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  darkblueColor,
  whiteColor,
  darkCharcoalColor,
  fontSizeBody2,
  borderRadiusBig,
  lightGreyColor,
  blackColor,
  fontFamily,
  guttersPx,
} from "@/styles/variables";
import { Box } from "@mui/material";
import { typographyH3 } from "@/styles/typography";
import {
  CalenderNextICon,
  CalenderPrevICon,
} from "@/utils/formUtils/InputSvg/InputSvg";
import { datePickerStyles } from "@/styles/base";
const ModalContainer = styled.div`
  width: 100%;
  font-family: Inter !important;
  padding: ${guttersPx.extraLarge};
`;

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.medium};
  justify-content: flex-end;
  margin-top: ${guttersPx.large};
`;

const Button = styled(SmallButton)`
  width: 105px;
  height: 36px;
  border-radius: ${guttersPx.smallHalf};
  font-size: ${fontSizeBody2};
`;

type ButtonStyles = {
  background: string;
  text: string;
  border: string;
};

const generateButtonStyles = ({
  background,
  text,
  border,
}: ButtonStyles) => styled(Button)`
  width: 105px;
  height: 36px;
  border-radius: 5px;
  background: ${background};
  color: ${text};
  border: 1px solid ${border};
  box-shadow: none;
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
  }
`;

const ScheduleButton = generateButtonStyles({
  background: darkblueColor,
  text: whiteColor,
  border: darkblueColor,
});

const DraftButton = generateButtonStyles({
  background: whiteColor,
  text: darkCharcoalColor,
  border: darkCharcoalColor,
});

const InputContainer = styled.div`
  border-radius: ${borderRadiusBig};
  background: ${lightGreyColor};
  display: flex;
  justify-content: center;
  padding: ${guttersPx.medium};
  align-items: center;
  gap: ${guttersPx.smallHalf};
  border-radius: ${guttersPx.smallHalf};
  margin: ${guttersPx.medium} 0;
`;

const StyledInput = styled.input`
  width: 54px;
  height: 54px;
  outline: none;
  color: ${blackColor};
  text-align: center;
  font: 400 20px ${fontFamily};
  background: transparent;
  border-radius: ${guttersPx.smallHalf};
  border: 2px solid ${darkblueColor};
`;

const DatePickerModal = ({
  open,
  closeModal,
  isTime,
}: {
  open: boolean;
  closeModal: () => void;
  isTime: boolean;
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => dayjs(prevDate).subtract(1, "month"));
  };
  const handleNextMonth = () => {
    setSelectedDate((prevDate) => dayjs(prevDate).add(1, "month"));
  };

  const handleChange = (value: Dayjs | null) => {
    if (dayjs.isDayjs(value)) {
      setSelectedDate(value);
    }
  };
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <>
      <Modal
        open={open}
        width="550px"
        closeModal={closeModal}
        sx={{ p: 0, width: "550px" }}
        maxWidth={false}
        styles={{ borderRadius: guttersPx.extraLarge }}
      >
        <ModalContainer>
          <DatePickerContainer>
            <CalenderPrevICon onClick={handlePrevMonth} />
            <StyledDate>{dayjs(selectedDate)?.format("MMMM YYYY")}</StyledDate>
            <CalenderNextICon onClick={handleNextMonth} />
          </DatePickerContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={datePickerStyles}>
              <DateCalendar
                value={selectedDate}
                dayOfWeekFormatter={(_day, weekday) => {
                  return days[(days.indexOf(weekday.format("dd")) + 1) % 7];
                }}
                views={["day"]}
                onChange={handleChange}
                showDaysOutsideCurrentMonth
                disablePast
              />
            </Box>
          </LocalizationProvider>

          {isTime && (
            <InputContainer>
              <StyledInput type="text" value="00" maxLength={2} minLength={2} />
              :
              <StyledInput type="text" value="00" maxLength={2} minLength={2} />
            </InputContainer>
          )}

          <ButtonFlex>
            <DraftButton onClick={closeModal} type="button">
              Cancel
            </DraftButton>
            <ScheduleButton type="button">Schedule</ScheduleButton>
          </ButtonFlex>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default DatePickerModal;

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${guttersPx.small};
  svg {
    cursor: pointer;
  }
`;

const StyledDate = styled.div`
  ${typographyH3};
  color: ${darkCharcoalColor};
`;
