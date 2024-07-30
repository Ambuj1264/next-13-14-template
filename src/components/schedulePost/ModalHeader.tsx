import { buttonCursor, greyColor } from "@/styles/variables";
import { CancelIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import styled from "@emotion/styled";
import React from "react";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const CrossIcon = styled.div`
  cursor: ${buttonCursor};
  width: 25px;
  height: 25px;
`;

const Div = styled.div``;
const ModalHeader = ({
  component,
  showClose,
  onclose,
}: {
  component: React.ReactNode;
  showClose: boolean;
  onclose?: () => void;
}) => {
  return (
    <FlexContainer>
      <Div>{component}</Div>
      {showClose && (
        <CrossIcon onClick={onclose}>
          <CancelIcon color={greyColor} width={"25"} height={"25"} />
        </CrossIcon>
      )}
    </FlexContainer>
  );
};

export default ModalHeader;
