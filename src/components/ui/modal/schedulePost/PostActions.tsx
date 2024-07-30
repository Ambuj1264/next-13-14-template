import React, { useMemo, useState } from "react";
import Modal from "../Modal";
import styled from "@emotion/styled";
import {
  DraftSGV,
  Earth,
  SquareDot,
} from "@/utils/formUtils/InputSvg/InputSvg";
import {
  darkCharcoalColor,
  borderRadiusLarger,
  greyColor,
  borderRadiusCircle,
  darkblueColor,
  whiteColor,
  lightRedColor,
  fontSizeCaptionSmall,
  guttersPx,
  lightGreenColor,
} from "@/styles/variables";
import IconWrapper from "@/components/schedulePost/IconWrapper";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import ComboButtons from "@/components/schedulePost/ComboButtons";
import { borderStyle } from "@/styles/base";
import { typographyParagraph } from "@/styles/typography";
import AlertPoPup from "./AlertPoPup";
const baseTextStyles = `
  color: ${darkCharcoalColor};
  ${typographyParagraph};
`;

const ModalContainer = styled.div`
  width: 946px;
`;

const Card = styled.div`
  height: fit-content;
  border-radius: ${borderRadiusLarger};
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${guttersPx.extraLarge};
`;

const UserImage = styled.img`
  width: 48px;
  height: 47px;
  border-radius: ${borderRadiusCircle};
  margin-right: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  ${baseTextStyles}
`;

const PostContent = styled.p`
  color: ${darkCharcoalColor};
  ${typographyParagraph};
  margin: ${guttersPx.medium} 0;
`;

const PostImage = styled.img`
  width: 131px;
  height: 128px;
  margin: ${guttersPx.mediumHalf} 0px;
  border-radius: 5px;
  border: 1px solid ${greyColor};
`;

const Span = styled.span`
  ${baseTextStyles}
  color: ${greyColor};
  font-size: ${fontSizeCaptionSmall};
`;

const NowIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SpanSVG = styled.span`
  margin-left: 6px;
`;

const PostActions = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [btnName, setBtnName] = useState("Draft");

  const handleOpen = (btnText: string) => {
    setBtnName(btnText);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const buttonsConfig = [
    {
      backgroundColor: whiteColor,
      color: greyColor,
      outline: true,
      buttonText: "Edit",
      onclick: () => handleOpen("Edit"),
    },
    {
      backgroundColor: lightRedColor,
      color: whiteColor,
      outline: false,
      buttonText: "Delete",
      onclick: () => handleOpen("Delete"),
    },
    {
      backgroundColor: darkblueColor,
      color: whiteColor,
      outline: false,
      buttonText: "Publish",
      onclick: () => handleOpen("Publish"),
    },
    {
      color: whiteColor,
      Icon: <DraftSGV />,
      outline: false,
      buttonText: "Publish",
      onclick: () => handleOpen("Publish"),
    },
  ];

  const handleCancel = () => {
    setOpenDelete(false);
  };

  const handlePublish = () => {
    console.log("ad");
  };

  const handleDelete = () => {
    console.log("ad");
  };

  const cancelButtonConfig = {
    backgroundColor: whiteColor,
    color: darkCharcoalColor,
    outline: true,
    buttonText: "Cancel",
    onclick: handleCancel,
  };

  const deleteButtonConfig = {
    backgroundColor: lightRedColor,
    color: whiteColor,
    outline: false,
    buttonText: "Delete",
    onclick: handleDelete,
  };

  const publishButtonConfig = {
    backgroundColor: lightGreenColor,
    color: whiteColor,
    outline: false,
    buttonText: "Publish",
    onclick: handlePublish,
  };

  const getModal = useMemo(() => {
    switch (btnName) {
      case "Delete":
        return (
          <AlertPoPup
            open={openDelete}
            onclose={handleCloseDelete}
            ButtonConfig={[cancelButtonConfig, deleteButtonConfig]}
            heading={"Delete post"}
          />
        );
      case "Publish":
        return (
          <AlertPoPup
            subheading="Once the post is published, it will change the expected time to the current time. Do you want to continue?"
            open={openDelete}
            onclose={handleCloseDelete}
            ButtonConfig={[cancelButtonConfig, publishButtonConfig]}
            heading="Publish post now"
          />
        );
      case "Draft":
        return (
          <AlertPoPup
            subheading="The post will be changed to a draft, and it won't be published automatically."
            open={openDelete}
            onclose={handleCloseDelete}
            ButtonConfig={[cancelButtonConfig, publishButtonConfig]}
            heading="Switch to draft"
          />
        );
      default:
        break;
    }
  }, [btnName, openDelete]);

  return (
    <>
      <Modal
        open={open}
        width="1100"
        closeModal={onClose}
        maxWidth="xl"
        styles={borderStyle}
      >
        <ModalContainer>
          <ModalHeader component={<></>} showClose={true} />
          <Card>
            <User>
              <UserImage
                src="/assets/images/PreviewUserImg.png"
                alt="User Profile"
              />
              <UserInfo>
                <UserName>Walid Amarir</UserName>
                <NowIconContainer>
                  <Span>Now</Span>
                  <Span>
                    <SquareDot />
                  </Span>
                  <SpanSVG>
                    <Earth />
                  </SpanSVG>
                </NowIconContainer>
              </UserInfo>
            </User>
            <PostContent>
              Excited to announce a new chapter in my career journey! 🚀
              <br />
              I have joined a dynamic team at Insurgente as a Customer Success.
              <br />
              Grateful for the opportunity and looking forward to this amazing
              adventure ahead!
            </PostContent>
            <PostImage src="/assets/images/PreviewImg.png" alt="Post Image" />
          </Card>

          <ModalFooter
            componentLeft={<IconWrapper />}
            componentRight={<ComboButtons buttons={buttonsConfig} />}
          />
        </ModalContainer>
      </Modal>
      {getModal}
    </>
  );
};

export default PostActions;
