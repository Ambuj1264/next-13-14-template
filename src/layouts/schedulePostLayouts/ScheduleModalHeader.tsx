import { GroupBadge } from "@/components/ui/avatar/Avatar";
import { FlexContainer } from "@/components/ui/modal/schedulePost/SchedulePost";
import { buttonCursor, greyColor } from "@/styles/variables";
import { CancelIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import styled from "@emotion/styled";
import React from "react";

interface HeaderBudgeProps {
  name: string;
  background: string;
  value?: string;
  profilePicture?: string;
}
interface GetTeamMembersByCompanyId {
  getTeamMembersByCompanyId: HeaderBudgeProps[];
}

const StyledBudge = styled.div`
  div {
    margin: 0 !important;
  }
  margin-bottom: 10px !important;
`;
const ScheduleModalHeader = ({
  headerBudge,
  headerText,
  onClose,
}: {
  headerBudge?: GetTeamMembersByCompanyId;
  headerText?: string;
  onClose: () => void;
}) => {
  return (
    <>
      <FlexContainer>
        {headerBudge && (
          <StyledBudge>
            {" "}
            <GroupBadge
              name="teamMembers"
              error={""}
              selectable
              data={headerBudge?.getTeamMembersByCompanyId || []}
              dimension="43"
              imgDimension={43}
            />
          </StyledBudge>
        )}
        {headerText && <p>{headerText}</p>}
        <CrossIcon onClick={onClose}>
          <CancelIcon
            color={greyColor}
            width={"25"}
            height={"25"}
            onClick={onClose}
          />
        </CrossIcon>
      </FlexContainer>
    </>
  );
};

export default ScheduleModalHeader;

const CrossIcon = styled.div`
  cursor: ${buttonCursor};
  width: 25px;
  height: 25px;
`;
