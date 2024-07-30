import DealModal from "@/components/deals/DealModal";
import TextArea from "@/components/ui/input/TextArea";
import { useQueryContext } from "@/context/query/queryContext";
import ProfileCard from "@/layouts/userprofile/ProfileCard";
import { typographySubtitle2Normal } from "@/styles/typography";
import {
  guttersPx,
  whiteColor,
  GreenTeal,
  blackColor,
} from "@/styles/variables";
import { wonDealSchema } from "@/utils/formUtils/validations/ValidationUtils";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import React from "react";
import { ProfileWrapper } from "./DeleteDeal";
import { InputContainers } from "./LostDeal";

const CrudFormContainer = styled.div`
  padding: ${guttersPx.extraLarge} 0;
`;
export const Label = styled.div(
  [typographySubtitle2Normal],
  `
   color:${blackColor}
`,
);
const WonDeal = ({ id, profileData }: { id: string; profileData: any }) => {
  const { dealactions, dealActionsClose, onDealActionSubmit } =
    useQueryContext();

  const { errors, values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { comment: "" },
    validationSchema: wonDealSchema,
    onSubmit: async (formvalue, { resetForm: reset }) => {
      await onDealActionSubmit(
        { ...formvalue, ["dealId"]: id, ["isWon"]: true },
        reset,
      );
    },
  });

  return (
    <div>
      <DealModal
        open={dealactions?.won}
        close={dealActionsClose}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        modalHeadig="Mark as won"
        firstButtonText="Cancel"
        secondButtonText="MARK A WON"
        firstButtonColor={whiteColor}
        secondButtonColor={GreenTeal}
      >
        <ProfileWrapper>
          <ProfileCard data={profileData} />
        </ProfileWrapper>
        <CrudFormContainer>
          <InputContainers>
            <Label>Comments</Label>
            <TextArea
              name="comment"
              onChange={handleChange}
              value={values.comment}
              placeholder={""}
              autocomplete={""}
              error={errors.comment || ""}
            />
          </InputContainers>
        </CrudFormContainer>
      </DealModal>
    </div>
  );
};

export default WonDeal;
