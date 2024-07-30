import { BoxeswidthoneText } from "@/components/deals/dealdetails/DealDetailByUsers";
import { colors } from "@/components/ui/avatar/Avatar";
import { PlusIcon } from "@/styles/base";
import {
  borderRadiusTiny,
  greyColor,
  gutters,
  guttersPx,
  lightGreyColor,
} from "@/styles/variables";
import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import React from "react";

const Boxeswidthtwo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DealTagsWrapper = styled.div`
  margin-top: 0.5rem;
  height: auto;
  border: 0.5px solid ${greyColor};
  background: ${lightGreyColor};
  border-radius: ${borderRadiusTiny};
  padding: ${gutters.small}px;
`;
const TagsWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  gap: ${guttersPx.smallHalf};
  flex-wrap: wrap;
`;
interface TagsProps {
  data: Record<string, any>;
  setName: (name: string) => void;
}
let colorIndex = 0;

const DealTags = ({ data, setName }: TagsProps) => {
  return (
    <DealTagsWrapper>
      <Boxeswidthtwo>
        <BoxeswidthoneText>Tags</BoxeswidthoneText>
        <PlusIcon onClick={() => setName("tags")}>+</PlusIcon>
      </Boxeswidthtwo>
      <TagsWrapper>
        {data?.map((item: string, index: number) => {
          colorIndex = (index + 1) % colors.length;
          let bgcolor = colors[colorIndex] ? colors[colorIndex] : colors[1];
          return <Chip key={item} sx={{ background: bgcolor }} label={item} />;
        })}
      </TagsWrapper>
    </DealTagsWrapper>
  );
};

export default DealTags;
