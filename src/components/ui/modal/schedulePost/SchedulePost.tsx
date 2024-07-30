"use client";
import React from "react";
import { useQueryContext } from "@/context/query/queryContext";
import styled from "@emotion/styled";
import Modal from "../Modal";
import ScheduleInputContainer from "@/layouts/schedulePostLayouts/ScheduleInputContainer";
import { guttersPx } from "@/styles/variables";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import { GroupBadge } from "../../avatar/Avatar";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import {
  DraftButton,
  ScheduleButton,
} from "@/shared/UserMenu/SharedUserMenuComponents";
import { FooterComponent } from "@/components/schedulePost/CommonComponent";
import PreviewPost from "./PreviewPost";
import CommentPost from "./CommentPost";
import { useScheduledContext } from "@/context/schedule/scheduledContext";
import { socialmotionLogo } from "@/layouts/schedulePostLayouts/shared/SharedComponent";
import { useMutation } from "@apollo/client";
import { CREATE_SCHEDULE_POST } from "@/lib/graphql/mutation/schedulePost";
import { useFormik } from "formik";
import { errorToast, successToast } from "@/styles/toaster";
import { s3UploadMethod } from "@/utils/awsFileUploder";

export const ModalContainer = styled.div`
  width: 100%;
  min-width: 790px;
  padding: ${guttersPx.large};
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledBudge = styled.div`
  div {
    margin: 0 !important;
  }
  margin-bottom: 10px !important;
`;
const SchedulePost = ({
  data,
  open,
  onClose,
  onOpen,
}: {
  data: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const { teammembers, profiledata } = useQueryContext();
  const { editorState, getEditorErr, refetch } = useScheduledContext();

  const [handleSchedulePost, { loading }] = useMutation(CREATE_SCHEDULE_POST, {
    fetchPolicy: "network-only",
    onCompleted: refetch,
  });
  const now = new Date();
  const { values, handleChange, setFieldValue, resetForm }: any = useFormik({
    initialValues: {
      teamMembers: [],
      img: [],
    },
    onSubmit: () => {
      console.log("test");
    },
  });

  const onSchedulePost = async (value: string) => {
    const isValid = getEditorErr(editorState.editorHtml);
    const isDraft = value === "Draft";
    if (!isValid) {
      try {
        const folderName = `leadImage/${profiledata?.getUserDetailsById?.email}`;
        const location: any = await s3UploadMethod(values.img, folderName);
        const { data: postData } = await handleSchedulePost({
          variables: {
            input: {
              ...values,
              content: editorState?.editorHtml,
              img: location,
              schedulePostDate: data?.toString(),
              time: now.toLocaleTimeString(),
              isPublish: isDraft,
            },
          },
        });
        if (postData?.createSchedulePost) {
          successToast("Post created successfully");
          resetForm();
          onClose();
        }
      } catch (err: any) {
        errorToast(err?.message);
      }
    }
  };

  const actionBtn = [
    {
      button: (
        <DraftButton
          onClick={() => {
            onSchedulePost("Draft");
          }}
          type="button"
        >
          Draft
        </DraftButton>
      ),
    },
    {
      button: (
        <ScheduleButton
          onClick={() => {
            onSchedulePost("Schedule");
          }}
          type="button"
        >
          {loading ? "loading" : "Schedule"}
        </ScheduleButton>
      ),
    },
  ];
  const { postactionType, handleScheduleActions } = useScheduledContext();
  const previewData = {
    ...values,
    editorState,
    profile: profiledata?.getUserDetailsById?.profilePicture,
  };
  return (
    <>
      <Modal
        styles={{ borderRadius: "10px" }}
        open={open}
        width="auto"
        closeModal={onOpen}
        maxWidth={false}
      >
        <ModalContainer>
          <ModalHeader
            component={
              <StyledBudge>
                <GroupBadge
                  handleCheked={handleChange}
                  name="teamMembers"
                  error={""}
                  selectable
                  data={teammembers?.getTeamMembersByCompanyId || []}
                  dimension="43"
                  imgDimension={43}
                />
              </StyledBudge>
            }
            showClose={true}
            onclose={onClose}
          />
          <ScheduleInputContainer
            placeholderTextArea="Write something..."
            postaction
            setValues={setFieldValue}
          />
          <ModalFooter
            componentRight={<FooterComponent data={actionBtn} />}
            componentLeft={<socialmotionLogo />}
          />
        </ModalContainer>
      </Modal>
      <PreviewPost
        data={previewData}
        open={postactionType?.isPreview}
        closeHandler={() => {
          handleScheduleActions("isPreview", false);
        }}
      />

      <CommentPost
        open={postactionType?.isComment}
        closeHandler={() => {
          handleScheduleActions("isComment", false);
        }}
      />
    </>
  );
};

export default SchedulePost;
