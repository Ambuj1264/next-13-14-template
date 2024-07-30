import { typographyCaptionSmall } from "@/styles/typography";
import { greyColor, guttersPx } from "@/styles/variables";
import styled from "@emotion/styled";
import React from "react";

export const RenderHTML = ({ html }: { html: string }) => {
  return <Paragraph dangerouslySetInnerHTML={{ __html: html }}></Paragraph>;
};

const Paragraph = styled.p`
  color: ${greyColor};
  padding: ${guttersPx.mediumHalf} 0 4px 0;
  ${typographyCaptionSmall};
  word-break: break-all;
`;
