"use client";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { cardStyle, HorizontalRule } from "@/styles/base";
import { loinAndSignUpVariable } from "@/utils/constant";
import {
  fontWeightBold,
  greyColor,
  gutters,
  almondColor,
} from "@/styles/variables";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { errorToast, successToast } from "@/styles/toaster";
import { typographyBody1 } from "@/styles/typography";
import { css } from "@emotion/core";
import Link from "next/link";
import Image from "next/image";
import { ROUTE_NAMES } from "@/shared/routeNames";
const {
  jwtToken,
  linkedinAuthToken,
  loginNotSuccessful,
  loginSuccessful,
  loginUrlEndpoint,
  scope,
  signupUrlEndpoint,
  somethingWentWrong,
  userIsNotFind,
  userIsNotFindSignup,
  windowObject,
} = loinAndSignUpVariable;
const ButtonWrapper = styled.div`
  margin-top: ${gutters.large}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkdinLoginWrapper = styled.div(
  [cardStyle],
  `
  background:${almondColor};
`,
);
const LoginTitle = styled.p(
  [typographyBody1],
  css`
    color: ${greyColor};
    font-weight: ${fontWeightBold};
    font-size: 13px;
    margin-left: 8px;
  `,
);
const LinkTo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const clientId: string = process.env.CLIENT_ID || "";
const baseUrl: string = process.env.API_BASE_URL || "";
const LinkedinLogin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [authCode, setAuthCode] = useState<string | null>(null);

  const { linkedInLogin } = useLinkedIn({
    clientId: clientId,
    redirectUri: `${
      typeof window === windowObject && window.location.origin
    }/linkedin`,
    onSuccess: async (code) => {
      setAuthCode(code);
    },
    scope: scope,
    onError: () => {
      errorToast(somethingWentWrong);
    },
  });

  const LoginContext = useCallback(async () => {
    if (authCode) {
      try {
        const response = await axios.post(`${baseUrl}/linkedinLogin`, {
          code: authCode,
        });
        if (response?.data.success) {
          localStorage.setItem(
            linkedinAuthToken,
            response?.data?.data?.linkedinToken,
          );
          localStorage.setItem(jwtToken, response?.data?.data?.ownJwtToken);
          successToast(loginSuccessful);
          return router.push(ROUTE_NAMES.DASHBOARD);
        } else if (response?.data?.message == userIsNotFind) {
          errorToast(userIsNotFindSignup);
        } else {
          errorToast(loginNotSuccessful);
        }
      } catch (error) {
        errorToast(somethingWentWrong);
      }
    }
  }, [authCode, router]);

  useEffect(() => {
    if (pathname == signupUrlEndpoint || pathname == loginUrlEndpoint) {
      LoginContext();
    }
  }, [LoginContext, pathname]);

  return (
    <LinkdinLoginWrapper>
      <HorizontalRule
        text="or access quickly"
        color={greyColor}
        bgcolor={almondColor}
      />
      <ButtonWrapper>
        <LinkTo href={"#"} onClick={linkedInLogin}>
          <Image
            src="/assets/icons/Linkedin.svg"
            alt="ArrowIcon"
            width={23}
            height={23}
          />
          <LoginTitle>LinkedIn</LoginTitle>
        </LinkTo>
      </ButtonWrapper>
    </LinkdinLoginWrapper>
  );
};

export default LinkedinLogin;
