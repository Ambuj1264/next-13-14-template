import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { typographyLogo } from "@/styles/typography";
import Logo from "../../../public/assets/images/Logo.svg";
import { buttonWrapperNav, container, displayRow, row } from "@/styles/base";
import Link from "next/link";
import ImageComponent from "../ui/image/Image";
import SmallButton from "../ui/button/SmallButton";
import {
  boxShadow,
  darkCharcoalColor,
  darkblueColor,
  fontSizeBody1,
  fontWeightNormal,
  whiteColor,
} from "@/styles/variables";
import { ROUTE_NAMES } from "@/shared/routeNames";
import { usePathname } from "next/navigation";

const LogoWrapper = styled.div([
  css`
    display: flex;
    align-items: center;
  `,
]);

const LogoTitle = styled.div([
  typographyLogo,
  css`
    color: ${darkblueColor};
  `,
]);

const MainSection = styled.section(
  [row, displayRow],
  css`
    background-color: ${whiteColor};
    box-shadow: ${boxShadow};
  `,
);
const TryItFreeButton = styled(SmallButton)`
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
    width: 100%;
  }
`;
const NavWrapper = styled.div(
  [container],
  css`
    display: flex;
    height: 90px;
    justify-content: space-between;
  `,
);

const ButtonWrapper = styled.div([buttonWrapperNav], css``);

const LinkRoute = styled(Link)(css`
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightNormal};
  color: ${darkCharcoalColor};
`);

const Navbar = () => {
  const pathname: string = usePathname();
  const getButtonLabelAndLink = (): {
    buttonLabel: string;
    buttonLink: string;
    isVisible: boolean;
  } => {
    let buttonLabel: string = "Log In";
    let buttonLink: string = ROUTE_NAMES.LOGIN;
    let isVisible: boolean = true;
    switch (pathname) {
      case ROUTE_NAMES.LOGIN:
        buttonLabel = "Not a socialmotion user?";
        buttonLink = ROUTE_NAMES.SIGNUP;
        break;
      case ROUTE_NAMES.SIGNUP:
      case ROUTE_NAMES.FORGOTPASSWORD:
        buttonLabel = "";
        buttonLink = "";
        isVisible = false;
        break;
    }

    return { buttonLabel, buttonLink, isVisible };
  };

  const { buttonLabel, buttonLink, isVisible } = getButtonLabelAndLink();

  return (
    <MainSection>
      <NavWrapper>
        <Link href={ROUTE_NAMES.ROOT}>
          <LogoWrapper>
            <ImageComponent
              src={Logo}
              alt="logo"
              className="logo"
              height={80}
              width={80}
            />
            <LogoTitle>socialmotion</LogoTitle>
          </LogoWrapper>
        </Link>
        <ButtonWrapper>
          <LinkRoute href={buttonLink}>{buttonLabel}</LinkRoute>
          {isVisible && (
            <Link href={ROUTE_NAMES.SIGNUP}>
              <TryItFreeButton type="button">Try it free</TryItFreeButton>
            </Link>
          )}
        </ButtonWrapper>
      </NavWrapper>
    </MainSection>
  );
};

export default Navbar;
