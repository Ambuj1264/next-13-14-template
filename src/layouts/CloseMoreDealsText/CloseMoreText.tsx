import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { css } from "@emotion/react";
import { fontWeightNormal, gutters, whiteColor } from "@/styles/variables";
import { typographyBody1, typographyH4 } from "@/styles/typography";
import { mqMax } from "@/styles/base";

interface InputProps {
  showTitle: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  route: string;
  linkText: string;
}

const CloseMoreText: React.FC<InputProps> = ({
  showTitle,
  src,
  width,
  height,
  alt,
  route,
  linkText,
}) => {
  return (
    <DoYouWantCloseMoreDeals>
      <CloseMoreDealsTitle>{showTitle}</CloseMoreDealsTitle>
      <GoToLinkedIn>
        <Link href={route}>
          {linkText}
          <Image src={src} alt={alt} width={width} height={height} />
        </Link>
      </GoToLinkedIn>
    </DoYouWantCloseMoreDeals>
  );
};

const DoYouWantCloseMoreDeals = styled.div`
  padding: ${gutters.small * 4}px ${gutters.small * 4}px;
  ${mqMax.large} {
    padding: ${gutters.small * 2}px 0px;
  }
`;

const CloseMoreDealsTitle = styled.h2(
  [typographyH4],
  css`
    color: ${whiteColor};
  `,
);

const GoToLinkedIn = styled.p(
  [typographyBody1],
  css`
    color: ${whiteColor};
    font-weight: ${fontWeightNormal};
    margin-top: ${gutters.small}px;
  `,
);

export default CloseMoreText;
