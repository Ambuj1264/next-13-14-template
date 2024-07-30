import SchedulePost from "@/components/ui/modal/schedulePost/SchedulePost";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import { darkblueColor, guttersPx } from "@/styles/variables";
import { AddIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import styled from "@emotion/styled";
import React from "react";

const AddSchedulepost = ({ data = "" }: { data?: string }) => {
  const {
    setEditorError,
    setEditorState,
    handleSetOnScheduleOpen,
    onSecheduleOpen,
  } = useScheduledContext();

  const handleOpen = () => {
    setEditorError("");
    handleSetOnScheduleOpen(true);
  };
  const handleClose = () => {
    handleSetOnScheduleOpen(false);
    setEditorError("");
    setEditorState({ editorHtml: "" });
  };
  return (
    <>
      <Wrapper onClick={handleOpen}>
        <AddIcon width="20" height="20" />
      </Wrapper>
      <SchedulePost
        data={data}
        open={onSecheduleOpen}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default AddSchedulepost;

const Wrapper = styled.div`
  padding: 2px;
  display: flex;
  justify-content: center;
  border: 1px solid ${darkblueColor};
  border-radius: 5px;
  margin-top: ${guttersPx.smallHalf};
  width: 100%;
  cursor: pointer;
`;
