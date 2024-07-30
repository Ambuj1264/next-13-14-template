import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { boxShadowCard, whiteColor } from "@/styles/variables";
import { css } from "@emotion/core";

const CardConatiner = styled.div<{
  maxWidth?: string | number;
}>(
  ({ maxWidth }) => css`
    background: ${whiteColor};
    box-shadow: ${boxShadowCard};
    margin: auto;
    max-width: ${maxWidth};
  `,
);
interface Props {
  className?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  maxWidth?: string | number;
  margin?: string;
  children?: string | ReactElement | ReadonlyArray<ReactElement | string>;
}

const Card: React.FC<Props> = ({ className, children, maxWidth }) => {
  return (
    <CardConatiner className={className} maxWidth={maxWidth}>
      {children}
    </CardConatiner>
  );
};

export default Card;
