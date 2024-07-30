import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { darkCharcoalColor, buttonCursor, guttersPx } from "@/styles/variables";
import {
  typographyH3,
  typographyParagraph,
  typographySubtitle2Normal,
} from "@/styles/typography";
import {
  CancelIcon,
  CopyLink,
  EmailIcon,
  Gmail,
  LinkedInIcon,
  LinkedInIconColorFull,
  WhatsApp,
} from "@/utils/formUtils/InputSvg/InputSvg";
import Modal from "../../Modal";
import MemberForm from "./MemberForm";
import { borderStyle } from "@/styles/base";

interface SelectedValueProp {
  id: number;
  title: string;
  icon: JSX.Element;
  inputIcon: any;
  placeholder: string;
}

const AddMemberSocial = ({ open, onclose }: any) => {
  const [selectedItem, setSelectedItem] = useState<SelectedValueProp>(
    CardData[0],
  );
  const [steps, setSteps] = useState(0);
  const handleCardClick = (item: SelectedValueProp) => {
    setSelectedItem(item);
    setSteps(steps + 1);
  };
  const handleAdd = () => {
    try {
      setSteps(steps + 1);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const handleClose = () => {
    setSteps(0);
    onclose();
  };

  const handleCancel = () => {
    setSteps(steps - 1);
  };

  const getSteps = useMemo(() => {
    const cardData = CardData?.map((item) => ({
      ...item,
      onClick: () => handleCardClick(item),
    }));

    switch (steps) {
      case 0:
        return (
          <>
            <SubHeading>Select the via you prefer</SubHeading>
            <CardContainer>
              {cardData.map((item) => (
                <Card key={item.id} onClick={item.onClick}>
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                </Card>
              ))}
            </CardContainer>
          </>
        );
      case 1:
        return (
          <MemberForm
            selectedItem={selectedItem}
            formSubmit={handleAdd}
            onCancel={handleCancel}
          />
        );
      case 2:
        return (
          <>
            <SubHeading>
              Great,
              <br /> we have already sent a request to your co-worker to join
              {selectedItem?.title}.
            </SubHeading>
          </>
        );
      default:
        return null;
    }
  }, [steps, selectedItem, handleCardClick, handleAdd, handleCancel, CardData]);

  return (
    <>
      <Modal
        open={open}
        width="900"
        closeModal={handleClose}
        maxWidth="xl"
        styles={borderStyle}
      >
        <ModalContainer>
          <FlexContainer>
            <Heading>Add member</Heading>
            <CrossIcon>
              <CancelIcon
                color="#878787"
                width={"25"}
                height={"25"}
                onClick={handleClose}
              />
            </CrossIcon>
          </FlexContainer>
          {getSteps}
        </ModalContainer>
      </Modal>
    </>
  );
};

export default AddMemberSocial;

const CardData = [
  {
    id: 1,
    title: "LinkedIn",
    icon: <LinkedInIconColorFull width="58px" height="43px" />,
    inputIcon: LinkedInIcon,
    placeholder: "Enter linkedin",
  },
  {
    id: 2,
    title: "Work email",
    icon: <Gmail />,
    inputIcon: EmailIcon,
    placeholder: "Enter email",
  },
  {
    id: 3,
    title: "WhastApp",
    icon: <WhatsApp />,
    inputIcon: LinkedInIcon,
    placeholder: "Enter whatsapp",
  },
  {
    id: 4,
    title: "Copy link",
    icon: <CopyLink />,
    inputIcon: LinkedInIcon,
    placeholder: "Enter link",
  },
];

const ModalContainer = styled.div`
  min-width: 647px;
  padding: ${guttersPx.medium};
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CrossIcon = styled.div`
  cursor: ${buttonCursor};
  width: 25px;
  height: 25px;
`;
const Heading = styled.h3`
  ${typographyH3};
  color: ${darkCharcoalColor};
`;
export const SubHeading = styled.p`
  color: ${darkCharcoalColor};
  ${typographyParagraph};
  padding: 30px 0;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Card = styled.div`
  display: grid;
  padding: ${guttersPx.large};
  place-items: center;
  gap: ${guttersPx.mediumHalf};
  border-radius: 5px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: ${buttonCursor};
`;

const CardTitle = styled.div`
  ${typographySubtitle2Normal};
  color: ${darkCharcoalColor};
`;
