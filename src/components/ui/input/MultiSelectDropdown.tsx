import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import { darkCharcoalColor, guttersPx, whiteColor } from "@/styles/variables";

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  &.muiautocomplete-listbox: {
    max-height: ${guttersPx.medium};
    overflow-y: auto;
  }
`;

const MultiSelectDropdown = ({
  options,
  setFieldValue,
  name,
}: {
  options: any;
  setFieldValue: any;
  name: string;
}) => {
  const handleChange = (
    _e: React.SyntheticEvent<Element, Event>,
    value: any,
  ) => {
    setFieldValue(name, value);
  };
  const filterList = (option: unknown, value: unknown): boolean => {
    if (
      typeof option === "object" &&
      typeof value === "object" &&
      option !== null &&
      value !== null
    ) {
      const optionLabel = (option as { label?: string }).label;
      const valueLabel = (value as { label?: string }).label;
      return optionLabel === valueLabel;
    }
    return false;
  };
  return (
    <div>
      <StyledAutocomplete
        multiple
        id="tags-outlined"
        options={options || []}
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
          },
        }}
        onChange={(event, values) => {
          handleChange(event, values);
        }}
        getOptionLabel={(option: any) => option?.label}
        filterSelectedOptions
        isOptionEqualToValue={filterList}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default MultiSelectDropdown;
