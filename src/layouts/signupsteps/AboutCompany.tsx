import { RegistrationFormFields } from "@/types/global";
import styled from "@emotion/styled";
import React from "react";
import Input from "../form/formFields/Input";
import SelectField from "../form/SelectBox";
import { SubTitle, Title } from "./GetStarted";

interface Option {
  value: string;
  label: string;
}

const FormField = styled.div``;
const AboutCompany = ({ formField }: { formField: RegistrationFormFields }) => {
  const { companySize, companyname, companyindustry } = formField;

  return (
    <>
      <Title>About your company</Title>
      <SubTitle>
        We&apos;ll use this info to personalize your experience
      </SubTitle>
      <FormField>
        <Input
          type="text"
          placeholder="Company name"
          name={companyname?.name}
          label={companyname?.name}
        />
        <SelectField
          name={companySize.name}
          label={companySize.label}
          data={companySizeData}
        />
        <SelectField
          name={companyindustry.name}
          label={companyindustry.label}
          data={companyindustryData}
        />
      </FormField>
    </>
  );
};

export default AboutCompany;

const companySizeData: Option[] = [
  {
    value: "1-10",
    label: "1-10",
  },
  {
    value: "11-50",
    label: "11-50",
  },
  {
    value: "51-100",
    label: "51-100",
  },
  {
    value: "101-200",
    label: "101-200",
  },
  {
    value: "201-500",
    label: "201-500",
  },
  {
    value: ">500",
    label: ">500",
  },
];

const companyindustryData: Option[] = [
  {
    value: "Manufacturing",
    label: "Manufacturing",
  },
  {
    value: "Energy",
    label: "Energy",
  },
  {
    value: "Financial and insurance",
    label: "Financial and insurance",
  },
  {
    value: "React state",
    label: "React state",
  },
  {
    value: "Consulting and energies",
    label: "Consulting and energies",
  },
  {
    value: "Other",
    label: "Other",
  },
];
