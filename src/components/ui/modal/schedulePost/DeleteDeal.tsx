import React, { useState } from "react";
import Modal from "../Modal";
import styled from "@emotion/styled";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import { guttersPx, lightRedColor, whiteColor } from "@/styles/variables";

import ModalHeading from "@/components/schedulePost/ModalHeading";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import ComboButtons from "@/components/schedulePost/ComboButtons";
import SchedulePostCard from "../../CardContainer/SchedulePostCard";
import MultiProfileCheck from "../../input/MultiProfileCheck";
const ModalContainer = styled.div`
  padding: 40px;
  width: 732px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CardContainer = styled.div``;
const SearchContainer = styled.div``;

const DeleteDeal = () => {
  const [open, setOpen] = useState(true);

  const closeHandler = () => {
    setOpen(false);
  };
  const buttonsConfig = [
    {
      backgroundColor: lightRedColor,
      color: whiteColor,
      outline: false,
      buttonText: "Delete",
    },
  ];
  return (
    <>
      <Modal
        open={open}
        width="732px"
        closeModal={closeHandler}
        maxWidth="xl"
        styles={{ borderRadius: guttersPx.mediumHalf }}
      >
        <ModalContainer>
          <ModalHeader
            component={
              <ModalHeading heading={"Search the deal you want delete"} />
            }
            showClose
            onclose={closeHandler}
          />
          <Wrapper>
            <CardContainer>
              <SchedulePostCard />
            </CardContainer>
            <SearchContainer>
              <MultiProfileCheck />
            </SearchContainer>
          </Wrapper>
          <ModalFooter
            componentRight={<ComboButtons buttons={buttonsConfig} />}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default DeleteDeal;
