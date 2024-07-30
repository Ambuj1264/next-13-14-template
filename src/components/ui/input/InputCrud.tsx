import React, { useState } from "react";
import {
  borderRadiusTiny,
  buttonCursor,
  darkCharcoalColor,
  darkblueColor,
  fullWidth,
  greyColor,
  whiteColor,
  lightRedColor,
  guttersPx,
} from "@/styles/variables";
import { typographyParagraph } from "@/styles/typography";
import styled from "@emotion/styled";
import { DeleteIcon, EditIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import AlertPoPup from "../modal/schedulePost/AlertPoPup";

const InputContainer = styled.div`
  position: relative;
  width: 456px;
`;

const Input = styled.input`
  ${typographyParagraph};
  width: ${fullWidth};
  height: 39px;
  outline: none;
  border-radius: ${borderRadiusTiny};
  border: 1px solid ${greyColor};
  background: ${whiteColor};
  color: ${darkCharcoalColor};
  font-family: Inter;
  padding-left: ${guttersPx.mediumHalf};
  padding-right: 90px;
  &:focus-within {
    outline: none;
    border: 2px solid ${darkblueColor} !important;
  }
`;
const Span = styled.span`
  position: absolute;
  top: 50%;
  cursor: ${buttonCursor};
  transform: translateY(-50%);
`;

const SpanEdit = styled(Span)`
  right: 60px;
`;

const SpanDelete = styled(Span)`
  right: ${guttersPx.medium};
`;

const InputCrud = () => {
  const [inputValue, setInputValue] = useState("socialmotion Text");
  const [open, setOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleEditClick = () => setIsEditable(false);
  const handleDeleteClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const buttonsConfig = [
    {
      backgroundColor: whiteColor,
      color: darkCharcoalColor,
      outline: true,
      buttonText: "Cancel",
      onclick: handleClose,
    },
    {
      backgroundColor: lightRedColor,
      color: whiteColor,
      outline: false,
      buttonText: "Delete",
      onclick: handleClose,
    },
  ];
  return (
    <>
      <InputContainer>
        <Input
          type="text"
          readOnly={isEditable}
          value={inputValue}
          onChange={handleInputChange}
        />
        <SpanEdit onClick={handleEditClick}>
          <EditIcon />
        </SpanEdit>
        <SpanDelete onClick={handleDeleteClick}>
          <DeleteIcon />
        </SpanDelete>
      </InputContainer>
      <AlertPoPup
        open={open}
        onclose={handleClose}
        ButtonConfig={buttonsConfig}
        heading={"Delete post"}
      />
    </>
  );
};

export default InputCrud;
