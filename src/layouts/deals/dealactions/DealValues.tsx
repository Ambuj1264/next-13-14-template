import InputBox from "@/components/ui/input/InputBox";
import SelectBox from "@/components/ui/selectBox/SelectBox";
import { successToast } from "@/styles/toaster";
import { GreenTeal, borderRadiusTiny } from "@/styles/variables";
import { valueOption } from "@/utils/constant";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import React, { useState } from "react";
import { SubTitle } from "../dealdetails/Dealdetails";
import { IconWrapper } from "./Assignee";
import { CancelIcon, CheckIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import { valueUpdateSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { getSymbol } from "@/utils/helperUtils";

const DealValuesWrapper = styled.div`
  height: auto;
  border-radius: ${borderRadiusTiny};
`;
const FieldWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
interface TagsProps {
  dealValue: any;
  onUpdate: any;
  id: string;
  isOpen: boolean;
  handleForm: (arg1: any, arg2: boolean) => void;
}
const DealValues = ({
  dealValue,
  isOpen,
  onUpdate,
  id,
  handleForm,
}: TagsProps) => {
  const [state, setState] = useState(false);
  const { errors, values, handleChange, resetForm, handleSubmit } = useFormik({
    initialValues: {
      value: dealValue?.getDealById?.value || "",
      valueType: dealValue?.getDealById?.valueType || "Euro (EUR)",
    },
    validationSchema: valueUpdateSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      const { data: updatedata } = await onUpdate({
        variables: { input: { ...values, id: id } },
      });
      if (updatedata?.updateDeal) {
        handleAction();
        successToast("Value updated successfully");
      }
    },
  });
  const handleAction = () => {
    handleForm("value", true);
    setState(!state);
    resetForm();
  };
  const symbol = getSymbol(dealValue?.getDealById?.valueType);
  const subtitle = !dealValue?.getDealById?.value
    ? "To be completed"
    : `${dealValue?.getDealById?.value}${symbol}`;
  return (
    <DealValuesWrapper>
      {!state || !isOpen ? (
        <SubTitle
          onClick={handleAction}
          isValues={!dealValue?.getDealById?.value}
        >
          {subtitle}
        </SubTitle>
      ) : (
        <>
          <FieldWrapper>
            <div>
              {" "}
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
            </div>
            <SelectBox
              name="valueType"
              options={valueOption}
              value={values.valueType}
              onChange={handleChange}
            />
          </FieldWrapper>
          <IconWrapper>
            <CheckIcon
              onClick={handleSubmit}
              color={GreenTeal}
              width="18"
              height="18"
            />
            <CancelIcon onClick={handleAction} width="18" height="18" />
          </IconWrapper>
        </>
      )}
    </DealValuesWrapper>
  );
};

export default DealValues;
