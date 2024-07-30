import { typographyBody2, typographySubtitle1 } from "@/styles/typography";
import {
  buttonBorder,
  greyColor,
  guttersPx,
  redColor,
} from "@/styles/variables";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { KeyboardEvent } from "react";
import rgba from "polished/lib/color/rgba";

const getBorderColor = (error: boolean) => {
  if (error) return redColor;
  return rgba(greyColor, 0.5);
};

const StyledTextArea = styled.textarea<{
  isError: boolean;
  width?: string;
  height?: string;
  resize?: string;
}>([
  typographySubtitle1,
  ({ isError, width = "375", height = "87", resize = "vertical" }) => css`
    border: 1px solid ${getBorderColor(!!isError)};
    max-width: ${width}px;
    height: ${height}px;
    width: 100%;
    flex-shrink: 0;
    margin: auto;
    padding: ${guttersPx.smallHalf};
    outline: ${buttonBorder};
    resize: ${resize};
  `,
]);

export const ErrorMessage = styled.span(
  [typographyBody2],
  css`
    font-size: ${guttersPx.mediumHalf};
    color: red;
    padding: 0 ${guttersPx.mediumHalf};
  `,
);
const TextArea = (
  {
    id,
    onChange,
    placeholder,
    name,
    value,
    defaultValue,
    autocomplete,
    disabled = false,
    error,
    resize = "vertical",
    onFocus,
    onKeyDown,
  }: {
    id?: string;
    onChange: any;
    placeholder: string;
    name: string;
    value: string;
    defaultValue?: string;
    autocomplete: string;
    disabled?: boolean;
    error: string;
    resize?: string;
    onFocus?: () => void;
    onKeyDown?: (e: KeyboardEvent<any>) => void;
  },
  ref: any,
) => {
  return (
    <>
      <div>
        <StyledTextArea
          id={id}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          name={name}
          value={value}
          defaultValue={defaultValue}
          autoComplete={autocomplete}
          disabled={disabled}
          isError={!!error}
          resize={resize}
        />
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </>
  );
};

export default React.forwardRef(TextArea);
