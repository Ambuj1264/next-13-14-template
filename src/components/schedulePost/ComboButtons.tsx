import React from "react";
import styled from "@emotion/styled";
import {
  buttonCursor,
  fontFamily,
  errorPixel,
  guttersPx,
} from "@/styles/variables";
interface ButtonConfig {
  backgroundColor?: string;
  color: string;
  outline: boolean;
  buttonText: string;
  Icon?: React.ReactElement;
  onclick?: () => void;
}

interface ButtonsProps {
  buttons: ButtonConfig[];
}

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${guttersPx.smallHalf};
`;

const Button = styled.button<ButtonConfig>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  outline: ${(props) => (props.outline ? "1px solid #333" : "none")};
  border: none;
  padding: ${guttersPx.smallHalf};
  ${guttersPx.small};
  margin: 5px;
  cursor: ${buttonCursor};
  height: 36px;
  border-radius: 5px;
  text-align: center;
  font-family: ${fontFamily};
  font-size: ${errorPixel};
  font-weight: 800;
  width: 94px;
`;
const ComboButtons: React.FC<ButtonsProps> = ({ buttons }) => {
  const renderButtons = () => {
    return buttons.map((button, index) =>
      !button.Icon ? (
        <Button key={index} {...button} onClick={button.onclick}>
          {button.buttonText}
        </Button>
      ) : (
        button.Icon
      ),
    );
  };

  return <ButtonsContainer>{renderButtons()}</ButtonsContainer>;
};

export default ComboButtons;
