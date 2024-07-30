"use client";
import React from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import rgba from "polished/lib/color/rgba";
import { css } from "@emotion/core";
import Button from "@/components/ui/button/Button";

import { mqMin } from "@/styles/base";
import { blackColor, gutters, redColor } from "@/styles/variables";
import {
  typographyH2,
  typographyH3,
  typographySubtitle2,
} from "@/styles/typography";
import { ROUTE_NAMES } from "@/shared/routeNames";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LocalStorageKey } from "@/types/global";

const ErrorHeading = styled.span([
  typographyH3,
  css`
    color: ${redColor};
    ${mqMin.large} {
      ${typographyH2};
    }
  `,
]);

const ErrorSubHeading = styled.span([
  typographySubtitle2,
  css`
    margin-top: ${gutters.small}px;
    color: ${rgba(blackColor, 0.7)};
    ${mqMin.large} {
      ${typographyH3};
    }
  `,
]);

const ButtonContainer = styled(Button)<{
  names: string;
}>``;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: ${gutters.large * 2}px;
  gap: 20px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 50px);
`;

const Error = () => {
  const { item } = useLocalStorage<LocalStorageKey>("AUTH_TOKEN");
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <Container>
        <ErrorHeading>404 Error</ErrorHeading>
        <ErrorSubHeading>Page Not Found</ErrorSubHeading>

        <ButtonWrapper>
          <ButtonContainer
            names="back"
            id="backButton"
            onClick={() => window.history.back()}
          >
            Back
          </ButtonContainer>
          <ButtonContainer
            names="home"
            id="homeButton"
            href={item ? ROUTE_NAMES.DASHBOARD : ROUTE_NAMES.ROOT}
          >
            Home
          </ButtonContainer>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default Error;
