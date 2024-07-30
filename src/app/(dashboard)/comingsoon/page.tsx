"use client";

import styled from "@emotion/styled";
import {
  fullWidth,
  darkblueColor,
  viewPortHeight,
  whiteColor,
  fontWeightNormal,
  fontSizeBody1,
  fontWeightRegular,
  fontSizeCaptionSmall,
} from "@/styles/variables";
import Image from "next/image";
import Subscribe from "@/components/subscribe/Subscribe";
const ContainerModal = styled.div`
  width: ${fullWidth};
  margin: auto;
  text-align: center;
  color: ${darkblueColor};
  height: ${viewPortHeight};
  background: ${whiteColor};
  padding: 2rem;
`;

const Heading = styled.div`
  font-size: 50px;
  font-weight: ${fontWeightNormal};
  letter-spacing: 30px;
  text-shadow: ${darkblueColor} 0px 2px 8px;
  word-break: break-all;
`;

const SubHeading = styled.div`
  margin-top: 1rem;
  font-size: ${fontSizeBody1};
  font-weight: ${fontWeightRegular};
  margin-bottom: 4rem;
  letter-spacing: ${fontSizeCaptionSmall};
`;
const socialmotionLogoWrapper = styled.div`
  margin: 1rem 0 4rem 0;
`;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const page = () => {
  return (
    <ContainerModal>
      <socialmotionLogoWrapper>
        <Image
          alt="socialmotion logo"
          src="/assets/images/planet.svg"
          width={185}
          height={183}
          layout="fixed"
        />
      </socialmotionLogoWrapper>
      <Heading>COMING SOON</Heading>
      <SubHeading>ARE YOU READY?</SubHeading>
      <BottomWrapper>
        <Image
          alt="socialmotion logo"
          src="/assets/images/pattern1.svg"
          width={208}
          height={173}
          layout="fixed"
        />
        <Subscribe />
        <Image
          alt="socialmotion logo"
          src="/assets/images/pattern2.svg"
          width={208}
          height={173}
          layout="fixed"
        />
      </BottomWrapper>
    </ContainerModal>
  );
};

export default page;
