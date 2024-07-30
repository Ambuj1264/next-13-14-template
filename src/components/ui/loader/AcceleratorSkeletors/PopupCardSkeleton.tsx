import React from "react";
import {
  borderRadiusLarger,
  fullWidth,
  placeholderColor,
} from "@/styles/variables";
import styled from "@emotion/styled";
import Skeletor from "../../skeletor/Skeletor";
const CardFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: ${fullWidth};
`;
const CardContainer = styled.div`
  margin-top: 40px;
  width: 251px;
  height: 230px;
  border: 1px solid ${placeholderColor};
  border-radius: ${borderRadiusLarger};
  position: relative;
  z-index: 0;
  padding: 20px;
`;
const PopupCardSkeleton = () => {
  return (
    <CardFlex>
      {[1, 2, 3, 4, 5].map((index) => (
        <CardContainer key={index}>
          <Skeletor
            variant="text"
            width="100%"
            height={20}
            sx={{ marginBottom: "20px" }}
          />
          <Skeletor variant="rectangular" width={211} height={125} />
        </CardContainer>
      ))}
    </CardFlex>
  );
};

export default PopupCardSkeleton;
