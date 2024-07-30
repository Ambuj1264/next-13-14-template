import React, { ElementType, useState } from "react";
import { Field, useField } from "formik";
import styled from "@emotion/styled";
import {
  almondColor,
  darkCharcoalColor,
  greyColor,
  gutters,
  whiteColor,
} from "@/styles/variables";
import { ErrorMessage } from "@/shared/UserMenu/SharedUserMenuComponents";
import { css } from "@emotion/core";
import { typographyBody2 } from "@/styles/typography";
import Image from "next/image";

const ListWrapper = styled.div<{
  direction: string;
}>(
  ({ direction }) => css`
    display: flex;
    flex-direction: ${direction};
    padding: ${gutters.small}px 0;
  `,
);

const Label = styled.div<{
  selected: boolean;
  direction: boolean;
}>(
  ({ selected, direction }) => css`
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding: ${gutters.small}px;
    border: 1px solid ${greyColor};
    &:not(:last-child) {
      border-bottom: ${direction && "0px"};
      border-right: ${!direction && "0px"};
    }
    cursor: pointer;
    background-color: ${!selected ? whiteColor : almondColor};
    color: ${darkCharcoalColor};
  `,
);

const RadioButton = styled(Field)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: center;
  gap: ${gutters.small}px;
`;

const CardTitle = styled.h2(
  [typographyBody2],
  css`
    line-height: normal;
  `,
);

interface Feature {
  title: string;
  icon?: string;
}

interface ListSelectProps {
  data: Feature[];
  direction: string;
  name: string;
  label: string;
  Icon?: ElementType;
}

function ListSelect(props: ListSelectProps) {
  const { data, name, label, direction } = props;
  const inputProps = { name: name, lable: label, type: "text" };
  const [field, meta] = useField(inputProps);
  const [isSelected, setIsSelected] = useState("");
  const handleClick = (item: React.SetStateAction<string>) => {
    setIsSelected(item);
  };

  return (
    <>
      <ListWrapper
        role="group"
        aria-labelledby="my-radio-group"
        direction={direction}
      >
        {data?.map((item: { title: string; icon?: string }) => (
          <Label
            key={item.title}
            onClick={() => {
              handleClick(item.title);
            }}
            selected={item.title == isSelected}
            direction={direction === "column"}
          >
            <RadioButton
              {...field}
              autoComplete="off"
              type="radio"
              name={name}
              className="card-input-element"
              value={item.title}
            />
            <CardContent>
              {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                />
              )}
              <CardTitle>{item.title}</CardTitle>
            </CardContent>
          </Label>
        ))}
      </ListWrapper>
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
}

export default ListSelect;
