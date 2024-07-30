import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { gutters, guttersPx } from "@/styles/variables";
import { css } from "@emotion/react";
import { ErrorMessage } from "../input/InputBox";

const CheckboxInput = styled.input`
  width: ${guttersPx.medium};
  height: ${guttersPx.medium};
  cursor: pointer;
`;

const StyledCheckbox = styled.div(css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: ${guttersPx.mediumHalf} 0;
`);
const Error = styled(ErrorMessage)`
  font-size: ${guttersPx.mediumHalf};
  gap: 10px;
  padding: 0 0 ${gutters.small}px ${gutters.small * 2}px;
`;

interface CheckboxProps {
  children: React.ReactNode;
  checked?: boolean;
  name: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const CheckBox: React.FC<CheckboxProps> = ({
  children,
  checked = false,
  handleChange,
  name,
  error,
}) => {
  return (
    <>
      <StyledCheckbox>
        <CheckboxInput
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
        />
        {children}
      </StyledCheckbox>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default CheckBox;
