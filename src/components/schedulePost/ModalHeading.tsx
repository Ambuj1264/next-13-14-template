import { typographyH3 } from "@/styles/typography";
import { darkCharcoalColor, fontFamily } from "@/styles/variables";
import styled from "@emotion/styled";
import Skeletor from "../ui/skeletor/Skeletor";

const Heading = styled.h3`
  ${typographyH3};
  color: ${darkCharcoalColor};
  font-family: ${fontFamily};
`;

const ModalHeading = ({ heading }: { heading?: string }) => {
  return !heading ? (
    <Skeletor variant="text" sx={{ fontSize: "25px" }} width={400} />
  ) : (
    <Heading>{heading}</Heading>
  );
};

export default ModalHeading;
