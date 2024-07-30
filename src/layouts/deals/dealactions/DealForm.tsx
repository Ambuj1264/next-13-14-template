import SmallButton from "@/components/ui/button/SmallButton";
import InputBox from "@/components/ui/input/InputBox";
import MultiSelectInput from "@/components/ui/input/MultiSelectInput";
import { useQueryContext } from "@/context/query/queryContext";
import { UPDATE_DEAL } from "@/lib/graphql/mutation/updateDeal";
import { errorToast, successToast } from "@/styles/toaster";
import { dealByUserFormSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import React from "react";
import { Label } from "../DealFormComponent";

const FormWrapper = styled.form`
  border-radius: 4px;
  background: var(--White, #fff);
  box-shadow: 0px 0.5px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  padding: 20px;
`;
const InputWrapper = styled.div``;
const StyledButton = styled(SmallButton)`
background:#67D64BB2;
color: #21680F;
font-family: Montserrat;
font-size: 10px;
font-weight: 700;
box-shadow:none;
display: block;
    margin-left: auto;
}
`;
type ContactInfo = {
  [key: string]: string;
};
const keys: ContactInfo = {
  webURL: "Website",
  email: "Email",
  tags: "Tags",
  linkedin: "Linkedin",
  calendly: "Calendly",
  phone: "Phone",
};
const DealForm = ({
  name,
  data,
  id,
  handleProfileModal,
}: {
  name: string;
  data: string;

  id: string;
  handleProfileModal: (arg1: boolean) => void;
}) => {
  const { listData } = useQueryContext();
  const [handleDealupdate] = useMutation(UPDATE_DEAL, {
    onCompleted: listData,
  });

  const UpdateForm = async (inputdata: {
    input: { [x: string]: string; id: string };
  }) => {
    try {
      const { data: updateData } = await handleDealupdate({
        variables: inputdata,
      });
      if (updateData?.updateDeal) {
        successToast("Deal updated successfully.");
        handleProfileModal(false);
      }
    } catch (err: any) {
      errorToast(err?.message || "Something went wrong");
    }
  };

  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { [name]: data || "" },
      validationSchema: dealByUserFormSchema(name),
      enableReinitialize: true,
      onSubmit: () => {
        UpdateForm({
          input: {
            id: id,
            [name]: values?.[name],
          },
        });
      },
    });

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <Label style={{ textTransform: "capitalize" }}>{keys?.[name]}</Label>
        {name !== "tags" && (
          <InputBox
            type={"text"}
            fullborder
            placeholder={""}
            name={name}
            onChange={handleChange}
            value={values?.[name]}
            autocomplete={""}
            error={errors?.[name] || ("" as any)}
          />
        )}
        {name === "tags" && (
          <div style={{ marginBottom: "10px" }}>
            <MultiSelectInput
              defaultValue={data}
              name="tags"
              error={errors.tags}
              setFieldValue={setFieldValue}
            />
          </div>
        )}
      </InputWrapper>
      <StyledButton type="submit">Save</StyledButton>
    </FormWrapper>
  );
};

export default DealForm;
