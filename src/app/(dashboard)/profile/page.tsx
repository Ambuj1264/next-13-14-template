"use client";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Label from "@/components/ui/input/Label";
import InputBox from "@/components/ui/input/InputBox";
import Button from "@/components/ui/button/Button";
import ProfileUpload from "@/components/profile/ProfileUpload";
import {
  fontFamily,
  fontSizeBody1,
  fontWeightNormal,
  whiteColor,
  greyColor,
  fullWidth,
  buttonCursor,
  fullHeight,
  lightGreyColor,
  darkCharcoalColor,
  fontSizeH2,
  fontWeightBold,
  fontSizeH5,
  borderRadiusTiny,
} from "@/styles/variables";
import { useFormik } from "formik";
import { getProfileAddSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { useQueryContext } from "@/context/query/queryContext";
import { useMutation } from "@apollo/client";
import { errorToast, successToast } from "@/styles/toaster";
import { PROFILE_UPDATE } from "@/lib/graphql/mutation/profileUpdate";
import ChangePasswordFromProfile from "@/components/profile/ChangePasswordFromProfile";
import { s3UploadMethod } from "@/utils/awsFileUploder";
import { useAuth } from "@/context/auth/authContext";
const BreakLine = styled.div``;
const StyledBtn = styled(Button)<{ float?: string }>`
  display: flex;
  font-size: ${fontSizeBody1};
  justify-content: center;
  align-items: center;
  float: ${(props) => (props.float ? props.float : "")};
`;
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${fullHeight};
  background: ${lightGreyColor};
  width: ${fullWidth};
  padding: 20px 60px;
`;
const SubContainer = styled.div``;
const ProfileHeading = styled.div`
  color: ${darkCharcoalColor};
  font-family: ${fontFamily};
  font-size: ${fontSizeH2};
  font-style: normal;
  font-weight: ${fontWeightBold};
  line-height: normal;
`;
const ProfilePara = styled.p`
  color: ${darkCharcoalColor};
  font-family: ${fontFamily};
  font-size: 24px;
  font-style: normal;
  font-weight: ${fontWeightNormal};
  line-height: normal;
  padding-top: 25px;
  padding-bottom: 35px;
`;
const WhiteBox = styled.div`
  height: 558px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid ${greyColor};
  background: ${whiteColor};
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
`;
const WhiteBoxSubContainer = styled.div`
  text-align: start;
  padding: 10px;
  border-bottom: 1px solid ${greyColor};
`;
const UserText = styled.div`
  color: ${darkCharcoalColor};
  font-family: ${fontFamily};
  font-size: ${fontSizeH5};
  font-style: normal;
  font-weight: ${fontWeightNormal};
  line-height: normal;
`;
const FlexBox = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  flex-direction: row;
  padding: 0 80px;
  gap: 0px 20px;
  align-items: end;
`;
const FlexBoxDiv = styled.div`
  width: 40%;
  margin: 10px;
`;
const Para = styled.p`
  color: ${greyColor};
  font-family: ${fontFamily};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const ProfileUploadFlex = styled.div`
  padding-left: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const FormContainerDIV = styled.div`
  padding-top: 3rem;
`;
const Uploadbutton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  font-size: ${fontSizeBody1};
  font-weight: bold;
  color: ${whiteColor};
  background-color: ${whiteColor};
  border: none;
  border-radius: ${borderRadiusTiny};
  cursor: ${buttonCursor};
  border: 1px solid rgba(135, 135, 135, 0.5);
  color: ${darkCharcoalColor};
`;

interface User {
  fullName: string;
  mobileNumber: string;
  profilePicture: string;
}
const Page = () => {
  const { profiledata, loader, profileRefecth } = useQueryContext();
  const [load, setLoad] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [hasInteractedWithUpload, setHasInteractedWithUpload] =
    React.useState(false);
  const [loginUpdate] = useMutation(PROFILE_UPDATE, {
    onCompleted: profileRefecth,
  });
  const { authenticateUser } = useAuth();
  useEffect(() => {
    profileRefecth();
  }, [profileRefecth]);
  const { fullName, mobileNumber, email, profilePicture } =
    profiledata?.getUserDetailsById || {};
  const validationSchema = getProfileAddSchema(hasInteractedWithUpload);
  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        fullName: fullName,
        mobileNumber: mobileNumber,
        profilePicture: profilePicture,
      },
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async () => {
        const folderName = `profilePicture/${email}`;
        if (
          values.profilePicture &&
          typeof values.profilePicture !== "string"
        ) {
          const location: any = await s3UploadMethod(
            [values.profilePicture],
            folderName,
          );
          if (!location) {
            errorToast("Something went wrong");
            return;
          }
          values["profilePicture"] = location[0];
        }
        try {
          setLoad(true);
          const arr: User = values;
          const keys: (keyof User)[] = Object.keys(values) as (keyof User)[];
          keys.forEach((key) => {
            if (values[key] === null) {
              delete values[key];
            }
          });
          const { data, errors: responseErr } = await loginUpdate({
            variables: {
              input: arr,
            },
          });
          if (data && !responseErr) {
            successToast("Data updated successfully");
            authenticateUser(data?.loginUpdate?.token);
          }
        } catch (error: any) {
          errorToast(error?.message);
        } finally {
          setLoad(false);
        }
      },
    });
  const buttonLoad = load ? "loading..." : "Save changes";
  const handleOpener = () => {
    setOpenModal(true);
  };
  const handleCloser = () => {
    setOpenModal(false);
  };

  return (
    <CenteredContainer>
      {loader ? (
        "loading data..."
      ) : (
        <SubContainer>
          <ProfileHeading>Hello, {fullName}!</ProfileHeading>
          <ProfilePara>Your email profile is : {email}</ProfilePara>
          <WhiteBox>
            <WhiteBoxSubContainer>
              <UserText>User</UserText>
            </WhiteBoxSubContainer>
            <FormContainerDIV>
              <ProfileUploadFlex>
                <ProfileUpload
                  profilePicture={profilePicture}
                  fullName={fullName}
                  setFieldValue={(field, value) => {
                    if (field === "profilePicture") {
                      setHasInteractedWithUpload(true);
                    }
                    setFieldValue(field, value);
                  }}
                  error={errors.profilePicture}
                />
              </ProfileUploadFlex>
              <FlexBox onSubmit={handleSubmit}>
                <FlexBoxDiv>
                  <Label labelText="Name" />
                  <BreakLine></BreakLine>
                  <InputBox
                    type={"text"}
                    placeholder={""}
                    name={"fullName"}
                    value={values.fullName}
                    onChange={handleChange}
                    autocomplete={"off"}
                    error={errors.fullName || ""}
                    fullborder
                  />
                </FlexBoxDiv>
                <FlexBoxDiv>
                  <Label labelText="Phone" />
                  <BreakLine></BreakLine>
                  <InputBox
                    type={"text"}
                    placeholder={""}
                    name={"mobileNumber"}
                    value={values.mobileNumber}
                    onChange={handleChange}
                    autocomplete={"off"}
                    error={errors.mobileNumber || ""}
                    fullborder
                  />
                </FlexBoxDiv>
                <FlexBoxDiv>
                  <Label labelText="Plan" />
                  <BreakLine></BreakLine>
                  <InputBox
                    type={"text"}
                    placeholder={""}
                    name={"NA"}
                    value={"NA"}
                    disabled={true}
                    autocomplete={"off"}
                    error={""}
                    fullborder
                  />
                  <Para>Do you want update the plan to professional?</Para>
                </FlexBoxDiv>
                <FlexBoxDiv></FlexBoxDiv>
                <FlexBoxDiv>
                  <Label labelText="Password" />
                  <BreakLine></BreakLine>
                  <Uploadbutton onClick={handleOpener}>
                    Change password
                  </Uploadbutton>
                </FlexBoxDiv>
                <FlexBoxDiv>
                  <StyledBtn type="submit" float="right">
                    {buttonLoad}
                  </StyledBtn>
                </FlexBoxDiv>
              </FlexBox>
            </FormContainerDIV>
          </WhiteBox>
        </SubContainer>
      )}
      <ChangePasswordFromProfile
        openModal={openModal}
        handleCloser={handleCloser}
        setOpenModal={setOpenModal}
      />
    </CenteredContainer>
  );
};
export default Page;
