import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

import { LinkedinBtn } from "@/layouts/dealimport/linkedinImport/LinkedinImport";
import {
  darkCharcoalColor,
  greyColor,
  lightGreyColor,
} from "@/styles/variables";
import { typographyCaptionSmall, typographyH5 } from "@/styles/typography";

interface DealFormHeaderProps {
  onClose(): void;
}

export const DealFormHeader: React.FC<DealFormHeaderProps> = ({ onClose }) => {
  return (
    <Header>
      <Title>Add new deal</Title>
      <LinkedIn>
        <ParaGraph>
          If you want to go <b>faster</b>, search for your lead on LinkedIn and
          import it automatically ➡ ➡ ➡
        </ParaGraph>
        <LinkedinBtn />
      </LinkedIn>
      <CancelIcon onClick={onClose}>
        <Image
          src="/assets/images/cancel.png"
          width={23}
          height={23}
          alt="cancel"
        />
      </CancelIcon>
    </Header>
  );
};

// Styles
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${lightGreyColor};
  max-height: 81px;
  border-top: 1px solid ${greyColor};
  border-bottom: 1px solid ${greyColor};
  padding: 20px;
`;
const Title = styled.h4(
  [typographyH5],
  `
   color:${darkCharcoalColor};
   flex-basis: 20%;
`,
);

const LinkedIn = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 48%;
  & > button {
    width: 111px !important;
    font-size: 12px;
  }
  & > button > img {
    width: 29px !important;
    height: 28px !important;
  }
`;
const ParaGraph = styled.p(
  [typographyCaptionSmall],
  `
  color:${darkCharcoalColor};
  max-width:243px
  `,
);
const CancelIcon = styled.div`
  flex-basis: 15%;
  text-align: end;
  cursor: pointer;
`;
// ... rest of the styled components related to the header
