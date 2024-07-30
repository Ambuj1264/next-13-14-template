import React, { useState, useRef } from "react";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepButton from "@mui/material/StepButton";
import { Formik, Form } from "formik";
import GetStarted from "@/layouts/signupsteps/GetStarted";
import AboutYou from "@/layouts/signupsteps/AboutYou";
import AboutCompany from "@/layouts/signupsteps/AboutCompany";
import { registrationFormModel } from "@/utils/formUtils/formModals/registrationmodals";
import { validationSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { Button, heroSectionCss } from "@/styles/base";
import formInitialValues, {
  FormFields,
} from "@/utils/formUtils/formModals/formInitialValues";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/components/auth/verification/Captcha";
import styled from "@emotion/styled";
import {
  darkCharcoalColor,
  fontFamily,
  fontWeightBold,
  fontWeightNormal,
  gutters,
  lightGreyColor,
} from "@/styles/variables";
import { css } from "@emotion/core";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/lib/graphql/mutation/mutation";
import { useRouter } from "next/navigation";
import { loinAndSignUpVariable } from "@/utils/constant";
import { errorToast, successToast } from "@/styles/toaster";

const steps = ["Account", "About you", "Company"];
const { formId, formField } = registrationFormModel;
console.log(formField, "socialmotion.bi");

interface Email {
  email: string;
}
const { signupSuccessful } = loinAndSignUpVariable;
const Wrapper = styled.div`
  padding: ${gutters.large}px;
`;
const ButtonWrapper = styled.div(
  [heroSectionCss],
  css`
    gap: 10px;
  `,
);

const CustomStepper = styled(Stepper)`
  & .MuiStepButton-root .MuiStepLabel-label {
    text-align: center;
    font-family: ${fontFamily};
    color: ${darkCharcoalColor};
    font-weight: ${fontWeightNormal};
  }

  & .MuiStepButton-root .MuiStepIcon-text {
    font-weight: ${fontWeightBold};
    font-family: ${fontFamily};
  }

  & .Mui-disabled .MuiStepIcon-text {
    fill: ${darkCharcoalColor};
  }

  & .Mui-disabled .MuiStepIcon-root {
    color: ${lightGreyColor};
  }
`;
const RegistrationSteps: React.FC<Email> = ({ email }) => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  const [handleSignUp] = useMutation(CREATE_USER);
  const router = useRouter();
  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }
  console.log(isVerified);

  const Signup = async (values: FormFields) => {
    const { termandcondition, helpfulTips, ...rest } = values;
    try {
      const { data } = await handleSignUp({
        variables: {
          input: { ...rest, email, loginType: "JWT" },
        },
      });
      if (data?.createUser) {
        successToast(signupSuccessful);
        router.push("/deals");
      }
    } catch (err: any) {
      errorToast(err?.message);
    }
  };

  const handleSubmit = async (
    values: FormFields,
    actions: {
      setSubmitting: (arg0: boolean) => void;
      setTouched: (arg0: {}) => void;
    },
  ) => {
    if (isLastStep) {
      await Signup(values);
      actions.setSubmitting(false);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const stecomponents = {
    0: <GetStarted formField={formField} email={email} />,
    1: <AboutYou formField={formField} />,
    2: <AboutCompany formField={formField} />,
    default: <div>Not Found</div>,
  }[activeStep];
  const buttonTexts = ["Continue", "Next", "Submit"];
  return (
    <>
      <CustomStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </CustomStepper>
      <Wrapper>
        <Formik
          initialValues={formInitialValues}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form id={formId}>
              {stecomponents}
              <ButtonWrapper>
                {activeStep === 2 && (
                  <ReCAPTCHA
                    sitekey={process.env.SITE_KEY as string}
                    ref={recaptchaRef}
                    onChange={handleCaptchaSubmission}
                  />
                )}
                <Button disabled={isSubmitting} type="submit">
                  {buttonTexts[activeStep]}
                </Button>
              </ButtonWrapper>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default RegistrationSteps;
