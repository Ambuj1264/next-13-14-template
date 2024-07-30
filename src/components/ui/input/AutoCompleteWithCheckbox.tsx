import * as React from "react";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import { DeleteChipicon } from "@/utils/formUtils/InputSvg/InputSvg";
import Autocomplete from "@mui/material/Autocomplete";

import {
  darkCharcoalColor,
  shelduckBlueColor,
  blackColor,
  guttersPx,
} from "@/styles/variables";
import ListCheckbox from "./ListCheckbox";
import TextField from "@mui/material/TextField";
import { scrollStyle } from "@/styles/base";
import Chip from "@mui/material/Chip";
import {
  typographyParagraph,
  typographySubtitle2Normal,
} from "@/styles/typography";
import { css } from "@emotion/react";
import { TeamMember } from "@/types/global";
import { ErrorMessage } from "./InputBox";

const Label = styled.div`
  color: ${darkCharcoalColor};
  ${typographyParagraph};
  margin: ${guttersPx.mediumHalf} 0;
`;

interface User {
  title: string;
  icon: string;
}

export default function AutoCompleteWithCheckbox({
  label,
  placeholder,
  setFieldValue,
  listItem = [],
  name,
  error,
}: {
  label: string;
  placeholder: string;
  listItem: TeamMember[];
  setFieldValue: (arg1: string, arg2: any) => void;
  name: string;
  error?: never[];
}) {
  const [value, setValue] = React.useState<User[]>([]);
  const handleChange = (_event: any, value2: React.SetStateAction<User[]>) => {
    setValue(value2);
    setFieldValue(name, value2);
  };
  const handleClear = (title: string) => {
    const filterValue = value?.filter(
      (entry: { title: string }) => entry.title !== title,
    );
    setValue(filterValue);
    setFieldValue(name, filterValue);
  };
  return (
    <>
      <Label>{label}</Label>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={listItem}
        value={value}
        disableCloseOnSelect
        onChange={handleChange as any}
        componentsProps={{
          paper: {
            sx: {
              width: 300,
              scrollStyle,
            },
          },
        }}
        sx={textBoxStyle}
        ListboxProps={{
          className: "myCustomList",
        }}
        isOptionEqualToValue={(option, valueobj) =>
          option.title === valueobj.title
        }
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => (
          <ListCheckbox
            sx={listboxStyle}
            data={option}
            checkedValue={selected}
            {...props}
          />
        )}
        renderTags={(_value, getTagProps) => {
          return (
            <div>
              {value.map((option, index) => {
                return (
                  <StyledChip
                    bgcolor={shelduckBlueColor}
                    size="small"
                    avatar={<Avatar alt={option.title} src={option.icon} />}
                    variant="outlined"
                    label={option?.title}
                    {...getTagProps({ index })}
                    key={index}
                    deleteIcon={<DeleteChipicon component={"symbol"} />}
                    onDelete={() => {
                      handleClear(option.title);
                    }}
                  />
                );
              })}
            </div>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

const textBoxStyle = {
  ".MuiOutlinedInput-root": {
    padding: "1px 9px",
    borderRadius: 0,
  },
  ".MuiAutocomplete-input::placeholder": {
    opacity: 1,
  },
};
const StyledChip = styled(Chip)<{
  bgcolor: string;
}>(
  ({ bgcolor }) => css`
    color: ${blackColor};
    background-color: ${bgcolor};
    border: none;
    padding: 15px 5px;
    ${typographySubtitle2Normal};
  `,
);

const listboxStyle = {
  maxWidth: "267px",
  maxHeight: "189px",
  overflow: "auto",
};
