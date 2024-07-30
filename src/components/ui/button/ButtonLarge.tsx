import {
  boxShadow,
  darkblueColor,
  fontSizeH5,
  fontWeightBold,
  whiteColor,
  buttonRadius,
  buttonBorder,
  buttonCursor,
  largeButtonPadding,
  largeButtonWidth,
  largeButtonHeight,
  fontFamily,
} from "@/styles/variables";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { ReactElement, SyntheticEvent } from "react";

const ButtonContainer = styled.button`
  display: block;
  padding: ${largeButtonPadding};
  border-radius: ${buttonRadius};
  border: ${buttonBorder};
  cursor: ${buttonCursor};
  width: ${largeButtonWidth};
  height: ${largeButtonHeight};
  color: ${whiteColor};
  background: ${darkblueColor};
  box-shadow: ${boxShadow};
  font-size: ${fontSizeH5};
  font-weight: ${fontWeightBold};
  font-family: ${fontFamily};

  &:hover {
    border-radius: 3px;
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;
const ButtonLarge = ({
  className = "",
  id,
  type = "button",
  disabled = false,
  onClick,
  href,
  children,
}: {
  className?: string;
  id?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  href?: string;
  children?: string | ReactElement | ReadonlyArray<ReactElement | string>;
}) => {
  return href ? (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <ButtonContainer
      id={id}
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </ButtonContainer>
  );
};

export default ButtonLarge;
