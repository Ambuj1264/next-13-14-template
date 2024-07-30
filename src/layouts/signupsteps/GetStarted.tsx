import {
  typographyH2,
  typographySubtitle2,
  typographySubtitle2Regular,
} from "@/styles/typography";
import { blackColor, darkblueColor, gutters } from "@/styles/variables";
import { RegistrationFormFields } from "@/types/global";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import Input from "../form/formFields/Input";

export const Title = styled.h1(
  [typographyH2],
  css`
    color: ${darkblueColor};
    padding: ${gutters.small}px 0;
    text-align: center;
  `,
);
export const SubTitle = styled.h1(
  [typographySubtitle2Regular],
  css`
    color: ${blackColor};
    padding-bottom: ${gutters.small}px;
    text-align: center;
  `,
);

const NumberField = styled.div`
  display: flex;
  gap: 32px;
  & div:first-child {
    max-width: 50px !important;
  }
`;

const EmailTitle = styled.span([typographySubtitle2]);

const GetStarted = ({
  formField,
  email,
}: {
  formField: RegistrationFormFields;
  email: string;
}) => {
  const { fullName, phonenumber, code, password } = formField;
  return (
    <>
      <Title>Let&apos;s get started</Title>
      <SubTitle>
        You&apos;re signing up as <EmailTitle>{email}</EmailTitle>
      </SubTitle>
      <Input
        type="text"
        placeholder="Your name"
        name={fullName?.name}
        label={fullName?.name}
      />
      <Input
        type="password"
        placeholder="Choose a password"
        name={password?.name}
        label={password?.name}
      />
      <NumberField>
        <Input
          type="text"
          placeholder="+ nº"
          name={code?.name}
          label={code?.name}
        />
        <Input
          type="text"
          placeholder="Your phone"
          name={phonenumber?.name}
          label={phonenumber?.name}
        />
      </NumberField>
    </>
  );
};

export default GetStarted;
