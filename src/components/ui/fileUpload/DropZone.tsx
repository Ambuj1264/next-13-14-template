import { typographyMedium } from "@/styles/typography";
import {
  buttonCursor,
  greyColor,
  guttersPx,
  lightGreyColor,
} from "@/styles/variables";
import { File } from "@/types/global";
import { AddIcon, CancelIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CustomTooltip from "../tooltip/CustomTooltip";

const minWidth = 50;
const maxWidth = 50;
const minHeight = 50;
const maxHeight = 100;

const UploadLabel = styled.label<{
  isSelected: boolean;
}>(
  ({ isSelected = false }) => css`
    height: 34px;
    border-radius: 5px;
    background: ${isSelected ? lightGreyColor : "transparent"};
    margin: ${guttersPx.mediumHalf} 0;
    display: grid;
    place-items: center;
    cursor: ${buttonCursor};
    color: ${greyColor};
    ${typographyMedium}
  `,
);
const FileInput = styled.input`
  display: none;
`;
const Wrapper = styled.div<{
  isSelected: boolean;
}>(
  ({ isSelected = false }) => css`
    display: ${isSelected ? "block" : "flex"};
    align-items: center;
    gap: ${guttersPx.medium};
    margin-top: ${guttersPx.mediumHalf};
  `,
);
const ImageContainer = styled.div`
  display: flex;
  gap: ${guttersPx.mediumHalf};
`;

const ImageWrapper = styled.div`
  min-width: ${minWidth}px;
  max-width: ${maxWidth}px;
  min-height: ${minHeight}px;
  max-height: ${maxHeight}px;
  padding: 2px;
  border: 1px solid ${lightGreyColor};
  position: relative;
`;
const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  border-radius: 50px;
  background: #d9d9d9;
  top: 0;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: none;
`;

export default function DropZone({ setValues }: { setValues?: any }) {
  const [files, setFiles] = useState<
    Array<{
      name: string;
      file: File;
    }>
  >([]);
  const onDrop = async (acceptedFiles: any[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("images", file);
      setFiles((prevImages) => [...prevImages, file]);
    });
  };

  useEffect(() => {
    if (setValues) {
      setValues("img", files);
    }
  }, [files]);

  const cancelImg = (name: string) => {
    console.log(files, "name: " + name);
    const filterFiles = files.filter((item) => item?.name !== name);
    setFiles(filterFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
    },
  });
  const thumbs = files?.map((file: any) => (
    <ImageWrapper key={file.name}>
      <StyledImage
        src={URL.createObjectURL(file)}
        alt="img"
        width={131}
        height={130}
      />
      <IconWrapper
        onClick={() => {
          cancelImg(file?.name);
        }}
      >
        <CancelIcon width={"10"} height={"10"} />
      </IconWrapper>
    </ImageWrapper>
  ));

  const isSelected = files.length === 0;
  return (
    <Wrapper isSelected={isSelected}>
      <ImageContainer>{thumbs}</ImageContainer>
      <UploadLabel
        isSelected={isSelected}
        {...getRootProps({ className: "dropzone" })}
        onClick={(e) => e.stopPropagation()}
      >
        <FileInput
          accept="image/png, image/gif, image/jpeg"
          {...getInputProps()}
        />
        {files.length === 0 ? (
          <p>Clicks or Drag and Drop media</p>
        ) : (
          <CustomTooltip title="Click or Drag and Drop media" placement="right">
            <AddIcon width={"41"} height={"41"} />
          </CustomTooltip>
        )}
      </UploadLabel>
    </Wrapper>
  );
}
