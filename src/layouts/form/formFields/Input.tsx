import {
  ErrorMessage,
  StyledInput,
} from "@/shared/UserMenu/SharedUserMenuComponents";
import { gutters } from "@/styles/variables";
import styled from "@emotion/styled";
import { useField } from "formik";
import React from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  name: string;
  label: string;
}

const InputBox = styled.div`
  margin-bottom: ${gutters.small}px;
  width: 100%;
`;

const Input = (props: TextInputProps) => {
  const [field, meta] = useField(props);
  return (
    <InputBox>
      <StyledInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </InputBox>
  );
};
export default Input;
