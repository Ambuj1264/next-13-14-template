import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import {
  darkCharcoalColor,
  fullHeight,
  fullWidth,
  gutters,
} from "@/styles/variables";
import { typographyH1 } from "@/styles/typography";
import { mqMax } from "@/styles/base";

const LandingNextSection: React.FC = () => {
  return (
    <>
      <MainSection>
        <Title>How to use socialmotion in 4 steps</Title>
      </MainSection>
    </>
  );
};

const MainSection = styled.section(css`
  width: ${fullWidth};
  height: ${fullHeight};
`);
const Title = styled.h1(
  [typographyH1],
  css`
    color: ${darkCharcoalColor};
    margin: ${gutters.large}px auto;
    text-align: center;
    ${mqMax.large} {
      font-size: 21px;
      text-align: center;
    }
  `,
);

export default LandingNextSection;
