import React from "react";
import { useField } from "formik";
import { FormControl, MenuItem, Select, SvgIconProps } from "@mui/material";
import styled from "@emotion/styled";
import {
  darkCharcoalColor,
  fontFamily,
  fontWeightNormal,
  greyColor,
  gutters,
} from "@/styles/variables";
import { ErrorMessage } from "@/shared/UserMenu/SharedUserMenuComponents";

const SelectWrapper = styled(FormControl)`
  margin-bottom: ${gutters.small}px;
`;

const StyledSelect = styled(Select)`
  color: ${(props) => (props.value ? darkCharcoalColor : greyColor)};
  font-family: ${fontFamily};
  font-weight: ${fontWeightNormal};
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 21px;
  top: 18px;
`;

interface ArrowIconProps {
  color: string;
}

export const DownArrowIcon: React.FC<ArrowIconProps> = ({ color }) => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
    >
      <path
        d="M13 1L7 7L1 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const UpArrowIcon: React.FC<ArrowIconProps> = ({ color }) => (
  <IconWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
    >
      <path
        d="M1 7L7 1L13 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

interface FormField {
  name: string;
  label: string;
  data: {
    value: string;
    label: string;
  }[];
  full?: boolean;
}

function SelectField(props: FormField) {
  const { label, data } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [isOpen, setIsOpen] = React.useState(false);
  const renderIconComponent = (iconProps: SvgIconProps) => {
    const color = selectedValue ? darkCharcoalColor : greyColor;

    return isOpen ? (
      <UpArrowIcon color={color} {...iconProps} />
    ) : (
      <DownArrowIcon color={color} {...iconProps} />
    );
  };
  return (
    <SelectWrapper fullWidth>
      <StyledSelect
        inputProps={{ "aria-label": "Without label" }}
        displayEmpty
        IconComponent={renderIconComponent}
        {...field}
        value={selectedValue ? selectedValue : ""}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem disabled value="">
          {label}
        </MenuItem>
        {data.map(
          (
            item: {
              value: string | number | readonly string[] | undefined;
              label:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | React.PromiseLikeOfReactNode
                | null
                | undefined;
            },
            index: React.Key | null | undefined,
          ) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ),
        )}
      </StyledSelect>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </SelectWrapper>
  );
}

export default SelectField;
