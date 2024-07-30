import styled from "@emotion/styled";
import React from "react";
import { buttonCursor, guttersPx } from "@/styles/variables";
import Image from "next/image";

const Main = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.medium};
  padding: ${guttersPx.mediumHalf};
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: ${buttonCursor};
`;

const Icon = styled.div`
  margin-right: 6px;
`;

const PreviewAction = () => {
  return (
    <Main>
      {PreviewActionArr.map((item, index) => (
        <FlexContainer key={index}>
          <Icon>
            <Image src={item.src} alt={item.title} width={20} height={20} />
          </Icon>
          <div>{item.title}</div>
        </FlexContainer>
      ))}
    </Main>
  );
};

export default PreviewAction;

const PreviewActionArr = [
  {
    title: "Like",
    src: "/assets/icons/Like.svg",
  },
  {
    title: "Comment",
    src: "/assets/icons/Comment.svg",
  },
  {
    title: "Repost",
    src: "/assets/icons/Repost.svg",
  },
  {
    title: "Send",
    src: "/assets/icons/Send.svg",
  },
];
