import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Button from "../ui/button/Button";
import {
  darkblueColor,
  darkCharcoalColor,
  fontSizeBody1,
  fontWeightNormal,
  fullHeight,
  fullWidth,
} from "@/styles/variables";
import { mainSectionCss, mqMax } from "@/styles/base";
import imageSource from "../../../public/assets/images/Home.jpg";
import { typographyH1 } from "@/styles/typography";
import { ROUTE_NAMES } from "@/shared/routeNames";
import Link from "next/link";

const Title = styled.h1(
  [typographyH1],
  css`
    color: ${darkblueColor};
    margin: 35px auto;
    ${mqMax.large} {
      font-size: 21px;
      text-align: center;
    }
  `,
);

const Paragraph = styled.p`
  font-size: ${fontSizeBody1};
  color: ${darkCharcoalColor};
  font-weight: ${fontWeightNormal};
  margin-bottom: 60px;
  ${mqMax.large} {
    text-align: center;
    margin-bottom: 30px;
  }
`;

const Span = styled.span`
  font-size: ${fontSizeBody1};
  color: ${darkCharcoalColor};
  font-weight: ${fontWeightNormal};
  margin-top: 15px;
  margin-bottom: 60px;
`;

const HeroSection = styled.div(css`
  width: ${fullWidth};
  height: ${fullHeight};
`);

const HeroSectionContent = styled.div(
  [mainSectionCss],
  css`
    width: ${fullWidth};
  `,
);

const LandingBanner = styled(Image)`
  width: 100%;
  height: 790px;
  object-fit: cover;
`;

const Landing = () => {
  return (
    <>
      <HeroSection>
        <LandingBanner src={imageSource} alt="" width={0} height={0} />
      </HeroSection>
      <HeroSectionContent>
        <Title>socialmotion gets your sales organized</Title>
        <Paragraph>
          socialmotion users close an average of 28% more deals after their first year
        </Paragraph>
        <Link href={ROUTE_NAMES.SIGNUP}>
          {" "}
          <Button type="button">Try it free</Button>
        </Link>
        <Span>Full access. No credit card required</Span>
      </HeroSectionContent>
    </>
  );
};

export default Landing;
