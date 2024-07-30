import { typographyBody2, typographySubtitle1 } from "@/styles/typography";
import {
  darkblueColor,
  darkCharcoalColor,
  fontFamily,
  fontSizeBody1,
  fontWeightSemibold,
  greyColor,
  guttersPx,
  redColor,
  whiteColor,
} from "@/styles/variables";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { ChangeEvent, forwardRef } from "react";
import rgba from "polished/lib/color/rgba";
import Image from "next/image";
import { disablePastDates } from "@/utils/helperUtils";

export const getBorderColor = (error: boolean) => {
  if (error) return redColor;
  return rgba(greyColor, 0.5);
};

const dynamicBorder = (isIcon: boolean, isError: boolean) => {
  let style: string = "";
  if (!isIcon) {
    style += `border-bottom: 1px solid ${getBorderColor(!!isError)}`;
  } else {
    style += `border: 1px solid ${getBorderColor(!!isError)}`;
  }
  return style;
};

const getFocusedBorder = (isFocusIcon: boolean, isFocusError: boolean) => {
  let focusstyle: string = "";
  if (!isFocusIcon) {
    focusstyle += `border-bottom: 1px solid ${getBorderColor(!!isFocusError)}`;
  } else {
    focusstyle += `border:2px solid ${darkblueColor} !important`;
  }
  return focusstyle;
};

export const StyledInput = styled.input<{
  hasIcon: boolean;
  error: boolean;
  fullborder: boolean;
}>([
  typographySubtitle1,
  ({ hasIcon, error, fullborder }) => css`
    border: none;
    width: 100%;
    height: inherit;
    padding-left: ${hasIcon && !fullborder ? "38" : "10"}px;
    color: ${darkCharcoalColor};
    background-color: ${whiteColor};
    font-family: ${fontFamily};
    font-size: ${fontSizeBody1};
    font-weight: ${fontWeightSemibold};
    line-height: inherit;
    vertical-align: top;
    position: relative;
    :focus ~ .input-icon > svg > path,
    :focus ~ .input-icon > svg > g > path,
    :focus ~ .input-icon > svg > rect {
      fill: ${darkblueColor} !important;
    }
    height: ${!hasIcon ? "46px" : "39px"};
    ${dynamicBorder(hasIcon, error)};
    &:focus {
      outline: none;
      ${getFocusedBorder(hasIcon, error)}
    }
    &:read-only {
      cursor: default;
    }
    &::placeholder {
      color: ${darkCharcoalColor}; /* Placeholder color when not focused */
    }
    &:focus::placeholder {
      color: #ccc; /* Placeholder color when focused */
    }
  `,
]);

export const Wrapper = styled.span<{
  lighterBorder: boolean;
  hasIcon: boolean;
  error: boolean;
}>(() => [
  css`
    position: relative;
    display: block;
    background-color: ${whiteColor};
  `,
]);

const IconStyles = styled(Image)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  bottom: 0;
  z-index: 999;
  left: ${guttersPx.mediumHalf};
`;

const StyledSvg = styled.span`
  position: absolute;
  top: 53%;
  transform: translate(0, -50%);
  z-index: 999;
  left: ${guttersPx.mediumHalf};
`;
export const ErrorMessage = styled.span(
  [typographyBody2],
  css`
    font-size: ${guttersPx.mediumHalf};
    color: red;
    padding: 0 ${guttersPx.mediumHalf};
  `,
);
const InputBox = (
  {
    id,
    type = "text",
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    name,
    value,
    defaultValue,
    Icon,
    autocomplete,
    disabled = false,
    error,
    maxLength,
    min,
    readOnly = false,
    fullborder = false,
  }: {
    id?: string;
    type: string;
    fullborder?: boolean;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    value: string;
    defaultValue?: string;
    Icon?: any;
    autocomplete: string;
    disabled?: boolean;
    error: any;
    maxLength?: number;
    noBorder?: boolean;
    min?: number;
    readOnly?: boolean;
  },
  ref: any,
) => {
  const checkType = typeof Icon === "string" && Icon !== "none";
  return (
    <>
      <Wrapper
        error={!!error}
        hasIcon={!!Icon || fullborder}
        lighterBorder={true}
      >
        {Icon && checkType && (
          <IconStyles src={Icon} width={20} height={20} alt="" />
        )}
        <StyledInput
          id={id}
          type={type}
          ref={ref}
          min={type === "date" ? disablePastDates() : ""}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus} // Pass onFocus event handler
          onKeyDown={onKeyDown}
          name={name}
          value={value}
          defaultValue={defaultValue}
          autoComplete={autocomplete}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          minLength={min}
          hasIcon={!!Icon || fullborder}
          error={!!error}
          fullborder={fullborder}
        />
        {Icon && (
          <StyledSvg className="input-icon">
            {" "}
            <Icon />
          </StyledSvg>
        )}
      </Wrapper>
      <ErrorMessage>{error}</ErrorMessage>
    </>
  );
};

export default forwardRef(InputBox);
