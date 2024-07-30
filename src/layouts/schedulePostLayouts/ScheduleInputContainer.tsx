import React from "react";
import {
  greyColor,
  buttonCursor,
  borderRadiusLarger,
  silverGrayColor,
  guttersPx,
} from "@/styles/variables";
import styled from "@emotion/styled";
import { CommentIcon, ViewIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import { ActionProps } from "@/types/global";
import DropZone from "@/components/ui/fileUpload/DropZone";
import CustomTooltip from "@/components/ui/tooltip/CustomTooltip";

import { TextEditor } from "@/components/ui/input/TextEditor";

const TextAreaContainer = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: ${borderRadiusLarger};
  border: 1px solid ${greyColor};
  background: ${silverGrayColor};
  margin: 1.5rem 0;
  padding: ${guttersPx.medium};
`;

const HrRule = styled.div`
  height: 0.5px;
  background: ${greyColor};
  margin: ${guttersPx.mediumHalf} auto;
`;

const FlexIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.medium};
  svg {
    cursor: ${buttonCursor};
  }
`;

const ScheduleInputContainer = ({
  postaction,
  placeholderTextArea,
  hideLink = false,
  setValues,
}: {
  placeholderTextArea: string;
  postaction?: boolean;
  hideLink?: boolean;
  setValues?: any;
}) => {
  const { handleScheduleActions } = useScheduledContext();
  const hanldeOpen = (name: keyof ActionProps) => {
    handleScheduleActions(name, true);
  };

  return (
    <>
      <TextAreaContainer>
        <TextEditor placeholder={placeholderTextArea} hideLink={hideLink} />
        <DropZone setValues={setValues} />
        {postaction && (
          <>
            <HrRule />
            <FlexIcon>
              <CustomTooltip title="Preview" placement="bottom">
                <ViewIcon
                  onClick={() => {
                    hanldeOpen("isPreview");
                  }}
                />
              </CustomTooltip>
              <CustomTooltip title="Write a coment" placement="bottom">
                <CommentIcon
                  onClick={() => {
                    hanldeOpen("isComment");
                  }}
                />
              </CustomTooltip>
            </FlexIcon>
          </>
        )}
      </TextAreaContainer>
    </>
  );
};

export default ScheduleInputContainer;
