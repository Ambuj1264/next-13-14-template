import {
  boxShadow,
  darkblueColor,
  fontSizeH5,
  fontWeightBold,
  whiteColor,
  mediumButtonWidth,
  mediumButtonHeight,
  buttonRadius,
  buttonBorder,
  buttonCursor,
  mediumButtonPadding,
  fontFamily,
} from "@/styles/variables";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { ReactElement, SyntheticEvent } from "react";

const ButtonContainer = styled.button`
  padding: ${mediumButtonPadding};
  border-radius: ${buttonRadius};
  border: ${buttonBorder};
  cursor: ${buttonCursor};
  width: ${mediumButtonWidth};
  height: ${mediumButtonHeight};
  color: ${whiteColor};
  background: ${darkblueColor};
  box-shadow: ${boxShadow};
  font-size: ${fontSizeH5};
  font-weight: ${fontWeightBold};
  font-family: ${fontFamily};
`;
const Button = ({
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

export default Button;
