import React from "react";
import Modal from "../Modal";
import styled from "@emotion/styled";
import {
  buttonCursor,
  darkCharcoalColor,
  darkblueColor,
  whiteColor,
  guttersPx,
} from "@/styles/variables";
import InputCrud from "../../input/InputCrud";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ModalHeading from "@/components/schedulePost/ModalHeading";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import ComboButtons from "@/components/schedulePost/ComboButtons";
import { useQueryContext } from "@/context/query/queryContext";
import { typographyParagraph } from "@/styles/typography";
import { borderStyle } from "@/styles/base";

const ModalContainer = styled.div`
  width: 647px;
  padding: ${guttersPx.medium};
`;

const NewTeamText = styled.span`
  color: ${darkblueColor};
  ${typographyParagraph};
  cursor: ${buttonCursor};
  margin: ${guttersPx.medium} ${guttersPx.smallHalf};
  display: inline-block;
`;
const TeamsAccount = ({
  open,
  onclose,
}: {
  open: boolean;
  onclose: () => void;
}) => {
  const { handleAccountActionType } = useQueryContext();

  const buttonsConfig = [
    {
      backgroundColor: whiteColor,
      color: darkCharcoalColor,
      outline: true,
      buttonText: "Cancel",
      onclick: onclose,
    },
    {
      backgroundColor: darkblueColor,
      color: whiteColor,
      outline: false,
      buttonText: "Save",
      onclick: onclose,
    },
  ];
  return (
    <>
      <Modal
        open={open}
        width="900"
        closeModal={onclose}
        maxWidth="xl"
        styles={borderStyle}
      >
        <ModalContainer>
          <ModalHeader
            onclose={onclose}
            component={<ModalHeading heading={"Team Accounts"} />}
            showClose={true}
          />
          <InputCrud />
          <NewTeamText
            onClick={() => {
              handleAccountActionType("Create a new team");
            }}
          >
            Create a new team
          </NewTeamText>
          <ModalFooter
            componentRight={<ComboButtons buttons={buttonsConfig} />}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default TeamsAccount;
