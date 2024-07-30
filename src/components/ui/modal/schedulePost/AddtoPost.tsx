import React, { useState } from "react";
import Modal from "../Modal";
import styled from "@emotion/styled";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ProfileCard from "@/layouts/userprofile/ProfileCard";
import { darkCharcoalColor, fontFamily, guttersPx } from "@/styles/variables";

import { typographyParagraph } from "@/styles/typography";
import { AddtoPostData } from "@/utils/constant";
const ModalContainer = styled.div`
  padding: 40px;
  width: 452px;
`;
const Para = styled.p`
  color: ${darkCharcoalColor};
  text-align: center;
  font-family: ${fontFamily};
  ${typographyParagraph}
  margin-top: 30px;
`;

const ProfileCardContainer = styled.div`
  width: 237px;
  margin: auto;
`;
const AddtoPost = () => {
  const [open, setOpen] = useState(true);

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        width="711px"
        closeModal={closeHandler}
        maxWidth="lg"
        styles={{ borderRadius: guttersPx.mediumHalf }}
      >
        <ModalContainer>
          <ModalHeader
            component={<></>}
            showClose={true}
            onclose={closeHandler}
          />
          <ProfileCardContainer>
            <ProfileCard data={AddtoPostData} />
          </ProfileCardContainer>
          <Para>You added Elizabeth Miller to this post</Para>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default AddtoPost;
