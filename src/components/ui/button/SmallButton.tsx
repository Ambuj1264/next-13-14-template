import {
  boxShadow,
  darkblueColor,
  fontWeightBold,
  whiteColor,
  buttonRadius,
  buttonBorder,
  buttonCursor,
  smallButtonWidth,
  smallButtonHeight,
  smallButtonPadding,
  fontSizeBody1,
  fontFamily,
} from "@/styles/variables";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { ReactElement, SyntheticEvent } from "react";

const ButtonContainer = styled.button`
  width: ${smallButtonWidth};
  height: ${smallButtonHeight};
  padding: ${smallButtonPadding};
  border-radius: ${buttonRadius};
  border: ${buttonBorder};
  cursor: ${buttonCursor};
  color: ${whiteColor};
  background: ${darkblueColor};
  box-shadow: ${boxShadow};
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightBold};
  font-family: ${fontFamily};
`;
const SmallButton = ({
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

export default SmallButton;
