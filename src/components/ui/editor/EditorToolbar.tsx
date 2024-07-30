import {
  typographySubtitle2Bold,
  typographySubtitle2Normal,
} from "@/styles/typography";
import {
  buttonCursor,
  darkblueColor,
  fontFamily,
  greyColor,
  guttersPx,
} from "@/styles/variables";
import { CopyLink, Emoji, Italic } from "@/utils/formUtils/InputSvg/InputSvg";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import EmojiPickerComponent from "../input/EmojiPickerComponent";
import AutoComplete from "../input/AutoComplete";
import InputBox from "../input/InputBox";
import { useFormik } from "formik";

export const formats = ["bold", "italic", "link"];

interface EditorToolBarProps {
  setValue: (arg1: string) => void;
  handleBoldClick: () => void;
  handleItalicClick: () => void;
  isBold: boolean;
  isItalic: boolean;
  isEmpty: boolean;
  hideLink: boolean;
  handleAddLink: (arg: string) => void;
}

const EditorToolBar = ({
  setValue,
  handleBoldClick,
  handleItalicClick,
  isBold,
  isItalic,
  hideLink,
  isEmpty,
  handleAddLink,
}: EditorToolBarProps) => {
  const [isHash, setIsHash] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const handlePickerClick = () => {
    setIsPickerOpen(true);
  };
  const handlePickerClose = () => {
    setIsPickerOpen(false);
  };
  const setLinkOpen = () => {
    if (!isEmpty) {
      setIsLink(true);
    }
  };
  const getItalicColor = !isItalic ? darkblueColor : greyColor;
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      link: "",
    },
    onSubmit: async () => {
      handleAddLink(values.link);
      setIsLink(false);
    },
  });
  return (
    <div id="toolbar">
      <FormateWrapper className="ql-formats">
        <Flex>
          <RightContentWrapper>
            <HastagFlex
              onClick={() => {
                setIsHash(!isHash);
              }}
            >
              <Hastag>#Hashtags</Hastag>
            </HastagFlex>
            {!hideLink && (
              <Tooltip title="Add a link" arrow>
                <LinkWrapper>
                  <CopyLink onclick={setLinkOpen} width="26" height="24" />
                  {isLink && !isEmpty && (
                    <FormWrapper onSubmit={handleSubmit}>
                      <InputWrapper>
                        <InputBox
                          type="text"
                          placeholder={"Link"}
                          name="link"
                          onChange={handleChange}
                          fullborder
                          value={values.link}
                          autocomplete={""}
                          error={errors.link}
                        />
                      </InputWrapper>
                      <SaveButton>Save</SaveButton>
                    </FormWrapper>
                  )}
                </LinkWrapper>
              </Tooltip>
            )}
          </RightContentWrapper>
          <IconflexContainer>
            <SpanIconBox isActive={!isBold} onClick={handleBoldClick}>
              B
            </SpanIconBox>
            <SpanIconBox isActive={!isItalic} onClick={handleItalicClick}>
              <Italic color={getItalicColor} />
            </SpanIconBox>
            <SpanIconBox onClick={handlePickerClick}>
              <Emoji />
            </SpanIconBox>

            <EmojiPickerComponent
              open={isPickerOpen}
              onClose={handlePickerClose}
              setValue={setValue}
            />
          </IconflexContainer>
        </Flex>
      </FormateWrapper>
      {isHash && (
        <SearchWrapper>
          <AutoComplete isClose={setIsHash} setValue={setValue} />
        </SearchWrapper>
      )}
    </div>
  );
};

export default EditorToolBar;

const FormateWrapper = styled.span`
  display: block;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledHastag = `
  padding: 4px;
  width: fit-content;
  border-radius: 5px;
  border: 1px solid ${greyColor};
  color: ${greyColor};
  text-align: center;
  font-family: ${fontFamily};
  ${typographySubtitle2Normal}
`;
const HastagFlex = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.mediumHalf};
  cursor: pointer;
`;
const RightContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.smallHalf};
  svg {
    cursor: pointer;
  }
  position: relative;
`;
const Hastag = styled.div`
  ${StyledHastag}
  word-break:break-all
`;

const IconflexContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: ${guttersPx.smallHalf};
`;

const SpanIconBox = styled.div<{
  isActive?: boolean;
  fontstyle?: string;
}>(
  ({ isActive = false, fontstyle = "normal" }) => css`
    width: ${guttersPx.extraLarge};
    height: ${guttersPx.extraLarge};
    border-radius: 5px;
    border: 1px solid ${isActive ? darkblueColor : greyColor};
    color: ${isActive ? darkblueColor : greyColor};
    font-family: ${fontFamily};
    font-style: ${fontstyle};
    ${typographySubtitle2Bold};
    cursor: ${buttonCursor};
    display: grid;
    place-content: center;
  `,
);

const SearchWrapper = styled.div`
  z-index: 9999;
  position: relative;
  margin-top: 15px;
  margin-bottom: -150px;
`;
const LinkWrapper = styled.div`
  position: relative;
`;
const FormWrapper = styled.form`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  top: -5px;
  left: 34px;
`;
const InputWrapper = styled.div`
  span {
    width: 100%;
    display: block;
    min-width: 200px;
  }
  input {
    max-height: 35px;
  }
`;

const SaveButton = styled.button`
background:${darkblueColor} !important;
width: 100% !important;
height: 100% !important;
padding: 10px !important;
display: grid !important;
place-content: center !important;
color: white !important;
}
`;
