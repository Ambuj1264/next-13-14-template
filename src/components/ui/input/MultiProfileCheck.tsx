import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";
import { MultiProfileCheckData } from "@/utils/constant";
import {
  borderRadiusTiny,
  darkCharcoalColor,
  fontFamily,
  fontSizeBody2,
  fontWeightNormal,
  lightGreyColor,
} from "@/styles/variables";
import { AvatarInitials } from "../avatar/Avatar";
const ProfileCheck = styled.div`
  padding: 20px;
  width: 292px;
  height: 230px;
  border-radius: 5px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ScrollableContainer = styled(FormGroup)`
  height: 176px;
  flex-wrap: unset;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    height: 174px;
    border-radius: ${borderRadiusTiny};
    background: ${lightGreyColor};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const MultiProfileCheck: React.FC = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected?.includes(id)) {
        return prevSelected?.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <ProfileCheck>
      <ScrollableContainer>
        {MultiProfileCheckData?.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={selectedCheckboxes.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            }
            label={
              <div
                style={{
                  color: darkCharcoalColor,
                  fontFamily: fontFamily,
                  fontSize: fontSizeBody2,
                  fontWeight: fontWeightNormal,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AvatarInitials
                  w={"23px"}
                  h={"23px"}
                  name={item.name}
                  profilePicture={item.image}
                  textSize={fontSizeBody2}
                />
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {item.name}
                </span>
              </div>
            }
          />
        ))}
      </ScrollableContainer>
    </ProfileCheck>
  );
};

export default MultiProfileCheck;
