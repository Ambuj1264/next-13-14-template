"use client";
import React, { useState } from "react";
import AcceleratorCard from "@/components/ui/CardContainer/AcceleratorCard";
import styled from "@emotion/styled";
import { blackColor, fontFamily } from "@/styles/variables";
import {
  typographyCaptionSmall,
  typographyParagraph,
} from "@/styles/typography";
import Skeletor from "@/components/ui/skeletor/Skeletor";
import SearchBarInput from "@/components/ui/input/SearchBarInput";
import PopupCard from "@/components/ui/CardContainer/PopupCard";
const Container = styled.div`
  padding: 20px;
`;
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DivContainer = styled(FlexContainer)`
  justify-content: space-between;
  margin-bottom: 20px;
`;
const DivLeft = styled.div``;
const DivRight = styled.div``;
const ProgressTitle = styled.div`
  ${typographyParagraph};
  color: ${blackColor};
  font-family: ${fontFamily};
  padding-bottom: 20px;
`;
const ProgressBar = styled.progress`
  width: 176px;
`;
const ProgressLabel = styled.label`
  ${typographyCaptionSmall};
  color: ${blackColor};
  font-family: ${fontFamily};
  margin-left: 10px;
`;
const ProgressContainer = styled(FlexContainer)``;
const Page = () => {
  const [open, setOpen] = useState(false);
  const loading = false;
  const [search, setSearch] = useState("");
  const hanldeSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };
  let progressContent;
  if (loading) {
    progressContent = <Skeletor variant="text" width={200} height={10} />;
  } else {
    progressContent = (
      <>
        <ProgressBar id="file" value="8" max="100" />
        <ProgressLabel htmlFor="file">8%</ProgressLabel>
      </>
    );
  }
  return (
    <Container>
      {open ? (
        <PopupCard setOpen={setOpen} />
      ) : (
        <>
          <DivContainer>
            <DivLeft>
              <ProgressTitle>Overal progress</ProgressTitle>
              <ProgressContainer>{progressContent}</ProgressContainer>
            </DivLeft>
            <DivRight>
              <SearchBarInput search={search} handleSearch={hanldeSearch} />
            </DivRight>
          </DivContainer>
          <AcceleratorCard setOpen={setOpen} />
        </>
      )}
    </Container>
  );
};
export default Page;
