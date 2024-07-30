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
import { resetPasswordSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { UPDATE_PASSWORD } from "@/lib/graphql/mutation/UpdatePassword";
import { useMutation } from "@apollo/client";
import { errorToast, successToast } from "@/styles/toaster";
import { isBrowser } from "@/utils/helperUtils";
import { useRouter } from "next/navigation";

const ChangePassword = ({ token }: { token: string }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const deobfuscate = (string: string) => {
    if (isBrowser) {
      return atob(string);
    }
  };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: { newpassword: "", cnfmpassword: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: async () => {
      try {
        setLoading(true);
        const result = await updatePassword({
          variables: {
            input: {
              newPassword: values.newpassword,
              resetToken: deobfuscate(token),
            },
          },
        });
        if (result?.data && !result?.errors) {
          successToast(result?.data?.updatePassword);
          router.push("/");
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
        <ForgotPasswordTitle>Reset password?</ForgotPasswordTitle>
        <ParagraphText>
          Enter a new password below to change your password.
        </ParagraphText>
        <form onSubmit={handleSubmit}>
          <InputBox
            type={"password"}
            placeholder={"Enter your new password"}
            name={"newpassword"}
            value={values.newpassword}
            onChange={handleChange}
            autocomplete={"off"}
            error={errors.newpassword || ""}
          />
          <InputBox
            type={"password"}
            placeholder={"Confirm your new password"}
            name={"cnfmpassword"}
            value={values.cnfmpassword}
            onChange={handleChange}
            autocomplete={"off"}
            error={errors.cnfmpassword || ""}
          />

          <ButtonWrapper>
            <Button type="submit">{loading ? "Loading..." : "Submit"}</Button>
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

export default ChangePassword;

const MainSection = styled.section(css`
  height: 700px;
`);

const PasswordWrapper = styled(Card)`
  width: ${fullWidth};
  max-width: 569px;
  height: 630px;
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
