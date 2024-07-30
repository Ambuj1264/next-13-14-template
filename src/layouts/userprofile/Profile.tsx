import { useAuth } from "@/context/auth/authContext";
import {
  typographyCaptionSemibold,
  typographyCaptionSmall,
} from "@/styles/typography";
import { darkCharcoalColor, greyColor, whiteColor } from "@/styles/variables";
import { truncateWords } from "@/utils/helperUtils";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoggedInUserTitle = styled.p(
  [typographyCaptionSemibold],
  css`
    color: ${darkCharcoalColor};
  `,
);
const UserDesignation = styled.p(
  [typographyCaptionSmall],
  css`
    color: ${greyColor};
  `,
);

const Profile = ({
  fullName,
  companyName,
}: {
  fullName: string;
  companyName: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest("#profile-menu")) {
        setIsOpen(false);
      }
    }
  };
  const { logout } = useAuth();

  const HandleProfileClose = () => {
    setIsOpen(false);
    router.push("/profile");
  };
  return (
    <DropdownContainer id="profile-menu">
      <DropdownButton onClick={handleToggle}>
        <LoggedInUserTitle>{truncateWords(fullName, 15)}</LoggedInUserTitle>
        <UserDesignation>{truncateWords(companyName, 15)}</UserDesignation>
      </DropdownButton>
      {isOpen && (
        <DropdownContent onClick={handleClose}>
          <DropdownItem onClick={HandleProfileClose}>Profile </DropdownItem>
          <DropdownItem onClick={logout}>Logout</DropdownItem>
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};

export default Profile;
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export const DropdownContent = styled.div`
  position: absolute;
  z-index: 999;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10px);
  background-color: ${whiteColor};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px;
  cursor: pointer;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
`;

export const DropdownItem = styled(MenuItem)`
  display: block;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  opacity: 1;
  transform: none;
  transition:
    opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform-origin: 0px 37.1406px;
`;
