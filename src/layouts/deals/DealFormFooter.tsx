import React from "react";
import styled from "@emotion/styled";
import {
  GreenTeal,
  darkCharcoalColor,
  greyColor,
  lightGreyColor,
  whiteColor,
} from "@/styles/variables";
import SmallButton from "@/components/ui/button/SmallButton";

interface DealFormFooterProps {
  loading: boolean;
  handleSubmit(): void;
  onClose(): void;
  isDisable: boolean;
}

export const DealFormFooter: React.FC<DealFormFooterProps> = ({
  loading,
  isDisable,
  handleSubmit,
  onClose,
}) => {
  return (
    <Footer>
      <Cancel onClick={onClose}>Cancel</Cancel>
      <Save onClick={handleSubmit} disabled={isDisable}>
        {loading ? "Loading.." : "Save"}
      </Save>
    </Footer>
  );
};

// Styles
const Footer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  background: ${lightGreyColor};
  max-height: 57px;
  border-top: 1px solid ${greyColor};
  border-bottom: 1px solid ${greyColor};
  padding: 20px;
  gap: 10px;
`;

const Cancel = styled(SmallButton)`
  background: transparent;
  color: ${darkCharcoalColor};
  border: 1px solid ${darkCharcoalColor};
  box-shadow: none;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  max-width: 105px;
  width: 100%;
`;
const Save = styled(SmallButton)`
  background: ${GreenTeal};
  color: ${whiteColor};
  border: 0;
  box-shadow: none;
  border-radius: 0;
  font-size: 14px;
  font-weight: 800;
  max-width: 135px;
  width: 100%;
`;
