import Button from "@/components/ui/button/Button";
import DealCard from "@/components/ui/CardContainer/DealCard";
import useCheckChromeExtension from "@/hooks/useCheckChromeExtension";
import { typographySubtitle1 } from "@/styles/typography";
import { greyColor } from "@/styles/variables";
import { openToNewTab } from "@/utils/helperUtils";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
const extensionId: string = process.env.EXTENSION_ID || "";
export const linkedinURL: string = process.env.LINKEDIN_URL || "";
const extensionURL: string = process.env.EXTENSION_URL || "";

const StyledButton = styled(Button)(
  [typographySubtitle1],
  `
  background-color:white !important;
  display:flex;
  color:${greyColor};
  align-items:center;
  justify-content:center;
  height:53px;
  gap:5px;
  padding:13px 5px !important;
  max-width:133px;
`,
);

type LinkedinBtnProps = {
  onClick?: () => void;
};

export const LinkedinBtn: React.FC<LinkedinBtnProps> = ({ onClick }) => {
  // Assuming you've provided the correct extensionId and resourcePath
  const [extensionCheckResult] = useCheckChromeExtension(extensionId);

  const handleButtonClick = () => {
    onClick?.();
    if (extensionCheckResult === "installed") {
      openToNewTab(linkedinURL, "");
    } else if (extensionCheckResult === "not-installed") {
      openToNewTab(extensionURL, "");
    }
  };
  return (
    <StyledButton onClick={handleButtonClick}>
      <Image
        src="/assets/icons/Linkedin.svg"
        width={33}
        height={33}
        alt="linkedin"
      />
      LinkedIn
    </StyledButton>
  );
};

const LinkedinImport = () => {
  return (
    <>
      <DealCard heading="Automatically import your first deal" index="1">
        <LinkedinBtn />
      </DealCard>
    </>
  );
};

export default LinkedinImport;
