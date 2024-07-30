import { ErrorMessage } from "@/components/ui/input/InputBox";
import MultiSelectDropdown from "@/components/ui/input/MultiSelectDropdown";
import { useQueryContext } from "@/context/query/queryContext";
import { UPDATE_DEAL } from "@/lib/graphql/mutation/updateDeal";
import { PlusIcon } from "@/styles/base";
import { GreenTeal, guttersPx } from "@/styles/variables";
import { CancelIcon, CheckIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import { assigneeSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import React, { useState } from "react";

const Wrapper = styled.div`
  display: block;
  width: 100%;
`;
export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${guttersPx.small};
  align-items: center;
  padding-top: ${guttersPx.smallHalf};
  cursor: pointer;
`;
const AddIConWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;
const Assignee = ({
  handleForm,
}: {
  handleForm: (arg1: any, arg2: boolean) => void;
}) => {
  const { teammembers, listData, dealId } = useQueryContext();
  const getOptions = teammembers?.getTeamMembersByCompanyId?.map(
    (item: { fullName: string; id: string }) => ({
      label: item.fullName,
      value: item.id,
    }),
  );
  const [isAssignee, setIsAssignee] = useState(false);
  const getteamMemberId = (inputs: any[]) => {
    return inputs?.map((item) => {
      return item.value;
    });
  };

  const [handleDealupdate] = useMutation(UPDATE_DEAL, {
    onCompleted: listData,
  });
  const { errors, values, setFieldValue, resetForm, handleSubmit } = useFormik({
    initialValues: { teamMembers: [] },
    validationSchema: assigneeSchema,
    onSubmit: async () => {
      const { data } = await handleDealupdate({
        variables: {
          input: {
            teamMembers: getteamMemberId(values?.teamMembers),
            id: dealId,
          },
        },
      });
      if (data?.updateDeal) {
        setIsAssignee(!isAssignee);
      }
    },
  });

  const handleAssignee = () => {
    resetForm();
    handleForm("assignee", true);
    setIsAssignee(!isAssignee);
  };
  return !isAssignee ? (
    <AddIConWrapper>
      <PlusIcon onClick={handleAssignee}>+</PlusIcon>
    </AddIConWrapper>
  ) : (
    <Wrapper>
      <MultiSelectDropdown
        options={getOptions}
        name="teamMembers"
        setFieldValue={setFieldValue}
      />
      {errors?.teamMembers && (
        <ErrorMessage>{errors?.teamMembers}</ErrorMessage>
      )}
      <IconWrapper>
        <CheckIcon
          onClick={handleSubmit}
          color={GreenTeal}
          width="18"
          height="18"
        />
        <CancelIcon onClick={handleAssignee} width="18" height="18" />
      </IconWrapper>
    </Wrapper>
  );
};

export default Assignee;
