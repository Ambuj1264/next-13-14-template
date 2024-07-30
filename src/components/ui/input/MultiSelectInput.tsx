import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import styled from "@emotion/styled";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  whiteColor,
  darkCharcoalColor,
  darkblueColor,
  fontFamily,
  fontWeightSemibold,
  fontSizeBody1,
} from "@/styles/variables";
import { ErrorMessage } from "./InputBox";

const MultiSelectInput = ({
  name,
  Icon,
  error,
  setFieldValue,
  defaultValue,
}: {
  name: string;
  Icon?: any;
  error?: string;
  setFieldValue?: any;
  defaultValue?: any;
}) => {
  const [inputvalues, setInputValues] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const handleChange = (
    _e: React.SyntheticEvent<Element, Event>,
    value: any,
  ) => {
    const filterValue = value?.filter((item: string) => item.trim() !== "");
    setInputValues(filterValue);
    setFieldValue(name, filterValue);
  };

  return (
    <>
      <MultiTextWrapper variant="filled" size="small">
        <StyledAutoComplete
          multiple
          id="tags-filled"
          options={[]}
          disableClearable={true}
          defaultValue={defaultValue ? defaultValue : []}
          freeSolo
          sx={{
            display: "inline-block",
            width: "100%",
            color: darkCharcoalColor,
            backgroundColor: whiteColor,
            "& input": {
              height: "8px ",
              width: 100,
              border: 0,
              maxHeight: "39px",
              overflow: "auto",
              marginLeft: inputvalues?.length === 0 && Icon ? "25px" : 0,
            },
          }}
          renderTags={(value, getTagProps) => {
            return (
              <div
                style={{
                  maxHeight: "39px",
                  overflow: "auto",
                  marginLeft: Icon ? "25px" : 0,
                }}
              >
                {value.map((option: any, index) => {
                  const isEmpty = option?.trim() === "";
                  return (
                    !isEmpty && (
                      <Chip
                        size="small"
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    )
                  );
                })}
              </div>
            );
          }}
          onChange={(event, values) => {
            handleChange(event, values);
          }}
          renderInput={(params) => (
            <TextField
              onBlur={() => {
                setIsFocus(false);
              }}
              onFocus={() => {
                setIsFocus(true);
              }}
              className="input-icon"
              sx={textStyle}
              {...params}
            />
          )}
        />
        {Icon && (
          <StyledImage isFocus={isFocus}>
            {" "}
            <Icon />
          </StyledImage>
        )}
        <ErrorMessage>{error}</ErrorMessage>
      </MultiTextWrapper>
    </>
  );
};

export default MultiSelectInput;

const StyledImage = styled.span<{ isFocus: boolean }>`
  position: absolute;
  transform: translate(-25px, -50%);
  top: 54%;
  left: 35px;
  svg path {
    fill: ${(props) => (props.isFocus ? darkblueColor : "")};
  }
`;

const MultiTextWrapper = styled(FormControl)`
  display: block;
  position: relative;
  max-height: 39px;
  oveflow: scroll;
`;

const StyledAutoComplete = styled(Autocomplete)`
  & .MuiOutlinedInput-root {
    padding: 5px 5px 5px 10px;
    height: 39px;
    flex-wrap: nowrap;
    border: none;
    border-radius: 0;
  }
`;
const textStyle = {
  "& .MuiInputBase-input": {
    color: darkCharcoalColor,
    backgroundColor: whiteColor,
    fontFamily: fontFamily,
    fontSize: fontSizeBody1,
    fontWeight: fontWeightSemibold,
    border: "none",
  },
};
