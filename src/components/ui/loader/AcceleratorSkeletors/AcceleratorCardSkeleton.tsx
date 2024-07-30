import React from "react";
import {
  borderRadiusBig,
  buttonCursor,
  lightGreyColor,
  whiteColor,
} from "@/styles/variables";
import styled from "@emotion/styled";
import Skeletor from "../../skeletor/Skeletor";
const CardContainer = styled.div`
  width: 23%;
  height: 307px;
  border-radius: ${borderRadiusBig};
  border: 1px solid ${lightGreyColor};
  background: ${whiteColor};
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: grid;
  place-items: center;
  cursor: ${buttonCursor};
  margin: 20px 0;
`;
const AcceleratorCardSkeleton = () => {
  return (
    <CardContainer>
      <Skeletor variant="rectangular" width="100%" height={150} />
      <Skeletor variant="text" width={240} height={15} />
      <Skeletor variant="rectangular" width={198} height={4} />
      <Skeletor variant="text" width={240} height={10} />
    </CardContainer>
  );
};

export default AcceleratorCardSkeleton;
