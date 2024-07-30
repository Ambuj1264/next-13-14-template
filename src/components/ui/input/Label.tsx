import React from "react";
import styled from "@emotion/styled";
import {
  fontSizeBody1,
  greyColor,
  fontFamily,
  fontWeightNormal,
} from "../../../styles/variables";
const Label = ({ labelText }: { labelText: string }) => {
  const TextAreaLabel = styled.div`
    // width: 92.952px;
    text-align: start;
    height: 24.4px;
    flex-shrink: 0;
    color: ${greyColor};
    font-family: ${fontFamily};
    font-size: ${fontSizeBody1};
    font-weight: ${fontWeightNormal};
    line-height: 150%;
    padding-bottom: 10px;
  `;
  return <TextAreaLabel>{labelText}</TextAreaLabel>;
};

export default Label;
