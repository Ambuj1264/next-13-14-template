import AvatarUI from "@/components/ui/avatar/Avatar";
import CustomTooltip from "@/components/ui/tooltip/CustomTooltip";
import { mqMax, mqMin } from "@/styles/base";
import {
  typographyCaptionSmall,
  typographySubtitle2Normal,
} from "@/styles/typography";
import {
  babyPinkColor,
  buttonCursor,
  darkCharcoalColor,
  greyColor,
  gutters,
  guttersPx,
  lightGreenColor,
  lightGreyColor,
  redColor,
} from "@/styles/variables";
import { getSymbol, truncateWords } from "@/utils/helperUtils";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

type ProfileWrapperProps = {
  isLost?: boolean;
  isWon?: boolean;
};

const getBackgroundColor = (props: ProfileWrapperProps) => {
  if (props.isLost) return babyPinkColor;
  if (props.isWon) return lightGreenColor;
  return lightGreyColor;
};

const ProfileWrapper = styled.div<ProfileWrapperProps>`
  border-radius: 5px;
  background: ${(props) => getBackgroundColor(props)};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  max-width: 237px;
  max-height: 100%;
  width: 100%;
  min-height: 148px;
  padding: ${gutters.small}px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: ${buttonCursor};
  ${mqMax.large} {
    max-width: 100%;
    flex-direction: column-reverse;
    word-break: break-all;
  }
  ${mqMin.medium} {
    max-width: 100%;
  }
`;
const LeftContent = styled.div`
  padding: 0;
`;
const Name = styled.h1(
  [typographySubtitle2Normal],
  `
color:${darkCharcoalColor};
woed
padding-bottom:${guttersPx.smallHalf};
`,
);

const Type = styled.h3(
  [typographyCaptionSmall],
  `
color:${darkCharcoalColor};
padding-bottom:${guttersPx.smallHalf};

`,
);

const Tittle1 = styled.h3(
  [typographyCaptionSmall],
  `
color:${greyColor};
padding-bottom:${guttersPx.smallHalf};

`,
);
const Tittle2 = styled.h3(
  [typographyCaptionSmall],
  `
color:${greyColor};
`,
);

const Status = styled.p(
  [typographyCaptionSmall],
  `
color:${redColor};
font-size: ${guttersPx.smallHalf};
`,
);

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const LeadWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 5px;
`;
const LinkedinProfile = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-bottom: ${guttersPx.smallHalf};
  gap: 2px;
`;

const WarningImg = styled(Image)`
  position: absolute;
  right: 2px;
  top: 2px;
`;
interface ProfileProps {
  data: Record<string, any>;
  onProfileOpen?: any;
}

const ProfileCard = ({ data, onProfileOpen }: ProfileProps) => {
  const handleProfileOpen = () => {
    if (onProfileOpen) {
      onProfileOpen(data?.id);
    }
  };
  const symbol = getSymbol(data?.valueType);
  return (
    <>
      <ProfileWrapper
        isLost={data?.dealManagement_isLost}
        isWon={data?.dealManagement_isWon}
        onClick={handleProfileOpen}
      >
        <LeftContent>
          <Name>{truncateWords(data?.name, 15)}</Name>
          <Type>{truncateWords(data?.organization, 15)}</Type>
          <Tittle1>{data?.stage.boardName}</Tittle1>
          {data?.email && <Tittle1>{data?.email}</Tittle1>}
          <a href={data?.linkedin || ""} target="_blank">
            {" "}
            <LinkedinProfile>
              <Image
                src="/assets/icons/Linkedin.svg"
                alt="ArrowIcon"
                width={10}
                height={10}
              />
              <Tittle2>Linkedin</Tittle2>
            </LinkedinProfile>
          </a>
          {data?.expectedCloseDate && (
            <Status>Last contact: {data?.expectedCloseDate}</Status>
          )}
        </LeftContent>
        <RightContent>
          <AvatarUI
            teammembers={data?.teamMembers}
            image={data?.leadImage || ""}
          />
          <LeadWrapper>
            {data?.value && (
              <Tittle2>
                {symbol}
                {data?.value}
              </Tittle2>
            )}
            <Image
              src="/assets/images/Person.png"
              height={14}
              width={14}
              alt="person"
            />
          </LeadWrapper>
          {data?.isincomplete && (
            <CustomTooltip title="Lack Information" placement="right">
              <WarningImg
                src="/assets/icons/warnning.svg"
                width={23}
                height={23}
                alt="w"
              />
            </CustomTooltip>
          )}
        </RightContent>
      </ProfileWrapper>
    </>
  );
};

export default ProfileCard;
