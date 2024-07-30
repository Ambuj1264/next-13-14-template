import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import {
  borderRadiusBig,
  buttonCursor,
  darkCharcoalColor,
  fontFamily,
  fontSizeCaption,
  fontWeightNormal,
  fullWidth,
  greyColor,
  lightGreyColor,
  whiteColor,
} from "@/styles/variables";
import AcceleratorCardSkeleton from "../loader/AcceleratorSkeletors/AcceleratorCardSkeleton";
interface TextProps {
  primary?: boolean;
}

const CardContainer = styled.div`
  width: 23%;
  height: 307px;
  border-radius: ${borderRadiusBig};
  border: 1px solid ${lightGreyColor};
  background: ${whiteColor};
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: grid;
  place-items: center;
  cursor: ${buttonCursor};
  margin: 20px 0;
`;

const Text = styled.div<TextProps>`
  color: ${(props) => (props.primary ? darkCharcoalColor : greyColor)};
  text-align: center;
  font-family: ${fontFamily};
  font-size: ${(props) => (props.primary ? "18px" : fontSizeCaption)};
  font-weight: ${fontWeightNormal};
  margin-bottom: ${(props) => (props.primary ? "8px" : "0")};
`;

const HR = styled.hr`
  width: 198px;
  height: 4px;
  border-radius: 100px;
  background: #d9d9d9;
  margin: auto;
  outline: none;
  border: none;
`;

const FlexCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: ${fullWidth};
  justify-content: space-between;
`;
const Div = styled.div``;
const data = [
  {
    id: 0,
    title: "Start",
    desc: "Get started here in less than 5 minutes",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator1.png",
  },
  {
    id: 1,
    title: "LinkedIn profile",
    desc: "Ways to optimize your LinkedIn profile",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator2.png",
  },
  {
    id: 2,
    title: "Personal brand",
    desc: "Boost your personal brand on LinkedIn",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator3.png",
  },
  {
    id: 3,
    title: "Use socialmotion with Waalaxy",
    desc: "Discover how to generate B2B leads with specific tools",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator4.png",
  },
  {
    id: 4,
    title: "Use socialmotion with Instantly",
    desc: "Make a difference with your cold emails",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator5.png",
  },
  {
    id: 5,
    title: "Cold Calling",
    desc: "Gets the user's attention",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator6.png",
  },
  {
    id: 6,
    title: "Analytics",
    desc: "Discover how use the tools to manage your data",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator7.png",
  },
  {
    id: 7,
    title: "Copywriting",
    desc: "Get started here in less than 5 minutes",
    author: "Walid Amarir",
    img: "/assets/images/accelerator/accelerator8.png",
  },
];
const AcceleratorCard: React.FC<{ setOpen: (value: boolean) => void }> = ({
  setOpen,
}) => {
  const load = false;

  return (
    <Div>
      <FlexCards>
        {load
          ? Array?.from({ length: data.length })?.map((_, index) => (
              <AcceleratorCardSkeleton key={index} />
            ))
          : data?.map((item) => (
              <CardContainer key={item.id} onClick={() => setOpen(true)}>
                <Image src={item.img} width={93} height={86} alt={item.title} />
                <Text primary>{item.title}</Text>
                <HR />
                <Text>{item.desc}</Text>
                <Text primary as="div">
                  by {item.author}
                </Text>
              </CardContainer>
            ))}
      </FlexCards>
    </Div>
  );
};

export default AcceleratorCard;
