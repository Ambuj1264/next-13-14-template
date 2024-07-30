import React, { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { container, mqMax } from "@/styles/base";
import { fullWidth, darkCharcoalColor } from "@/styles/variables";
import { FeatureLinksItem } from "@/utils/constant";
import { typographyParagraph } from "@/styles/typography";
import ImageComponent from "../ui/image/Image";
import Logo from "../../../public/assets/icons/mdi_linkedin.svg";

const FooterSection = styled.section(
  [fullWidth],
  css`
    display: flex;
    align-items: flex-end;
    padding: 30px 0px;
  `,
);

const FooterMaxWidth = styled.div(
  [container],
  css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    ${mqMax.medium} {
      flex-direction: column;
    }
  `,
);

const LeftSideContent = styled.div(css``);

const RightSideContent = styled.div(css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`);

const LeftParagraph = styled.p(
  [typographyParagraph],
  css`
    color: ${darkCharcoalColor};
  `,
);

const RightParagraph = styled.p(
  [typographyParagraph],
  css`
    color: ${darkCharcoalColor};
  `,
);
interface InputProps {
  showContent: boolean;
}
const Footer: FC<InputProps> = ({ showContent = true }) => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <FooterSection>
      <FooterMaxWidth>
        <LeftSideContent>
          {showContent && (
            <LeftParagraph>
              &copy; {year} socialmotion{" "}
              {FeatureLinksItem.map((value, j) => (
                <Link href={value.routerPath} key={j}>
                  {" "}
                  | {value.name}
                </Link>
              ))}
            </LeftParagraph>
          )}
        </LeftSideContent>
        <RightSideContent>
          <ImageComponent
            src={Logo}
            alt="logo"
            className="logo"
            height={40}
            width={40}
          />
          <RightParagraph>socialmotion is a Web-based Sales CRM</RightParagraph>
        </RightSideContent>
      </FooterMaxWidth>
    </FooterSection>
  );
};

export default Footer;
