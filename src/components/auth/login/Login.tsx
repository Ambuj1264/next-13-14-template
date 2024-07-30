import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "../../ui/CardContainer/Card";
import InputBox from "../../ui/input/InputBox";
import Checkbox from "../../ui/Checkbox/CheckBox";
import { Button, cardStyle } from "@/styles/base";
import LinkedinLogin from "./LinkedinLogin/LinkedinLogin";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "@/lib/graphql/queries/loginForm";
import { useRouter } from "next/navigation";
import {
  loginCardMaxWidth,
  darkCharcoalColor,
  gutters,
  whiteColor,
  greyColor,
  fontSizeCaption,
  maxWidthOfMaxWidth,
  gapOfLinkWrapper,
} from "@/styles/variables";
import { loinAndSignUpVariable } from "@/utils/constant";
import { typographyCaptionSmall, typographyH2 } from "@/styles/typography";
import { LoginInput, LoginKeys } from "@/types/user";
import { errorToast, successToast } from "@/styles/toaster";
import { loginSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { useFormik } from "formik";
import { useAuth } from "@/context/auth/authContext";
import { setCookie } from "@/utils/cookiesUtils";
import { checkEmptydataArray } from "@/utils/helperUtils";
import { BOARD_DATA } from "@/lib/graphql/queries/KanbanBoard";

const { loginSuccessful, email, password, Email, Password } =
  loinAndSignUpVariable;
export interface ItemValue {
  name: keyof LoginKeys; // Use keyof LoginInput to ensure type safety
  label: string;
  placeholder: string;
  type: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const { authenticateUser } = useAuth();
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
    remember: false,
  });
  const [handleDealdata] = useLazyQuery(BOARD_DATA, {
    fetchPolicy: "network-only",
  });
  const [login, { loading }] = useLazyQuery(LOGIN, {
    onCompleted: async (data) => {
      authenticateUser(data?.login?.token?.token);
      if (formData.remember) {
        setCookie("remember", true, 7);
      }
      successToast(loginSuccessful);
      const { data: dealdata } = await handleDealdata();
      if (dealdata?.kanbanBoard) {
        const isEmpty = checkEmptydataArray(dealdata?.kanbanBoard);
        return router.push(isEmpty ? "/deals" : "/dashboard");
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async () => {
      const { error: loginErr } = await login({
        variables: { email: values.email, password: values.password },
      });
      if (loginErr) {
        errorToast(loginErr?.message);
      }
    },
  });

  return (
    <>
      <Card maxWidth={loginCardMaxWidth}>
        <LoginWrapper>
          <LoginTitle>Log in</LoginTitle>
          <Form onSubmit={handleSubmit}>
            {LoginFields.map((item, key) => (
              <React.Fragment key={key}>
                <InputBox
                  key={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  value={values[item.name]}
                  onChange={handleChange}
                  autocomplete="off"
                  error={errors[item.name] || ""}
                />
              </React.Fragment>
            ))}
            <ButtonWrapper>
              <Button type="submit">{loading ? "Loading.." : "Log in"}</Button>
            </ButtonWrapper>
            <Checkbox
              name="remember"
              checked={formData.remember}
              handleChange={handleInputChange}
            >
              <CheckboxText>Remember me</CheckboxText>
            </Checkbox>
          </Form>
        </LoginWrapper>
        <LinkedinLogin />
      </Card>
      <LinkWrapper>
        <LinkTo href="/signup">Don&apos;t have an account? </LinkTo>
        <LinkTo href="/forgotpassword">Forgot your password?</LinkTo>
      </LinkWrapper>
    </>
  );
};

const LoginTitle = styled.h2`
  ${typographyH2};
  color: ${darkCharcoalColor};
  text-align: center;
`;

const LoginWrapper = styled.div`
  ${cardStyle};
  background: ${whiteColor};
`;

const Form = styled.form`
  padding: ${gutters.large}px 0;
`;

const ButtonWrapper = styled.div`
  padding: ${gutters.small}px 0;
`;

const CheckboxText = styled.h1`
  ${typographyCaptionSmall};
  line-height: normal;
  color: ${greyColor};
`;

const LinkWrapper = styled.div`
  max-width: ${maxWidthOfMaxWidth};
  margin: ${gutters.large}px auto;
  color: ${darkCharcoalColor};
  font-size: ${fontSizeCaption};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${gapOfLinkWrapper};
`;

const LinkTo = styled(Button)`
  text-align: center;
`;

const LoginFields: ItemValue[] = [
  {
    name: email,
    label: Email,
    placeholder: Email,
    type: email,
  },
  {
    name: password,
    label: Password,
    placeholder: Password,
    type: password,
  },
];
export default Login;
