import { NewDealFormInitialProps } from "@/types/global";
import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { ErrorMessage } from "./InputBox";

const Input = styled.input`
  display: none;
`;

const Labels = styled.label`
  display: inline-block;
  cursor: pointer;
  text-align: center;
`;

export const FileUpload = ({
  setFieldValue,
  error,
}: {
  setFieldValue(field: keyof NewDealFormInitialProps, value: any): void;
  error: string;
}) => {
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFieldValue("leadImage", file);
    };
    reader.readAsDataURL(file);
    setFieldValue("leadImage", file);
    setImage(URL.createObjectURL(file));
  };
  const [image, setImage] = useState<string | null>(null);
  return (
    <div>
      <Labels htmlFor="image-upload">
        <span role="img" aria-label="Upload an image">
          <Avatar
            src={image ?? "/assets/icons/upload.svg"}
            alt="image"
            sx={{ width: 70, height: 70 }}
          />
        </span>{" "}
      </Labels>
      <Input
        type="file"
        id="image-upload"
        name="leadImage"
        onChange={handleImageChange}
      />
      {error && (
        <>
          <br />
          <ErrorMessage style={{ padding: 0 }}>{error}</ErrorMessage>
        </>
      )}
    </div>
  );
};
