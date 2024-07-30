import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  darkCharcoalColor,
  fontFamily,
  fontSizeCaption,
  fontWeightNormal,
  fontWeightRegular,
  fullWidth,
  gutters,
} from "@/styles/variables";
import { typographyH2, typographySubtitle2Regular } from "@/styles/typography";
import ButtonLarge from "@/components/ui/button/ButtonLarge";
import Card from "@/components/ui/CardContainer/Card";
import InputBox from "@/components/ui/input/InputBox";
import { useFormik } from "formik";
import { forgetPasswordSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { FORGET_PASSWORD } from "@/lib/graphql/mutation/LoginReset";
import { useMutation } from "@apollo/client";
import { errorToast, successToast } from "@/styles/toaster";

const ForgotPassword: React.FC = () => {
  const [loginReset] = useMutation(FORGET_PASSWORD);
  const [loading, setLoading] = useState(false);

  const { errors, values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: { email: "" },
    validationSchema: forgetPasswordSchema,
    onSubmit: async () => {
      try {
        setLoading(true);
        const result = await loginReset({
          variables: { input: { email: values.email } },
        });

        if (result?.data && !result?.errors) {
          successToast(result?.data?.loginReset);
          setValues({ email: "" });
        }
      } catch (error: any) {
        errorToast(error?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <MainSection>
      <PasswordWrapper>
        <ForgotPasswordTitle>Need a new password?</ForgotPasswordTitle>
        <ParagraphText>
          Please provide your email address and we&apos;ll send you instructions
          on how to change your password.
        </ParagraphText>
        <form onSubmit={handleSubmit}>
          <InputBox
            type={"email"}
            placeholder={"Enter your email"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            autocomplete={"off"}
            error={errors.email || ""}
          />
          <ButtonWrapper>
            <Button type="submit">
              {loading ? "Loading..." : "Get a new password"}
            </Button>
          </ButtonWrapper>
        </form>
      </PasswordWrapper>
      <LinkWrapper>
        <LinkTo href="/signup">Don&apos;t have an account? </LinkTo>
        <LinkTo href="/login">Log in</LinkTo>
      </LinkWrapper>
    </MainSection>
  );
};
const MainSection = styled.section(css`
  height: 700px;
`);

const PasswordWrapper = styled(Card)`
  width: ${fullWidth};
  max-width: 569px;
  height: 426px;
  padding: 72px;
`;

const LinkWrapper = styled.div`
  color: ${darkCharcoalColor};
  font-size: ${fontSizeCaption};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ForgotPasswordTitle = styled.h2(
  [typographyH2],
  css`
    color: ${darkCharcoalColor};
    text-align: center;
    padding-top: ${gutters.large}px;
  `,
);

const ParagraphText = styled.p(
  [typographySubtitle2Regular],
  `font-weight:${fontWeightNormal};
    color: ${darkCharcoalColor};
    padding-top: 27px;
    padding-bottom: 37px;
    line-height: 21px;
    text-align: center;
  `,
);

const ButtonWrapper = styled.div(css`
  width: ${fullWidth};
  display: flex;
  justify-content: center;
  margin-bottom: ${gutters.large}px;
`);

const LinkTo = styled(ButtonLarge)(css`
  font-family: ${fontFamily};
  margin-top: ${gutters.large}px;
  font-weight: ${fontWeightRegular};
`);

const Button = styled(ButtonLarge)(css`
  width: ${fullWidth};
  font-family: ${fontFamily};
  margin-top: ${gutters.large}px;
`);

export default ForgotPassword;
