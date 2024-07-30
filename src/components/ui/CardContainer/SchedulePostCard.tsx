import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import {
  whiteColor,
  darkCharcoalColor,
  greyColor,
  buttonCursor,
  guttersPx,
  fontFamily,
  fullWidth,
  aquamarineColor,
} from "@/styles/variables";
import {
  typographyCaptionNormal,
  typographyCaptionSmall,
  typographySubtitle3,
} from "@/styles/typography";
import {
  RocketSGV,
  DraftSGV,
  HasPDFSGV,
  PersonSGV,
  CopyLink,
  Comment,
  LinkedinRounded,
  Clock,
} from "@/utils/formUtils/InputSvg/InputSvg";
import CustomTooltip from "../tooltip/CustomTooltip";
import { truncateWords } from "@/utils/helperUtils";
import { RenderHTML } from "../HtmlRenderer/RenderHTML";
import { useQueryContext } from "@/context/query/queryContext";

const CardContainer = styled.div`
  border-radius: 5px;
  background: ${whiteColor};
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 1rem 0;
  padding: ${guttersPx.small};
  cursor: ${buttonCursor};
  &:hover {
    box-shadow: -2px 1px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 0;
  gap: ${guttersPx.smallHalf};
`;

const Time = styled.div`
  color: ${greyColor};
  ${typographyCaptionSmall};
  font-family: ${fontFamily};
`;

const Name = styled.h1`
  color: ${darkCharcoalColor};
  ${typographyCaptionNormal};
`;

const LinkedInSvg = styled.span`
  width: 19px;
  height: 20px;
`;

const StyledImage = styled(Image)`
  width: ${fullWidth};
`;

const CardIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: ${guttersPx.smallHalf};
`;
const Lefticons = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;
const Righticons = styled.div`
  color: ${aquamarineColor};
  ${typographySubtitle3};
  display: flex;
  align-items: center;
  gap: 2px;
`;
const SchedulePostCard = ({
  data,
  onClick,
}: {
  data?: any;
  onClick?: () => void;
}) => {
  const { profiledata } = useQueryContext();

  function convertTime(timeString: {
    split: (arg0: string) => {
      (): any;
      new (): any;
      map: { (arg0: NumberConstructor): [any, any, any]; new (): any };
    };
  }) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const hoursInMinutes = hours * 60;
    const minutesInMinutes = minutes;
    const totalMinutes = hoursInMinutes + minutesInMinutes;
    const hoursFormatted = Math.floor(totalMinutes / 60).toString();
    const minutesFormatted = (totalMinutes % 60).toString().padStart(2, "0");
    return `${hoursFormatted}:${minutesFormatted}h`;
  }

  const { fullName } = profiledata?.getUserDetailsById || {};
  console.log(data, "data");
  return (
    <CardContainer onClick={onClick}>
      <FlexContainer>
        <LinkedInSvg>
          <LinkedinRounded />
        </LinkedInSvg>
        <Name>{fullName}</Name>
      </FlexContainer>
      <FlexContainer>
        <Clock />
        <Time>{convertTime(data?.time)}</Time>
      </FlexContainer>
      <StyledImage
        src={data?.img[0]}
        width={125}
        height={60}
        alt="Schedule Card"
      />
      {data?.content && <RenderHTML html={truncateWords(data?.content, 60)} />}
      <CardIconWrapper>
        <Lefticons>
          {data?.isPublish && <RocketSGV />}

          {!data?.isPublish && (
            <CustomTooltip title="Draft" placement="bottom">
              <DraftSGV />
            </CustomTooltip>
          )}

          {data?.isRepost && (
            <>
              <CustomTooltip title="Schedule" placement="bottom">
                <HasPDFSGV />
              </CustomTooltip>
              <CustomTooltip title="Link Added" placement="bottom">
                <CopyLink width="18" height="18" color="#64C7B0" />
              </CustomTooltip>
              <CustomTooltip title="A comment written" placement="bottom">
                <Comment color="#64C7B0" width="18" height="18" />
              </CustomTooltip>
            </>
          )}
        </Lefticons>
        {data?.isPublish && (
          <Righticons>
            3
            <CustomTooltip title="Leads Post" placement="bottom">
              <PersonSGV />
            </CustomTooltip>
          </Righticons>
        )}
      </CardIconWrapper>
    </CardContainer>
  );
};

export default SchedulePostCard;
