import DealModal from "@/components/deals/DealModal";
import TextArea from "@/components/ui/input/TextArea";
import SelectBox from "@/components/ui/selectBox/SelectBox";
import { useQueryContext } from "@/context/query/queryContext";
import ProfileCard from "@/layouts/userprofile/ProfileCard";
import { lightRedColor, guttersPx, whiteColor } from "@/styles/variables";
import { lostReasons } from "@/utils/constant";
import { lostDealSchema } from "@/utils/formUtils/validations/ValidationUtils";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import React from "react";
import { ProfileWrapper } from "./DeleteDeal";
import { Label } from "./WonDeal";

const CrudFormContainer = styled.div`
  padding: ${guttersPx.extraLarge} 0;
`;

export const InputContainers = styled.div`
  margin-bottom: 10px;
  input,
  textarea {
    border-radius: 5px !important;
  }
`;

const LostDeal = ({ id, profileData }: { id: string; profileData: any }) => {
  const { dealactions, dealActionsClose, onDealActionSubmit } =
    useQueryContext();

  const { errors, values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { comment: "", lostReason: "Low Budget" },
    validationSchema: lostDealSchema,
    onSubmit: async (formvalues, { resetForm: reset }) => {
      await onDealActionSubmit(
        { ...formvalues, ["dealId"]: id, ["isLost"]: true },
        reset,
      );
    },
  });

  return (
    <div>
      <DealModal
        open={dealactions?.lost}
        close={dealActionsClose}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        modalHeadig="Mark as lost"
        firstButtonText="Cancel"
        secondButtonText="MARK A LOST"
        firstButtonColor={whiteColor}
        secondButtonColor={lightRedColor}
      >
        <ProfileWrapper>
          <ProfileCard data={profileData} />
        </ProfileWrapper>
        <CrudFormContainer>
          <InputContainers>
            <Label>Lost reason</Label>
            <SelectBox
              name="lostReason"
              options={lostReasons}
              value={values.lostReason}
              onChange={handleChange}
            />
          </InputContainers>
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

export default LostDeal;
