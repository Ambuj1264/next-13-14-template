import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  fullWidth,
  whiteColor,
  fontSizeBody1,
  greyColor,
  darkblueColor,
  buttonCursor,
  fontWeightSemibold,
  guttersPx,
  breakpointsMin,
} from "@/styles/variables";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EmailInput = styled.input`
  flex: 1;
  width: ${fullWidth};
  max-width: ${breakpointsMin.medium / 2}px;
  padding: ${guttersPx.mediumHalf};
  margin: ${guttersPx.mediumHalf} 0;
  border: 2px solid ${darkblueColor};
  font-size: ${fontSizeBody1};
  outline: none;
  background: ${whiteColor};
  color: ${greyColor};
`;

const NotifyButton = styled.button`
  background-color: ${darkblueColor};
  color: ${whiteColor};
  border: 2px solid ${darkblueColor};
  padding: ${guttersPx.mediumHalf} ${guttersPx.medium};
  cursor: ${buttonCursor};
  font-weight: ${fontWeightSemibold};
  font-size: ${fontSizeBody1};
  outline: none;
`;

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleNotifyClick = () => {
    //logic on button click
  };

  return (
    <>
      <Container>
        <EmailInput
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <NotifyButton onClick={handleNotifyClick}>Notify Me</NotifyButton>
      </Container>
    </>
  );
};

export default Subscribe;
