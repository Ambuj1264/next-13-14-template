import TextArea from "@/components/ui/input/TextArea";
import { successToast } from "@/styles/toaster";
import {
  borderRadiusTiny,
  fontWeightNormal,
  greyColor,
  lightGreyColor,
} from "@/styles/variables";
import { notesSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { keyType } from "@/utils/helperUtils";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import React, { KeyboardEvent } from "react";

const NotesWrapper = styled.div`
  width: 197px;
  border: 0.5px solid ${greyColor};
  background: ${lightGreyColor};
  border-radius: ${borderRadiusTiny};
  div{
    height: 100%;
    margin-bottom: -4px;

  };
  textarea{
    height: 100%;
    border: 0;
      background: inherit;
      font-size: 15px;
font-weight: ${fontWeightNormal};
`;

export interface UseMutationCallback<
  TData extends string | number | symbol = any,
  TError = any,
> {
  (mutationResult: {
    data?: TData | Record<TData, any>;
    error?: TError;
    variables: any;
  }): any;
}

interface DealNotesProp {
  onUpdate: UseMutationCallback;
  id: string;
  handleForm: (arg1: any, arg2: boolean) => void;
  dealdata: string;
}

const DealNotes = ({ onUpdate, id, dealdata, handleForm }: DealNotesProp) => {
  const { errors, values, handleChange, resetForm, handleSubmit } = useFormik({
    initialValues: { notes: dealdata?.trim() || "" },
    validationSchema: notesSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      const { data } = await onUpdate({
        variables: { input: { ...values, id: id } },
      });
      if (data?.updateDeal) {
        resetForm();
        successToast("Notes updated successfully");
      }
    },
  });
  const handleKeyDown = (e: KeyboardEvent<HTMLImageElement>) => {
    if (e.key == keyType.ENTER_KEY && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <NotesWrapper>
      <TextArea
        onChange={handleChange}
        onFocus={() => {
          handleForm("notes", true);
        }}
        resize="vertical"
        placeholder="Notes"
        onKeyDown={handleKeyDown}
        name="notes"
        value={values.notes}
        autocomplete={"off"}
        error={errors.notes || ""}
      ></TextArea>
    </NotesWrapper>
  );
};

export default DealNotes;
