import SmallButton from "@/components/ui/button/SmallButton";
import { typographyBody2, typographySubtitle1 } from "@/styles/typography";
import {
  darkblueColor,
  darkCharcoalColor,
  fontWeightSemibold,
  greyColor,
  gutters,
  guttersPx,
  whiteColor,
} from "@/styles/variables";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const StyledInput = styled.input(
  [typographySubtitle1],
  css`
    border: none;
    width: 100%;
    min-height: ${gutters.large * 2}px;
    border-bottom: 0.8px solid ${greyColor};
    padding-left: ${gutters.small}px;
    color: ${darkCharcoalColor};
    background-color: ${whiteColor};
    &::placeholder {
      color: ${darkCharcoalColor};
      font-weight: ${fontWeightSemibold};
    }
    &:focus {
      outline: none;
    }
    &:focus::placeholder {
      color: #ccc; /* Placeholder color when focused */
    }
    &:read-only {
      cursor: default;
    }
  `,
);
export const ErrorMessage = styled.span(
  [typographyBody2],
  css`
    font-size: ${guttersPx.mediumHalf};
    color: red;
    padding: 0 ${guttersPx.mediumHalf};
  `,
);

export const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Button = styled(SmallButton)`
  width: 105px;
  height: 36px;
  border-radius: 5px;
  font-size: 14px;
`;

export const DraftButton = styled(Button)`
  background: white;
  color: ${darkCharcoalColor};
  border: 1px solid ${darkCharcoalColor};
  box-shadow: none;
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
  }
`;

export const ScheduleButton = styled(Button)`
  background: ${darkblueColor};
  box-shadow: none;
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
  }
`;
