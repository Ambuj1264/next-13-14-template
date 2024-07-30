import { DownArrowIcon, UpArrowIcon } from "@/layouts/form/SelectBox";
import { StyledSelect } from "@/styles/base";
import {
  darkblueColor,
  fontFamily,
  greyColor,
  whiteColor,
} from "@/styles/variables";
import { WorkOption } from "@/types/global";
import styled from "@emotion/styled";
import { SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { SvgIconProps } from "@mui/material/SvgIcon";
import React from "react";
interface UseFormikHandleChange {
  (event: SelectChangeEvent<unknown>): void;
}
interface SelectProps {
  id?: string;
  label?: string;
  name: string;
  options: WorkOption[];
  value: string;
  width?: string;
  onChange: UseFormikHandleChange;
  sx?: any;
}

const IconWrapper = styled.div`
  div {
    top: 20%;
    right: 5%;
    translate: (-5%, -20%);
  }
`;

const SelectBox = ({
  id,
  label,
  name,
  options,
  value,
  onChange,
  width,
  sx,
}: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const renderIconComponent = (iconProps: SvgIconProps) => {
    const color = greyColor;
    return isOpen ? (
      <IconWrapper>
        <UpArrowIcon color={color} {...iconProps} />
      </IconWrapper>
    ) : (
      <IconWrapper>
        <DownArrowIcon color={color} {...iconProps} />
      </IconWrapper>
    );
  };
  return (
    <FormControl sx={{ width: width ? width : "100%" }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <StyledSelect
        labelId={`${id}-label`}
        id={id}
        IconComponent={renderIconComponent}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        value={value || ""}
        name={name}
        onChange={onChange}
        sx={sx ? sx : { mb: 1, fontFamily: fontFamily }}
        inputProps={{
          MenuProps: {
            sx: {
              "&& .Mui-selected": {
                backgroundColor: darkblueColor,
                color: whiteColor,
                fontFamily: fontFamily,
                m: 1,
                "&:hover": {
                  backgroundColor: darkblueColor,
                },
              },
            },
            MenuListProps: {
              sx: { ...menuStyle },
            },
          },
        }}
      >
        {options.map((option: any) => (
          <MenuItem
            sx={sx ? sx : { mb: 1, fontFamily: "Montserrat" }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default SelectBox;

const menuStyle = {
  background: whiteColor,
  borderRadius: " 2px",
  border: `1px solid ${greyColor}`,
};
