import Card from "@/components/ui/CardContainer/Card";
import CheckBox from "@/components/ui/Checkbox/CheckBox";
import InputBox from "@/components/ui/input/InputBox";
import { Button, cardStyle, Chip, mqMax } from "@/styles/base";
import {
  typographyCaptionSmall,
  typographyH2,
  typographyH3,
  typographySubtitle2Regular,
} from "@/styles/typography";
import {
  darkblueColor,
  darkCharcoalColor,
  fontFamily,
  fontSizeBody2,
  fontSizeCaption,
  fontWeightBold,
  fontWeightNormal,
  gutters,
  lighOrange,
  lightBlueColor,
  loginCardMaxWidth,
  whiteColor,
} from "@/styles/variables";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState } from "react";
import LinkedinLogin from "../login/LinkedinLogin/LinkedinLogin";
import { useFormik } from "formik";
import Modal from "@/components/ui/modal/Modal";
import { schema } from "@/utils/formUtils/validations/ValidationUtils";
import RegistrationSteps from "@/components/ui/stepper/RegistrationSteps";
import Link from "next/link";
import { ROUTE_NAMES } from "@/shared/routeNames";

const Title = styled.h1([
  typographyH2,
  css`
    color: ${darkblueColor};
    text-align: center;
    ${mqMax.large} {
      ${typographyH3}
    }
  `,
]);

const SignUpWrapper = styled.div(
  [cardStyle],
  ` background: ${whiteColor};
  `,
);

const SubTitleWrapper = styled.div`
  text-align: center;
  padding: ${gutters.large}px;
`;
const Subtitles = styled.h1(
  [typographySubtitle2Regular],
  css`
    color: ${darkCharcoalColor};
    padding: ${gutters.small - 10}px 0;
  `,
);

const ChipWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${gutters.small}px;
`;
const Form = styled.form`
  padding: ${gutters.large}px 0;
`;

const LoginLink = styled.div`
  font-size: ${fontSizeBody2};
  font-weight: ${fontWeightNormal};
  font-family: ${fontFamily};
  color: ${darkCharcoalColor};
  text-align: center;
`;

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = (value: string) => {
    setShowModal(true);
    setEmail(value);
  };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", tips: false, termandcondition: false },
    validationSchema: schema,
    onSubmit: async ({ email: emailAddress }) => {
      handleSignUp(emailAddress);
    },
  });
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const CheckboxText = styled.h1(
    [typographyCaptionSmall],
    `
    line-height:normal;
    color: ${darkCharcoalColor};
  `,
  );
  const LinkTo = styled(Link)<{
    color?: string;
  }>(
    ({ color = lighOrange }) => css`
      color: ${color};
    `,
  );
  const CheckBoxWrapper = styled.div`
    padding: ${gutters.small}px 0;
  `;

  return (
    <Card maxWidth={loginCardMaxWidth}>
      <SignUpWrapper>
        <Title>Start closing more deals with socialmotion</Title>
        <SubTitleWrapper>
          <Subtitles>✔️ A CRM by salespeople, for salespeople</Subtitles>
          <Subtitles>✔️ Easy to customize and organize</Subtitles>
        </SubTitleWrapper>
        <ChipWrapper>
          <Chip
            bgcolor={lightBlueColor}
            color={darkblueColor}
            fontSize={fontSizeCaption}
            fontWeight={fontWeightBold}
          >
            100% access. No credit card required
          </Chip>
        </ChipWrapper>
        <Form onSubmit={handleSubmit}>
          <InputBox
            type="email"
            id="email"
            placeholder="Enter your work email"
            name="email"
            value={values.email}
            onChange={handleChange}
            autocomplete="off"
            error={errors.email || ""}
          />
          <CheckBoxWrapper>
            <CheckBox
              name="tips"
              checked={values.tips}
              handleChange={handleChange}
              error={errors.tips}
            >
              <CheckboxText>
                Get helpful tips, product updates and <br /> exclusive offers
                via email
              </CheckboxText>
            </CheckBox>
            <CheckBox
              name="termandcondition"
              checked={values.termandcondition}
              handleChange={handleChange}
              error={errors.termandcondition}
            >
              <CheckboxText>
                By signing up, you accept our{" "}
                <LinkTo href={ROUTE_NAMES.WEB_URL} target="_blank">
                  Terms of service
                </LinkTo>{" "}
                and <br />
                <LinkTo href={ROUTE_NAMES.WEB_URL} target="_blank">
                  Privacy Notice
                </LinkTo>
              </CheckboxText>
            </CheckBox>
          </CheckBoxWrapper>
          <Button type="submit">Sign up</Button>
        </Form>
        <LoginLink>
          Already have an account?{" "}
          <LinkTo color={darkblueColor} href={ROUTE_NAMES.LOGIN}>
            Log in
          </LinkTo>
        </LoginLink>
        <Modal
          maxWidth="sm"
          width="517"
          open={showModal}
          title=""
          closeModal={handleCloseModal}
        >
          <RegistrationSteps email={email} />
        </Modal>
      </SignUpWrapper>
      <LinkedinLogin />
    </Card>
  );
};

export default SignUp;
