import { mqMax } from "@/styles/base";
import {
  darkblueColor,
  darkCharcoalColor,
  lightGreyColor,
} from "@/styles/variables";
import { getLastIndex } from "@/utils/helperUtils";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../input/InputBox";

interface CheckedProps {
  handleChecked?(): void;
  name: string;
  error?: string;
  setFieldValue?: any;
  data?: string;
  width?: string | number;
}
interface StateProps {
  [x: string]: any;
  [index: number]: string;
  length: number;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  & span {
    padding: 0;
  }
`;
const Label = styled.div<{
  index: number;
  last: number;
  color: string;
  width?: string | number;
}>(
  ({ index, last, color, width = "65" }) => css`
    display: flex;
    width: 100%;
    width: ${width}px;
    height: 33px;
    position: relative;
    align-items: center;
    cursor: pointer;
    background-color: ${color || lightGreyColor};
    color: ${darkCharcoalColor};
    ${chekIndex(index, last, color)}
  `,
);

const DealCheckBox = ({
  name,
  error,
  setFieldValue,
  width,
  data,
}: CheckedProps) => {
  const lastIndex = getLastIndex(Object.entries(stagefields));
  const [state, setState] = useState<StateProps>([]);

  const getDefaultFun = () => {
    const dataValue: any = data === "Leads" ? "Lead" : data;
    const stageFieldsValues = Object.values(stagefields);
    const index = stageFieldsValues.findIndex(
      (field: any) => field.value === dataValue,
    );
    const defaultState = stageFieldsValues
      .slice(0, index + 1)
      .map((field) => field.value);
    setState(defaultState);
  };

  useEffect(() => {
    if (data) {
      getDefaultFun();
    }
  }, [data]);

  const handleChange = (
    _e: React.ChangeEvent<HTMLInputElement>,
    number: number,
  ) => {
    let arr = [];
    for (let index = 0; index <= number; index++) {
      const element = stagefields[index];
      arr.push(element.value);
    }
    setFieldValue(name, arr);
    setState([...arr]);
  };

  return (
    <div>
      <Wrapper>
        {stagefields.map((item, index) => {
          return (
            <Checkbox
              key={index}
              name={name}
              checked={state.includes(item.value)}
              onChange={(e) => {
                handleChange(e, index);
              }}
              value={item.value}
              icon={
                <Label
                  color={lightGreyColor}
                  index={index}
                  last={lastIndex}
                  width={width}
                ></Label>
              }
              checkedIcon={
                <Label
                  color={darkblueColor}
                  index={index}
                  last={lastIndex}
                ></Label>
              }
            />
          );
        })}
      </Wrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default DealCheckBox;

const stagefields = [
  {
    label: "Lead",
    value: "Lead",
  },
  {
    label: "Contact Made",
    value: "Contact Made",
  },
  {
    label: "Demo Scheduled",
    value: "Demo Scheduled",
  },
  {
    label: "Proposal Made",
    value: "Proposal Made",
  },
  {
    label: "Negotiations Started",
    value: "Negotiations Started",
  },
];
const chekIndex = (fIndex: number, lIndex: number, color: string) => {
  let style: string = "";
  if (fIndex !== lIndex) {
    style += `&::before {
        content: "";
        position: absolute;
        right: -9px;
        ${mqMax.desktop}{
        right: -8px;
        };
        bottom: 0;
        width: 0;
        top:0;
        height: 0;
        border-left: 11px solid ${color ?? lightGreyColor};
        border-top: 16px solid transparent;
        border-bottom: 16px solid transparent;;
      }`;
  }
  if (fIndex !== 0) {
    style += `&::after {
      content: "";
      position: absolute;
      top:0;
      left: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-left: 6px solid white;
      border-top: 16px solid transparent;
      border-bottom: 16px solid transparent;
  `;
  }
  return style;
};
