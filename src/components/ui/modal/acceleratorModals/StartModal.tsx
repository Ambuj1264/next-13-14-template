import styled from "@emotion/styled";
import React, { useState } from "react";
import Modal from "../Modal";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ModalHeading from "@/components/schedulePost/ModalHeading";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import ComboButtons from "@/components/schedulePost/ComboButtons";
import {
  darkCharcoalColor,
  darkblueColor,
  whiteColor,
} from "@/styles/variables";
import Image from "next/image";
import StartModalSkeleton from "../../loader/AcceleratorSkeletors/StartModalSkeleton";

const ModalContainer = styled.div`
  width: 956px;
  padding: 20px;
`;
const HR = styled.hr`
  width: 100%;
  height: 0.5px;
  background: #878787;
`;
const Subtext = styled.p`
  color: #333;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  margin: 30px 0;
`;
const StartModal = ({ setPopOpen }: { setPopOpen: (arg: boolean) => void }) => {
  const [open, setOpen] = useState(true);

  const closeHandler = () => {
    setOpen(false);
  };

  const buttonsConfig = [
    {
      backgroundColor: whiteColor,
      color: darkCharcoalColor,
      outline: true,
      buttonText: "Skip",
    },
    {
      backgroundColor: darkblueColor,
      color: whiteColor,
      outline: false,
      buttonText: "Next",
    },
  ];

  const loading = false;
  return (
    <Modal open={open} width="711px" closeModal={closeHandler} maxWidth="lg">
      <ModalContainer>
        <ModalHeader
          component={<ModalHeading heading={"1. What is socialmotion"} />}
          showClose={true}
          onclose={() => setPopOpen(false)}
        />

        {loading ? (
          <StartModalSkeleton />
        ) : (
          <>
            <HR />
            <Subtext>
              socialmotion is the perfect CRM platform to grow your B2B Sales -
              anytime, anywhere. socialmotion is a comprehensive platform designed to
              boost B2B (Business to Business) sales. While it includes a Google
              extension that simplifies lead management on the LinkedIn
              platform, socialmotion is, as a whole, a complete platform. It offers
              various functions, such as lead management and the ability to
              schedule LinkedIn posts, all integrated into a single solution
              that combines sales and marketing strategies to help businesses
              optimize their efforts in the B2B sector.
            </Subtext>
            <Image
              src="/assets/images/accelerator/start1.png"
              width={548}
              height={324}
              alt="Picture of the author"
            />
          </>
        )}

        <ModalFooter
          componentRight={<ComboButtons buttons={buttonsConfig} />}
        />
      </ModalContainer>
    </Modal>
  );
};

export default StartModal;
