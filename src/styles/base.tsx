import { css, SerializedStyles } from "@emotion/core";
import rgba from "polished/lib/color/rgba";
import facepaint from "facepaint";

import {
  gutters,
  containerMaxWidth,
  breakpointsMin,
  breakpointsMax,
  fontWeightBold,
  borderRadiusBig,
  webKitScrollBarHeight,
  greyColor,
  redColor,
  fullWidth,
  fontWeightSemibold,
  blackColor,
  fontWeightNormal,
  darkCharcoalColor,
  guttersPx,
  fontSizeH5,
  fontFamily,
  fontSizeBody1,
} from "./variables";
import { resetAnchor, resetButton } from "./reset";

import { Direction } from "../types/enums";
import styled from "@emotion/styled";
import ButtonLarge from "@/components/ui/button/ButtonLarge";
import { Select } from "@mui/material";

export const mqMin = {
  medium: `@media (min-width: ${breakpointsMin.medium}px)`,
  large: `@media (min-width: ${breakpointsMin.large}px)`,
  desktop: `@media (min-width: ${breakpointsMin.desktop}px)`,
  max: `@media (min-width: ${breakpointsMin.max}px)`,
};

export const mqMax = {
  medium: `@media (max-width: ${breakpointsMax.medium}px)`,
  large: `@media (max-width: ${breakpointsMax.large}px)`,
  desktop: `@media (max-width: ${breakpointsMax.desktop}px)`,
};

export const mqPrint = "@media print";

export const mqIE = `@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)`;

export const mediaQuery = facepaint([
  mqMin.medium,
  mqMin.large,
  mqMin.desktop,
  mqPrint,
]);

export const mqDesktopOnly = "@media (hover: hover)";

export const container = css`
  flex-grow: 1;
  margin: 0 auto;
  max-width: ${containerMaxWidth};
  padding-right: ${gutters.small}px;
  padding-left: ${gutters.small}px;
  ${mqMin.large} {
    padding-right: ${gutters.large}px;
    padding-left: ${gutters.large}px;
  }
`;

// use to compensate container paddings
// use case: component with full page width on mobile
export const containerPaddingsBackward = css`
  margin-right: -${gutters.small}px;
  margin-left: -${gutters.small}px;
  ${mqMin.large} {
    margin-right: -${gutters.large}px;
    margin-left: -${gutters.large}px;
  }
`;

export const heroSectionCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const heroBgImageCss = css`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const heroMainImage = css`
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const cardMarginPadding = css`
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  padding-left: 50px;
  padding-right: 50px;
`;

export const mainSectionCss = css`
  top: 28%;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

export const displayRow = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
`;

export const buttonWrapperNav = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const row = css`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;

  align-items: stretch;
  justify-content: flex-start;

  margin-right: -${gutters.small / 2}px;
  margin-left: -${gutters.small / 2}px;

  ${mqIE} {
    flex: 0 0 100%;
  }
  ${mqMin.large} {
    margin-right: -${gutters.large / 2}px;
    margin-left: -${gutters.large / 2}px;
  }
`;

export const columnPaddings = css`
  padding: 0 ${gutters.small / 2}px;
  ${mqMin.large} {
    padding: 0 ${gutters.large / 2}px;
  }
`;

export const column = (
  sizes: SharedTypes.ColumnSizes,
  skipPaddings = false,
) => [
  !skipPaddings && columnPaddings,
  mediaQuery({
    width: [
      `${sizes.small * 100}%`,
      sizes.medium && `${sizes.medium * 100}%`,
      sizes.large && `${sizes.large * 100}%`,
      sizes.desktop && `${sizes.desktop * 100}%`,
      sizes.print && `${sizes.print * 100}%`,
    ],
  }),
];

export const cover = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const anchor = css(
  css(resetAnchor, resetButton),
  css`
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      opacity: 0;
      transition: 200ms opacity ease-in-out;
    }
    &:focus,
    &:hover,
    &:active {
      &::after {
        opacity: 1;
      }
    }
  `,
);

export const hideScrollbar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const singleLineTruncation = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const capitalizeFirstLetter = css`
  &::first-letter {
    text-transform: uppercase;
  }
`;

export const errorAsterisk = css`
  &:after {
    content: " *";
    color: ${redColor};
    font-weight: ${fontWeightBold};
  }
`;

export const directionMixin = ({
  leftStyles,
  rightStyles,
  direction,
}: {
  leftStyles: SerializedStyles;
  rightStyles: SerializedStyles;
  direction: Direction;
}) => (direction === Direction.Left ? leftStyles : rightStyles);

export const clampLines = (numberOfLines?: number) => css`
  display: -webkit-box;
  visibility: visible;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${numberOfLines || "unset"};
  ${mqIE} {
    overflow: visible;
  }
`;

export const resetClampLines = css`
  display: unset;
  overflow: unset;
  -webkit-box-orient: unset;
  -webkit-line-clamp: unset;
`;

export const DefaultMarginTop = css`
  margin-top: ${gutters.small}px;

  ${mqMin.large} {
    margin-top: ${gutters.large}px;
  }
`;

export const DefaultMarginBottom = css`
  margin-bottom: ${gutters.small}px;

  ${mqMin.large} {
    margin-bottom: ${gutters.large}px;
  }
`;

export const clampLinesWithFixedHeight = ({
  numberOfLines,
  lineHeight,
  fixedHeight = false,
}: {
  numberOfLines: number;
  lineHeight: number;
  fixedHeight?: boolean;
}) => {
  const heightLimit = `calc(
    ${lineHeight}px * ${numberOfLines}
  )`;
  return [
    css`
      ${clampLines(numberOfLines)}
      max-height: ${heightLimit};
      ${mqIE} {
        display: block;
        overflow-y: auto;
      }
    `,
    fixedHeight &&
      css`
        height: ${heightLimit};
      `,
  ];
};

export const responsiveTypography = ({
  small,
  medium,
  large,
  desktop,
}: {
  small: SerializedStyles;
  medium?: SerializedStyles;
  large?: SerializedStyles;
  desktop?: SerializedStyles;
}) => [
  small,
  medium &&
    css`
      ${mqMin.medium} {
        ${medium};
      }
    `,
  large &&
    css`
      ${mqMin.large} {
        ${large};
      }
    `,
  desktop &&
    css`
      ${mqMin.desktop} {
        ${desktop};
      }
    `,
];

export const hideDuringPrint = css`
  ${mqPrint} {
    display: none;
  }
`;

export const combineMediaQueries = (
  firstMediaQuery: string,
  ...mediaQueries: string[]
) =>
  [
    firstMediaQuery,
    ...mediaQueries.map((query) => query.replace("@media ", "")),
  ].join(", ");

export const fixIOSInputZoom = css`
  @supports (-webkit-touch-callout: none) {
    ${mqMax.large} {
      input {
        z-index: 0;
        width: 115%;
        padding-top: 9px;
        font-size: 18px;
        transform: scale(0.8888);
        transform-origin: top left;
      }
    }
  }
`;

export const styledWebkitScrollbar = css`
  &::-webkit-scrollbar {
    width: ${webKitScrollBarHeight}px;
    height: ${webKitScrollBarHeight}px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: ${borderRadiusBig};
    background: ${rgba(greyColor, 0.2)};
  }
`;

export const cardStyle = css`
  width: 100%;
  display: block;
  margin: auto;
  padding: ${gutters.large * 2}px;
`;

export const HorizontalRule = styled.hr<{
  text: string;
  bgcolor: string;
  color: string;
}>(
  ({ text, bgcolor, color }) => css`
    border: none;
    border-top: 3px solid ${color};
    color: ${color};
    overflow: visible;
    text-align: center;
    font-size: 13px;
    font-weight: ${fontWeightSemibold};
    margin-bottom: ${gutters.large * 2}px;
    height: 2px;
    &:after {
      background: ${bgcolor};
      content: "${text}";
      padding: 0 4px;
      position: relative;
      top: -13px;
    }
  `,
);
export const StyledLayout = styled.div(
  [container],
  css`
    padding: ${gutters.large + 16}px 0;
  `,
);

export const Chip = styled.div<{
  fontSize: string;
  bgcolor: string;
  color: string;
  fontWeight: string | number;
}>(
  ({ fontSize, bgcolor, color, fontWeight }) => css`
    display: inline-block;
    padding: 8px 16px;
    border-radius: 16px;
    background-color: ${bgcolor || "#ccc"};
    color: ${color || "#fff"};
    font-size: ${fontSize || "14px"};
    font-weight: ${fontWeight};
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  `,
);
export const PlusIcon = styled.div<{
  fontSize?: string;
  bgcolor?: string;
  color?: string;
  fontWeight?: string | number;
}>(
  ({
    fontSize,
    bgcolor = rgba(2, 119, 182, 0.2),
    color = blackColor,
    fontWeight = fontWeightNormal,
  }) => css`
    width: 19px;
    height: 19px;
    display: flex;
    background: ${bgcolor};
    justify-content: center;
    color: ${color};
    border-radius: 50px;
    font-weight: ${fontWeight};
    font-size: ${fontSize};
    cursor: pointer;
  `,
);

export const Button = styled(ButtonLarge)(css`
  width: ${fullWidth};
`);

export const StyledSelect = styled(Select)`
  max-height: 39px;
  width: 100%;
  border-radius: 0;
`;

export const datePickerStyles = {
  width: "100%",
  color: darkCharcoalColor,
  marginTop: guttersPx.large,
  MarginBottom: guttersPx.large,
  ".MuiPickersCalendarHeader-root": {
    display: "none",
  },
  ".MuiDayCalendar-weekContainer": {
    justifyContent: "space-between",
    my: guttersPx.small,
    height: "100%",
  },
  ".MuiDateCalendar-root": {
    width: "100%",
  },
  ".MuiDayCalendar-header": {
    justifyContent: "space-between",
  },
  ".MuiDayCalendar-header>span": {
    fontSize: fontSizeH5,
    fontWeight: fontWeightBold,
    color: greyColor,
    fontFamily: fontFamily,
  },
  ".MuiDayCalendar-weekContainer>button": {
    fontSize: fontSizeBody1,
    fontWeight: fontWeightNormal,
    fontFamily: fontFamily,
  },

  ".MuiPickersSlideTransition-root": {
    minHeight: "300px !important",
  },
  ".Mui-selected": {
    background: "transparent !important",
    borderRadius: "10px !important",
    border: "2px solid var(--Dark-blue, #0277B6) !important",
    color: "#0277B6 !important",
  },
  ".MuiDayCalendar-monthContainer ": {
    margin: "20px 0",
  },
};

export const scrollStyle = `
::-webkit-scrollbar {
  border-radius: 20px;
width:7px;
}
::-webkit-scrollbar-track {
  height:5px;
  background-color:  #D9D9D9; /* set the background color of the track */
}
::-webkit-scrollbar-thumb {
  background-color:white; /* set the background color of the thumb */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* set the background color of the thumb on hover */
}
`;

export const borderStyle = {
  borderRadius: guttersPx.mediumHalf,
};
