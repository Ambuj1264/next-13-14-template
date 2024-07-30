import React from "react";
import Modal from "../Modal";
import styled from "@emotion/styled";
import { Earth, CautionSVG } from "@/utils/formUtils/InputSvg/InputSvg";
import {
  darkCharcoalColor,
  borderRadiusLarger,
  greyColor,
  borderRadiusCircle,
  buttonCursor,
  fullWidth,
  fontSizeCaptionSmall,
  guttersPx,
} from "@/styles/variables";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ModalHeading from "@/components/schedulePost/ModalHeading";
import PreviewAction from "@/layouts/schedulePostLayouts/action/PreviewAction";
import { typographyH3, typographyParagraph } from "@/styles/typography";
import CustomTooltip from "../../tooltip/CustomTooltip";
import Image from "next/image";
const baseTextStyles = `
  color: ${darkCharcoalColor};
  ${typographyParagraph}
`;
const ModalContainer = styled.div`
  padding: 50px;
  div > svg:nth-child(1) {
    margin-left: 50px !important;
  }
`;
const Card = styled.div`
  min-width: 700px;
  width: ${fullWidth};
  border-radius: ${borderRadiusLarger};
  border: 1px solid ${greyColor};
  position: relative;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: ${guttersPx.medium} ${guttersPx.medium} ${guttersPx.mediumHalf}
    ${guttersPx.medium};
`;
const UserImage = styled.img`
  width: 48px;
  height: 47px;
  border-radius: ${borderRadiusCircle};
  margin-right: 15px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserName = styled.h3`
  ${baseTextStyles}
`;
const PostContent = styled.p`
  ${baseTextStyles}
  margin-bottom: ${guttersPx.medium};
  padding: 0px ${guttersPx.medium};
`;

const Span = styled.span`
  ${baseTextStyles}
  color: ${greyColor};
  font-size: ${fontSizeCaptionSmall};
`;
const NowIconContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SpanSVG = styled.span`
  margin-left: 6px;
`;
const SubFlexContainer = styled.div`
  display: flex;
  width: ${fullWidth};
  justify-content: space-between;
  align-items: baseline;
`;
const DotsContainer = styled.div`
  cursor: ${buttonCursor};
  margin-top: -${guttersPx.mediumHalf};
  ${typographyH3}
`;
const CautionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  position: absolute;
  bottom: -60px;
  right: -51px;
`;

const PostImage = styled(Image)`
  width: 100%;
  height: auto;
  max-height: 200px;
`;

const PreviewPost = ({
  open,
  data,
  closeHandler,
}: {
  open: boolean;
  data: any;
  closeHandler: () => void;
}) => {
  const { img, profile, editorState } = data;

  return (
    <>
      <Modal
        open={open}
        styles={{ borderRadius: "10px" }}
        width="1100"
        closeModal={closeHandler}
        maxWidth="xl"
      >
        <ModalContainer>
          <ModalHeader
            component={<ModalHeading heading={"Preview post"} />}
            showClose
            onclose={closeHandler}
          />
          <Card>
            <User>
              <UserImage src={profile} alt="profile picture" />
              <SubFlexContainer>
                <UserInfo>
                  <UserName>Walid Amarir</UserName>
                  <NowIconContainer>
                    <Span>Now</Span>
                    <SpanSVG>
                      <Earth />
                    </SpanSVG>
                  </NowIconContainer>
                </UserInfo>
                <DotsContainer>...</DotsContainer>
              </SubFlexContainer>
            </User>
            <PostContent
              dangerouslySetInnerHTML={{ __html: editorState?.editorHtml }}
            ></PostContent>
            <ImageList images={img} />
            <PreviewAction />
            <CautionContainer>
              <CustomTooltip
                title="The published post may look slightly different"
                placement="bottom"
              >
                <CautionSVG />
              </CustomTooltip>
            </CautionContainer>
          </Card>
        </ModalContainer>
      </Modal>
    </>
  );
};
export default PreviewPost;

const ImageListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 350px;
  overflow: auto;
  padding: 30px;
`;

const ImageContainer = styled.div`
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
`;

const ImageList = ({ images }: { images: File[] }) => {
  return (
    <ImageListContainer>
      {images.map((image: Blob | MediaSource, index: number) => (
        <ImageContainer key={index}>
          <PostImage
            width={100}
            height={100}
            src={URL.createObjectURL(image)}
            alt={`image-${index}`}
          />
        </ImageContainer>
      ))}
    </ImageListContainer>
  );
};
