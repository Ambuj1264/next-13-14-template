import { GroupBadge } from "@/components/ui/avatar/Avatar";
import DealCheckBox from "@/components/ui/Checkbox/DealCheckBox";
import { FileUpload } from "@/components/ui/input/FileUpload";
import InputBox from "@/components/ui/input/InputBox";
import MultiSelectInput from "@/components/ui/input/MultiSelectInput";
import SelectBox from "@/components/ui/selectBox/SelectBox";
import { useQueryContext } from "@/context/query/queryContext";
import { typographyParagraph } from "@/styles/typography";
import { darkCharcoalColor } from "@/styles/variables";
import { NewDealFormInitialProps } from "@/types/global";
import { valueOption, workOption } from "@/utils/constant";
import {
  DateIcon,
  EmailIcon,
  LinkedInIcon,
  CalendlyIcon,
  NameIcon,
  OrganizationIcon,
  TagsIcon,
} from "@/utils/formUtils/InputSvg/InputSvg";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
interface DealFormComponentProps {
  values: NewDealFormInitialProps;
  handleChange(): void;
  setFieldValue: (field: keyof NewDealFormInitialProps, value: any) => void;
  errors: any;
}

const DealFormComponent: React.FC<DealFormComponentProps> = ({
  values,
  handleChange,
  setFieldValue,
  errors,
}) => {
  const { teammembers, membersRefecth } = useQueryContext();
  useEffect(() => {
    membersRefecth();
  }, [membersRefecth]);
  return (
    <>
      <FormWrapper>
        <Grid gap={50} position="start">
          <GridItem>
            <Label>Name</Label>
            <InputBox
              type="text"
              placeholder={""}
              name="name"
              value={values?.name}
              onChange={handleChange}
              autocomplete="off"
              error={errors.name}
              Icon={NameIcon}
            />
          </GridItem>
          <RowGridItem>
            <Label>Select team members</Label>
            <GroupBadge
              name="teamMembers"
              error={errors.teamMembers}
              handleCheked={handleChange}
              selectable
              data={teammembers?.getTeamMembersByCompanyId}
              dimension="22"
            />
          </RowGridItem>
        </Grid>
        <Grid gap={50} position="start">
          <GridItem>
            <Label>Organization</Label>
            <InputBox
              type="text"
              placeholder={""}
              name="organization"
              value={values.organization}
              onChange={handleChange}
              autocomplete="off"
              error={errors.organization}
              Icon={OrganizationIcon}
            />
          </GridItem>
          <RowGridItem>
            <Label>Add lead’s image</Label>
            <FileUpload
              setFieldValue={setFieldValue}
              error={errors.leadImage}
            />
          </RowGridItem>
        </Grid>
        <Grid gap={50} position="start">
          <GridItem>
            <Grid gap={20} position="center">
              <GridItem>
                <Label>Value</Label>
                <InputBox
                  fullborder
                  type="text"
                  placeholder={""}
                  name="value"
                  value={values.value}
                  onChange={handleChange}
                  autocomplete="off"
                  error={errors.value}
                  Icon="none"
                />
              </GridItem>
              <GridItem>
                <SelectBox
                  name="valueType"
                  options={valueOption}
                  value={values.valueType}
                  onChange={handleChange}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid gap={20} position="center">
              <GridItem>
                <Label>Phone</Label>
                <InputBox
                  fullborder
                  type="text"
                  placeholder={""}
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  autocomplete="off"
                  error={errors.phone}
                  Icon="none"
                />
              </GridItem>
              <GridItem>
                <SelectBox
                  name="phoneType"
                  options={workOption}
                  value={values.phoneType}
                  onChange={handleChange}
                />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
        <Grid gap={50} position="start">
          <GridItem>
            <Label>Email</Label>
            <InputBox
              type="text"
              placeholder={""}
              name="email"
              value={values.email}
              autocomplete="off"
              onChange={handleChange}
              error={errors.email}
              Icon={EmailIcon}
            />
          </GridItem>
          <GridItem type="date">
            <Label>Expected close date</Label>
            <InputBox
              type="date"
              placeholder="fff"
              name="expectedCloseDate"
              value={values.expectedCloseDate}
              autocomplete="off"
              onChange={handleChange}
              error={errors.expectedCloseDate}
              Icon={DateIcon}
              onKeyDown={(e) => e.preventDefault()}
            />
          </GridItem>
        </Grid>
        <Grid gap={50} position="start">
          <GridItem>
            <Label>Tags</Label>
            <MultiSelectInput
              Icon={TagsIcon}
              name="tags"
              error={errors.tags}
              setFieldValue={setFieldValue}
            />
          </GridItem>
          <GridItem>
            <Label>LinkedIn</Label>
            <InputBox
              type="text"
              placeholder={""}
              name="linkedin"
              value={values.linkedin}
              autocomplete="off"
              onChange={handleChange}
              error={errors.linkedin}
              Icon={LinkedInIcon}
            />
          </GridItem>
        </Grid>
        <Grid gap={50} position="start">
          <GridItem>
            <Label>Stage</Label>
            <DealCheckBox
              error={errors.stage}
              handleChecked={handleChange}
              setFieldValue={setFieldValue}
              name="stage"
            />
            <Label>{values?.stage?.at(-1)}</Label>
          </GridItem>
          <GridItem>
            <Label>Calendly</Label>
            <InputBox
              type="text"
              placeholder={""}
              name="calendly"
              value={values.calendly}
              autocomplete="off"
              onChange={handleChange}
              error={errors.calendly}
              Icon={CalendlyIcon}
            />
          </GridItem>
        </Grid>
      </FormWrapper>
    </>
  );
};

export default DealFormComponent;

const FormWrapper = styled.div`
  background: #fff;
  padding: 50px 20px;
`;
export const Label = styled.h3(
  [typographyParagraph],
  `
  color:${darkCharcoalColor};
  margin-bottom:3px
`,
);
const Grid = styled.div<{
  gap: string | number;
  position: string;
}>(
  ({ gap, position }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(33.33%, 1fr));
    grid-gap: ${gap}px;
    align-items: ${position};
    margin-bottom: 5px;
  `,
);

const GridItem = styled.div<{
  type?: string;
}>(
  ({ type }) => css`
    grid-row: 1;
    input {
      font-size: 14px;
      font-weight: 500;
      text-transform: ${type === "date" && "uppercase"} !important;
    }
    input::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  `,
);

const RowGridItem = styled.div`
  display: flex;
  gap: 30px;
  max-height: 25px;
  align-items: center;
  & div {
    margin: 0;
  }
`;
