import { css } from "@emotion/core";

import {
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH5,
  fontSizeBody1,
  fontSizeBody2,
  fontSizeCaption,
  fontSizeCaptionSmall,
  fontWeightRegular,
  fontWeightSemibold,
  fontWeightBold,
  fontFamily,
  fontSizeLogo,
  fontWeightNormal,
} from "./variables";

export const typographyH1 = css`
  font-size: ${fontSizeH1};
  font-weight: ${fontWeightBold};
`;

export const typographyH2 = css`
  font-size: ${fontSizeH2};
  font-weight: ${fontWeightBold};
`;

export const typographyH3: any = css`
  font-size: ${fontSizeH3};
  font-weight: ${fontWeightSemibold};
`;

export const typographyH5 = css`
  font-size: ${fontSizeH5};
  font-weight: ${fontWeightBold};
`;

export const typographyH4 = css`
  font-size: ${fontSizeH5};
  font-weight: ${fontWeightSemibold};
`;
export const typographyH4Regular = css`
  font-size: ${fontSizeH5};
  font-weight: ${fontWeightRegular};
`;
export const typographyLogo = css`
  font-size: ${fontSizeLogo};
  font-weight: ${fontWeightBold};
`;
export const typographySubtitle1 = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightSemibold};
`;

export const typographyMedium = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightSemibold};
`;

export const typographySubtitle2: any = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightSemibold};
`;

export const typographySubtitle2Regular = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightRegular};
`;
export const typographySubtitle2Normal = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightNormal};
`;
export const typographySubtitle2Bold = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightBold};
`;
export const typographySubtitle3 = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightSemibold};
`;

export const typographyBody1 = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightRegular};
  font-family: ${fontFamily};
`;
export const typographyParagraph = css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightNormal};
`;

export const typographyBody2 = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightRegular};
`;

export const typographyBody2Semibold = css`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightSemibold};
`;

export const typographyCaption = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightRegular};
`;
export const typographyCaptionNormal = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightNormal};
`;

export const typographyCaptionSemibold = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightSemibold};
`;

export const typographyCaptionbold = css`
  font-size: ${fontSizeCaption};
  font-weight: ${fontWeightBold};
`;
export const typographyCaptionSmall = css`
  font-size: ${fontSizeCaptionSmall};
  font-weight: ${fontWeightRegular};
`;

export const typographyOverline = css`
  font-size: ${fontSizeCaptionSmall};
  font-weight: ${fontWeightBold};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

export const typographySmall = css`
  font-size: ${fontSizeCaptionSmall};
  font-weight: ${fontWeightSemibold};
`;
