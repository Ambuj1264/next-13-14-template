import { BoxeswidthoneText } from "@/components/deals/dealdetails/DealDetailByUsers";
import { ErrorMessage } from "@/components/ui/input/InputBox";
import { useQueryContext } from "@/context/query/queryContext";
import { UPDATE_DEAL } from "@/lib/graphql/mutation/updateDeal";
import { successToast } from "@/styles/toaster";
import { typographyH4 } from "@/styles/typography";
import {
  borderRadiusTiny,
  darkCharcoalColor,
  greyColor,
  guttersPx,
  lightGreyColor,
  rosePinkColor,
} from "@/styles/variables";
import {
  handleKeyPress,
  probabilitySchema,
} from "@/utils/formUtils/validations/ValidationUtils";
import { keyType } from "@/utils/helperUtils";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useState } from "react";

const ProbabilityText = styled.h3<{ color: string | null }>`
  ${typographyH4};
  color: ${({ color }) => (!color ? rosePinkColor : darkCharcoalColor)};
`;
const Wrapper = styled.div`
  padding-top: ${guttersPx.smallHalf};
`;
const Boxeswidthone = styled.div`
  min-width: 198px;
  min-height: 80px;
  border-radius: ${borderRadiusTiny};
  border: 0.5px solid ${greyColor};
  background: ${lightGreyColor};
  padding: 12px;
`;
const InputField = styled(TextField)`
  background: white;
  div {
    height: 39px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const DealProbability = ({
  data,
  isForm,
  handleForm,
}: {
  isForm: boolean;
  data: Record<string, any>;
  handleForm: (arg1: any, arg2: boolean) => void;
}) => {
  const [isInput, setIsinput] = useState(false);
  const { refetch, dealId } = useQueryContext();

  const [handleDealupdate] = useMutation(UPDATE_DEAL, { onCompleted: refetch });

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: { probability: data?.getDealById?.probability || "" },
    validationSchema: probabilitySchema,
    enableReinitialize: true,
    onSubmit: async () => {
      const { data: updateData } = await handleDealupdate({
        variables: {
          input: { probability: values?.probability?.toString(), id: dealId },
        },
      });
      if (updateData?.updateDeal) {
        successToast("Probability updated successfully");
        setIsinput(false);
      }
    },
  });

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === keyType.ENTER_KEY) {
      handleSubmit();
    }
  };

  const isProbability = data?.getDealById?.probability;
  const probabilityForm = () => {
    handleForm("probability", true);
    setIsinput(true);
  };
  const probability = !isProbability
    ? "To Complete"
    : `${data?.getDealById?.probability}%`;
  return (
    <>
      <Boxeswidthone>
        <BoxeswidthoneText>Probability</BoxeswidthoneText>
        <Wrapper>
          {" "}
          {!isInput || !isForm ? (
            <ProbabilityText color={isProbability} onClick={probabilityForm}>
              {probability}
            </ProbabilityText>
          ) : (
            <>
              <InputField
                onKeyDown={handleKeyDown}
                onKeyPress={(e) => {
                  handleKeyPress(e, values);
                }}
                type="number"
                placeholder={""}
                onChange={handleChange}
                name="probability"
                inputProps={{
                  step: "0.01",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                value={values.probability}
              />
              <br />
              <ErrorMessage>{errors.probability as string}</ErrorMessage>
            </>
          )}
        </Wrapper>
      </Boxeswidthone>
    </>
  );
};
export default DealProbability;
