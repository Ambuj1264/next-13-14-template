import { typographyParagraph } from "@/styles/typography";
import {
  blackColor,
  darkblueColor,
  lightGreyColor,
  whiteColor,
} from "@/styles/variables";
import styled from "@emotion/styled";
import React from "react";
import StyledBudge from "../badge/StyledBudge";

interface DealProps {
  heading: string;
  index: string;
  children: React.ReactNode;
}

export const ImportWrapper = styled.div`
  border-radius: 5px;
  background: ${lightGreyColor};
  max-width: 228px;
  min-height: 181px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const Heading = styled.p(
  [typographyParagraph],
  `
color:${blackColor}
`,
);

const DealCard = ({ heading, index, children }: DealProps) => {
  return (
    <>
      <StyledBudge
        sx={ImportbudgeStyle}
        badgecontent={index}
        anchororigin={{ vertical: "top", horizontal: "left" }}
      >
        <ImportWrapper>
          <Heading>{heading}</Heading>
          {children}
        </ImportWrapper>
      </StyledBudge>
    </>
  );
};

export default DealCard;

export const ImportbudgeStyle = {
  "& .MuiBadge-badge": {
    height: "48px",
    width: "48px",
    borderRadius: "40px",
    background: darkblueColor,
    color: whiteColor,
    fontSize: "25px",
    fontWeight: 600,
    fontFamily: "Montserrat",
  },
};
