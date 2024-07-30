import SmallButton from "@/components/ui/button/SmallButton";
import Image from "next/image";
import React from "react";
import styled from "@emotion/styled";
import {
  darkblueColor,
  darkCharcoalColor,
  whiteColor,
} from "@/styles/variables";
import { FlexContainer } from "@/components/ui/modal/schedulePost/SchedulePost";

const ScheduleModelFooter = () => {
  return (
    <FlexContainer>
      <StyledImg
        src="/assets/icons/socialmotionLogo.png"
        height={40}
        width={100}
        alt="logo"
      />
      <ButtonFlex>
        <DraftButton type="button">Draft</DraftButton>
        <ScheduleButton type="button">Schedule</ScheduleButton>
      </ButtonFlex>
    </FlexContainer>
  );
};

export default ScheduleModelFooter;

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Button = styled(SmallButton)`
  width: 105px;
  height: 36px;
  border-radius: 5px;
  font-size: 14px;
`;

const DraftButton = styled(Button)`
  background: white;
  color: ${darkCharcoalColor};
  border: 1px solid ${darkCharcoalColor};
  box-shadow: none;
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
  }
`;

const ScheduleButton = styled(Button)`
  background: ${darkblueColor};
  box-shadow: none;
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
  }
`;

const StyledImg = styled(Image)`
  width: auto;
  height: auto;
`;
