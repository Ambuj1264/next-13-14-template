import React from "react";
import Modal from "../Modal";
import styled from "@emotion/styled";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ModalHeading from "@/components/schedulePost/ModalHeading";
import {
  DraftButton,
  ScheduleButton,
} from "@/shared/UserMenu/SharedUserMenuComponents";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import { FooterComponent } from "@/components/schedulePost/CommonComponent";
import ScheduleInputContainer from "@/layouts/schedulePostLayouts/ScheduleInputContainer";
import { typographyParagraph } from "@/styles/typography";
import { greyColor, guttersPx } from "@/styles/variables";
import InputBox from "../../input/InputBox";
import SelectBox from "../../selectBox/SelectBox";
import { useFormik } from "formik";
import { ModalContainer } from "./SchedulePost";

const ContentContainer = styled.div`
  width: 100%;
`;

const HeaderActionContainer = styled.div`
  display: flex;
  gap: ${guttersPx.medium};
  align-items: center;
`;

const PostCommentHeader = styled.h1`
  ${typographyParagraph};
  color: ${greyColor};
`;
const InputWrapper = styled.div`
  max-width: 100px;
  margin-top: 10px;
  input {
    text-align: center;
    padding-left: 0 !important;
  }
`;

const CommentPost = ({
  open,
  closeHandler,
}: {
  open: boolean;
  closeHandler: () => void;
}) => {
  const actionBtn = [
    {
      button: <DraftButton type="button">Cancel</DraftButton>,
    },
    {
      button: <ScheduleButton type="button">Save</ScheduleButton>,
    },
  ];

  const { values, handleChange, errors } = useFormik({
    initialValues: { numbers: "0", time: "Minutes" },
    onSubmit: () => {
      console.log("testSubmit");
    },
  });

  return (
    <>
      <Modal
        open={open}
        styles={{ borderRadius: "10px" }}
        width="911"
        closeModal={closeHandler}
        maxWidth={false}
      >
        <ModalContainer>
          <ModalHeader
            component={<ModalHeading heading={"Comments"} />}
            showClose
            onclose={closeHandler}
          />
          <ContentContainer>
            <HeaderActionContainer>
              <PostCommentHeader>Post comment after:</PostCommentHeader>
              <InputWrapper>
                <InputBox
                  onChange={handleChange}
                  type={"text"}
                  placeholder="Write a comment..."
                  name="numbers"
                  value={values.numbers}
                  autocomplete={"off"}
                  error={errors.numbers}
                  maxLength={2}
                  min={1}
                />
              </InputWrapper>
              <SelectBox
                width="auto"
                name="time"
                options={options}
                value={values.time}
                onChange={handleChange}
              />
            </HeaderActionContainer>
            <ScheduleInputContainer
              hideLink
              placeholderTextArea={"Write a comment..."}
            />
          </ContentContainer>
          <ModalFooter componentRight={<FooterComponent data={actionBtn} />} />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default CommentPost;

const options = [
  { value: "Minutes", label: "Minutes" },
  { value: "Hours", label: "Hours" },
  { value: "Days", label: "Days" },
];
