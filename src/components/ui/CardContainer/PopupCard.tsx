import { LeftArrow } from "@/utils/formUtils/InputSvg/InputSvg";
import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  borderRadiusCircle,
  borderRadiusLarger,
  darkCharcoalColor,
  darkblueColor,
  fontFamily,
  fullWidth,
  placeholderColor,
  whiteColor,
} from "@/styles/variables";
import { typographyH3, typographyParagraph } from "@/styles/typography";
import PopupCardSkeleton from "../loader/AcceleratorSkeletors/PopupCardSkeleton";
import Image from "next/image";
import StartModal from "../modal/acceleratorModals/StartModal";
const Container = styled.div``;

const commonTextStyles = `
  color: ${darkCharcoalColor};
  font-family: ${fontFamily};
`;

const commonCardStyles = `
  border: 1px solid ${placeholderColor};
  border-radius: ${borderRadiusLarger};
  position: relative;
  z-index: 0;
`;

const StartArrow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: baseline;
  cursor: pointer;
`;

const StartText = styled.div`
  ${commonTextStyles}
  ${typographyH3}
`;

const CardContainer = styled.div`
  margin-top: 40px;
  width: 251px;
  height: 230px;
  ${commonCardStyles}
  padding: 20px;
  cursor: pointer;
`;

const CardHeader = styled.div`
  ${typographyParagraph}
  color:  ${darkblueColor};
  font-family: ${fontFamily};
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  width: 211px;
  height: 125px;
  overflow: hidden;
`;

const GreenTickAvatar = styled.div`
  width: 30px;
  height: 30px;
  background: ${whiteColor};
  border-radius: ${borderRadiusCircle};
  position: absolute;
  top: -10px;
  right: -14px;
  z-index: 50;
  display: grid;
  place-items: center;
  stroke-width: 1.5px;
  stroke: rgba(103, 214, 75, 0.3);
  border: 1px solid rgba(103, 214, 75, 0.3);
`;

const CardFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: ${fullWidth};
`;

const data = [
  {
    id: 1,
    title: "What is socialmotion",
    img: "/assets/images/accelerator/start1.png",
  },
  {
    id: 2,
    title: "Demo video",
    img: "/assets/images/accelerator/start2.png",
  },
  {
    id: 3,
    title: "Our YouTube channel",
    img: "/assets/images/accelerator/start3.png",
  },
  {
    id: 4,
    title: "Follow us on LinkedIn",
    img: "/assets/images/accelerator/start4.png",
  },
  {
    id: 5,
    title: "FQA",
    img: "/assets/images/accelerator/start5.png",
  },
];

const PopupCard: React.FC<{ setOpen: (value: boolean) => void }> = ({
  setOpen,
}) => {
  const [popOpen, setPopOpen] = useState(false);
  const loading = false;

  const handler = () => {
    setOpen(false);
  };

  const PopModalHandler = () => {
    setPopOpen(true);
  };
  return (
    <Container>
      {popOpen && <StartModal setPopOpen={setPopOpen} />}
      <StartArrow onClick={handler}>
        <LeftArrow />
        <StartText>Start</StartText>
      </StartArrow>

      {loading ? (
        <PopupCardSkeleton />
      ) : (
        <CardFlex>
          {data?.map((item, index) => {
            return (
              <CardContainer key={item.id} onClick={PopModalHandler}>
                <CardHeader>
                  {index + 1}. {item.title}
                </CardHeader>
                <ImageContainer>
                  <Image
                    width={211}
                    height={125}
                    src={item.img}
                    alt={item.title}
                  />
                </ImageContainer>
                <GreenTickAvatar>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                  >
                    <path
                      d="M1 7.28571L5 12L13 1"
                      stroke="#67D64B"
                      stroke-opacity="0.3"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </GreenTickAvatar>
              </CardContainer>
            );
          })}
        </CardFlex>
      )}
    </Container>
  );
};

export default PopupCard;
