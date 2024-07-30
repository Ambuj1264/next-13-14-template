import SmallButton from "@/components/ui/button/SmallButton";
import InputBox from "@/components/ui/input/InputBox";
import { typographySubtitle2Normal } from "@/styles/typography";
import {
  darkblueColor,
  darkCharcoalColor,
  greyColor,
  whiteColor,
} from "@/styles/variables";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import React from "react";
import { SubHeading } from "./AddMemberSocial";

interface LinkedInCard {
  inputIcon: any;
  id: number;
  title: string;
  icon: any;
  placeholder: string;
}

interface MemeberFormProps {
  selectedItem: LinkedInCard;
  formSubmit: () => void;
  onCancel: () => void;
}

const MemberForm = ({
  selectedItem,
  formSubmit,
  onCancel,
}: MemeberFormProps) => {
  console.log(selectedItem, "{{");
  const { values, errors, handleChange } = useFormik({
    initialValues: { [selectedItem.title]: "" },
    onSubmit: () => {
      formSubmit();
    },
  });
  return (
    <>
      <SubHeading>{selectedItem.title}</SubHeading>
      <FormContainer>
        <InputWrapper>
          <InputBox
            type="text"
            placeholder={selectedItem.placeholder}
            name={selectedItem.title}
            value={values[selectedItem.title]}
            autocomplete="off"
            error={errors[selectedItem.title]}
            Icon={selectedItem.inputIcon}
            onChange={handleChange}
          />
        </InputWrapper>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
          <ADDButton type="button" onClick={formSubmit}>
            Add
          </ADDButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default MemberForm;

const FormContainer = styled.div``;

const Button = styled(SmallButton)`
  border-radius: 5px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`;

const ADDButton = styled(Button)`
  background: ${darkblueColor};
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: ${darkCharcoalColor};
  border: 1px solid ${darkCharcoalColor};
  &:hover {
    border: 1px solid ${darkblueColor};
    background: ${whiteColor};
    color: ${darkblueColor};
  }
`;
export const InputWrapper = styled.div<{ inputStyle?: any }>(
  ({ inputStyle = typographySubtitle2Normal }) => css`
    max-width: 430px;
    svg > path {
      fill: ${greyColor};
    }
    input::placeholder {
      color: ${greyColor} !important;
      ${inputStyle}
    }
  `,
);
