import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  fontWeightBold,
  fontSizeBody1,
  borderRadiusSmall,
  buttonCursor,
  darkCharcoalColor,
  fontFamily,
} from "@/styles/variables";
import Image from "next/image";
import { AvatarInitials } from "../ui/avatar/Avatar";
import { ErrorMessage } from "../ui/input/InputBox";
import { FormikErrors } from "formik";

const Uploadbutton = styled.label`
  margin-left: 10px;
  display: inline-block;
  padding: 10px 20px;
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightBold};
  color: ${fontWeightBold};
  background-color: ${fontWeightBold};
  border: 1px solid rgba(135, 135, 135, 0.5);
  border-radius: ${borderRadiusSmall};
  cursor: ${buttonCursor};
  color: ${darkCharcoalColor};
  font-family: ${fontFamily};
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileUpload = ({
  profilePicture,
  fullName,
  setFieldValue,
  error,
}: {
  profilePicture: string | null;
  fullName: string;
  setFieldValue(field: any, value: any): void;
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
}) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setImage(profilePicture);
  }, [profilePicture]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFieldValue("profilePicture", file);
    }
  };

  return (
    <>
      {image ? (
        <Image
          src={image}
          alt="Uploaded"
          width={64}
          height={64}
          layout="fixed"
          objectFit="cover"
        />
      ) : (
        <AvatarInitials
          w={"64px"}
          h={"64px"}
          name={fullName}
          textSize={"20px"}
        />
      )}
      <Uploadbutton>
        Upload Image
        <HiddenFileInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Uploadbutton>
      {error && typeof error === "string" && (
        <>
          <br />
          <ErrorMessage style={{ padding: 0 }}>{error}</ErrorMessage>
        </>
      )}
    </>
  );
};

export default ProfileUpload;
