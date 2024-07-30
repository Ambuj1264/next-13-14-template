import React from "react";
import styled from "@emotion/styled";
import { darkCharcoalColor, guttersPx } from "@/styles/variables";
import { css } from "@emotion/core";
import { typographyParagraph } from "@/styles/typography";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ModalHeading from "@/components/schedulePost/ModalHeading";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import ComboButtons from "@/components/schedulePost/ComboButtons";
import Modal from "../Modal";
import { borderStyle } from "@/styles/base";
import { ButtonConfigProp } from "@/types/global";

const ModalContainer = styled.div`
  width: 787px;
  font-family: Inter !important;
  padding: ${guttersPx.medium};
`;

const SubHeading = styled.p([
  typographyParagraph,
  css`
    color: ${darkCharcoalColor};
    font-family: Inter;
    margin: 30px 0px;
  `,
]);

const AlertPoPup = ({
  heading = "Delete post",
  subheading = "Are you sure you want to delete this post?",
  open,
  onclose,
  ButtonConfig,
}: {
  heading: string;
  subheading?: string;
  open: boolean;
  onclose: () => void;
  ButtonConfig: ButtonConfigProp[];
}) => {
  return (
    <>
      <Modal
        open={open}
        width="900"
        closeModal={onclose}
        maxWidth="lg"
        styles={borderStyle}
      >
        <ModalContainer>
          <ModalHeader
            component={<ModalHeading heading={heading} />}
            showClose={false}
          />
          <SubHeading>{subheading}</SubHeading>

          <ModalFooter
            componentRight={<ComboButtons buttons={ButtonConfig} />}
          />
        </ModalContainer>
      </Modal>
    </>
  );
};

export default AlertPoPup;
