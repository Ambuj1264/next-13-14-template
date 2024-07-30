import { typographySubtitle1 } from "@/styles/typography";
import { blackColor, gutters } from "@/styles/variables";
import { RegistrationFormFields } from "@/types/global";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import ListSelect from "../form/formFields/ListSelect";
import Select from "../form/SelectBox";
import { SubTitle, Title } from "./GetStarted";

const ChoiceWrapper = styled.div`
  padding: ${gutters.small}px 0;
`;
const ChoiceTitle = styled.h1(
  [typographySubtitle1],
  css`
    color: ${blackColor};
  `,
);
interface Option {
  value: string;
  label: string;
}
interface Feature {
  title: string;
  icon: string;
}

const AboutYou = ({ formField }: { formField: RegistrationFormFields }) => {
  const { experience, jobRole, need } = formField;
  return (
    <>
      <Title>About you</Title>
      <SubTitle>
        We&apos;ll use this info to personalize your experience
      </SubTitle>
      <Select name={jobRole.name} label={jobRole.label} data={role} />
      <Select
        name={experience.name}
        label={experience.label}
        data={experiencedata}
      />
      <ChoiceWrapper>
        <ChoiceTitle>What do you want to do first?</ChoiceTitle>
        <ListSelect
          name={need.name}
          label={need.label}
          data={listData}
          direction="column"
        />
      </ChoiceWrapper>
    </>
  );
};

export default AboutYou;

const listData: Feature[] = [
  { title: "Close deals faster", icon: "/assets/images/closedeal.svg" },
  { title: "Find new leads", icon: "/assets/images/newleads.svg" },
  { title: "Manage relationships better", icon: "/assets/images/manage.svg" },
  { title: "Set goals and track progress", icon: "/assets/images/track.svg" },
  { title: "Set up a team and permissions", icon: "/assets/images/team.svg" },
];
const role: Option[] = [
  {
    value: "1",
    label: "Sales manager",
  },
  {
    value: "2",
    label: "VP/CEO",
  },
  {
    value: "3",
    label: "Project manager",
  },
  {
    value: "4",
    label: "Marketer",
  },
  {
    value: "5",
    label: "Customer success",
  },
  {
    value: "6",
    label: "Other",
  },
];

const experiencedata: Option[] = [
  {
    value: "1",
    label: "I haven't used any sales tools before",
  },
  {
    value: "2",
    label: "I used spreadsheet to track my data",
  },
  {
    value: "3",
    label: "I've used a CRM for my sales activities",
  },
];
