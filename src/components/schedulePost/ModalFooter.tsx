import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const FlexContainer = styled.div<{
  showLeft: boolean;
}>(
  ({ showLeft }) => css`
    display: flex;
    justify-content: ${showLeft ? "space-between" : "end"};
    align-items: center;
    margin-top: 20px;
  `,
);

const ModalFooter = ({
  componentLeft,
  componentRight,
}: {
  componentLeft?: React.ReactNode;
  componentRight: React.ReactNode;
}) => {
  const showLeft = componentLeft ? true : false;
  return (
    <>
      <FlexContainer showLeft={showLeft}>
        {componentLeft && <>{componentLeft}</>}
        {componentRight}
      </FlexContainer>
    </>
  );
};

export default ModalFooter;
