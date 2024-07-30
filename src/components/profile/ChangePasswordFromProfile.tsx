import React from "react";
import styled from "@emotion/styled";
import Modal from "../ui/modal/Modal";
import Label from "../ui/input/Label";
import Button from "@/components/ui/button/Button";
import InputBox from "../ui/input/InputBox";
import {
  fontSizeBody1,
  fullWidth,
  buttonCursor,
  fontWeightNormal,
} from "@/styles/variables";
import { useMutation } from "@apollo/client";
import { errorToast, successToast } from "@/styles/toaster";
import { PROFILE_UPDATE } from "@/lib/graphql/mutation/profileUpdate";
import { useFormik } from "formik";
import { passwordValidationSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { useAuth } from "@/context/auth/authContext";

const FormContainer = styled.form`
  padding: 20px;
  width: ${fullWidth};
  min-width: 514px;
`;
const Cross = styled.div`
  text-align: end;
  cursor: ${buttonCursor};
`;
const BreakLine = styled.div``;

const StyledBtn = styled(Button)<{ float?: string }>`
  display: flex;
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightNormal};
  justify-content: center;
  align-items: center;
`;

const ChangePasswordFromProfile = ({
  openModal,
  handleCloser,
  setOpenModal,
}: {
  openModal: boolean;
  handleCloser: any;
  setOpenModal: any;
}) => {
  const [load, setLoad] = React.useState(false);

  const [loginUpdate] = useMutation(PROFILE_UPDATE);
  const { authenticateUser } = useAuth();

  const handleCrossClick = () => {
    resetForm();
    handleCloser();
  };

  const { values, errors, handleChange, handleSubmit, setValues, resetForm } =
    useFormik({
      initialValues: { oldPassword: "", password: "", newpassword: "" },
      validationSchema: passwordValidationSchema,
      onSubmit: async () => {
        try {
          setLoad(true);
          const { data, errors: responseErr } = await loginUpdate({
            variables: {
              input: {
                oldPassword: values.oldPassword,
                password: values.password,
              },
            },
          });
          if (data && !responseErr) {
            successToast("Data updated successfully");
            setValues({ oldPassword: "", password: "", newpassword: "" });
            authenticateUser(data?.loginUpdate?.token);
            setOpenModal(false);
          }
        } catch (error: any) {
          errorToast(error?.message);
        } finally {
          setLoad(false);
        }
      },
    });
  const buttonLoad = load ? "loading..." : "Save changes";

  return (
    <Modal
      open={openModal}
      width="711px"
      closeModal={handleCrossClick}
      maxWidth="xl"
    >
      <FormContainer onSubmit={handleSubmit}>
        <Cross onClick={handleCrossClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M20.3604 17.954C20.5805 18.1654 20.7042 18.452 20.7042 18.7509C20.7042 19.0498 20.5805 19.3364 20.3604 19.5478C20.1402 19.7591 19.8416 19.8779 19.5303 19.8779C19.219 19.8779 18.9204 19.7591 18.7002 19.5478L12.5 13.5937L6.29787 19.5459C6.07772 19.7573 5.77913 19.876 5.46779 19.876C5.15645 19.876 4.85786 19.7573 4.63771 19.5459C4.41756 19.3346 4.29388 19.0479 4.29388 18.749C4.29388 18.4502 4.41756 18.1635 4.63771 17.9522L10.8399 12L4.63967 6.04592C4.41952 5.83457 4.29584 5.54793 4.29584 5.24904C4.29584 4.95016 4.41952 4.66351 4.63967 4.45217C4.85982 4.24082 5.15841 4.12209 5.46974 4.12209C5.78108 4.12209 6.07967 4.24082 6.29982 4.45217L12.5 10.4062L18.7022 4.45123C18.9223 4.23989 19.2209 4.12115 19.5322 4.12115C19.8436 4.12115 20.1422 4.23989 20.3623 4.45123C20.5825 4.66258 20.7062 4.94922 20.7062 5.24811C20.7062 5.54699 20.5825 5.83364 20.3623 6.04498L14.1602 12L20.3604 17.954Z"
              fill="#878787"
            />
          </svg>
        </Cross>
        <Label labelText="Current password" />
        <BreakLine></BreakLine>

        <InputBox
          type={"password"}
          placeholder={""}
          name={"oldPassword"}
          value={values.oldPassword}
          onChange={handleChange}
          autocomplete={"off"}
          error={errors.oldPassword}
          fullborder
        />

        <Label labelText="New password" />
        <BreakLine></BreakLine>

        <InputBox
          type={"password"}
          placeholder={""}
          name={"password"}
          value={values.password}
          onChange={handleChange}
          autocomplete={"off"}
          error={errors.password}
          fullborder
        />

        <Label labelText="Repeat new password" />
        <BreakLine></BreakLine>

        <InputBox
          type={"password"}
          placeholder={""}
          name={"newpassword"}
          value={values.newpassword}
          onChange={handleChange}
          autocomplete={"off"}
          error={errors.newpassword}
          fullborder
        />
        <StyledBtn type="submit">{buttonLoad}</StyledBtn>
      </FormContainer>
    </Modal>
  );
};

export default ChangePasswordFromProfile;
